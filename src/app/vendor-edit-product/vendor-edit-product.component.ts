import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiService } from '../services/api.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import '@vime/core/themes/default.css';
import '@vime/core/themes/light.css';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ComponentCanDeactivate } from '../guards/pending-changes-guard.guard';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-vendor-edit-product',
  templateUrl: './vendor-edit-product.component.html',
  styleUrls: ['./vendor-edit-product.component.css']
})
export class VendorEditProductComponent implements OnInit , ComponentCanDeactivate {
  @ViewChild('datepicker') myRangeInput!: any;
  @ViewChild('detectChangeModal') detectChangeModal!: any;

  detectModal!: NgbModalRef;
  currentItem: any = 'hihfof';
  user_id !: any;
  product_id !: any;
  product_name !: any;
  product_detail !: any;
  product_type !: any;
  description !: any;
  product_made !: any;
  is_bestseller !: any;
  shipping_sku !: any;
  shipping_inventory !: any;
  shipping_tariff_code !: any;
  shipping_length !: any;
  shipping_width !: any;
  shipping_height !: any;
  shipping_weight !: any;
  order_case_qty !: any;
  order_min_case_qty !: any;
  dimension_unit!:any; 
  weight_unit!:any; 
  out_of_stock!: any;
  testers_price!:any; 
  testers_price_radio!:any; 
  reatailers_inst!:any; 
  reatailer_input_limit!:any; 
  retailer_min_qty!:any; 
  retailer_add_charge!:any; 
  product_shipdate!:any; 
  product_endshipdate!:any; 
  product_deadline!:any; 
  pro_dead!:any; 
  featured_image!:any;
  keep_product!: any; 
  video_index!: any; 
  usd_wholesale_price!: any; 
  usd_retail_price!: any; 
  cad_wholesale_price!: any; 
  cad_retail_price!: any; 
  gbp_wholesale_price!: any; 
  gbp_retail_price!: any; 
  eur_wholesale_price!: any; 
  eur_retail_price!: any; 
  aud_wholesale_price!: any; 
  aud_retail_price!: any; 
  sell_type: any = 0; 
  prepack_type: any = 1; 
  outside_us!: any ; 
  optionTypeBlkErr!:any;
  prepackError!:any;
  prevYesStock!:any;
  routeName!:any;
  retailers_min_order_qty!:any;

  isVarAvailable !: any;
  varImageIndex!: any;

    // crop
    imageChangedEvent: any = '';
    allImageChangedEventArray: any = [];
    croppedImage: any = '';
    croppedImageReady: any = '';
    imgId: any = 0;
    currentProcessingImg!: any;
  
    // attribute variables
    option1 !: any;
    option2 !: any;
    option3 !: any;
    option_items: any = []; 
    option_items2!: any; 
    option_items3!: any; 
    selectedAttribute : any = {};
    resultAttribute : any = [];
    modifiedResultAttribute : any = [];
    resultAttributeImgPreview : any = [];
    option_type : any = [];
    ext_option_type : any = [];
    indexOfSwatch!: any;
    colorOptionItems: any = [];
    swatchName !: any;
    swatchIndex: any = 0;
    selectedCropFiles: any[] = [];
    existingSize: any[] = [];
    lists: any = [];
    prepackLists: any = [];
    sizeItemPrePack: any = [];
    addOptionsModal: any; 
    addProductModal: any; 
    addColorModal: any;
    selectColorModal: any;
    variantsProductsModal: any;
    nextProductId: any;
    prevProductId: any;

    videoModalShow!: any;

    product_images: any = [];
    prev_product_images: any = [];
    all_details_images: any = [];
    categories: any = [];
    product_videos: any = [];
    previews: any[] = [];
    cropPreviews: any[] = [];
    video_url: any[] = [];
    prev_product_videos: any[] = [];
    all_details_videos: any = [];
    video_modal_url: any[] = [];
    selectedFiles: any[] = [];
    imgCountArr : any[] = [1,2,3,4,5,6,7,8,9,10,11,12];
    minOrderQtyArr : any[] = [1,2,3,4,5,6,7,8,9,10];
    pricingCountryArray : any = [
      {    
          'country_name':'United States',
          'wholesale_price': '',
          'retail_price': '',
          'currency': '$ USD'   
      },
      { 
          'country_name':'Canada',
          'wholesale_price': '',
          'retail_price': '',
          'currency': '$ CAD'
      },
      { 
          'country_name':'United Kingdom',
          'wholesale_price': '',
          'retail_price': '',
          'currency': '£ GBP'
      },
      { 
          'country_name':'Australia',
          'wholesale_price': '',
          'retail_price': '',
          'currency': '$ AUD'
      },
      { 
          'country_name':'Europe',
          'wholesale_price': '',
          'retail_price': '',
          'currency': '€ EUR'
      },
    ]
    

    initialValue !: any;
    productKeyword = 'category';

    keyword = 'name';
    data = [
      'Size' , 'Material',  'Color' , 'Style', 'Scent'
    ];


  hoveredDate: NgbDate | null = null;
  fromDate: any;
  toDate: any;

  showForm1:boolean= false;
  showForm2:boolean= false;
  showForm3:boolean= false;
  priceTable:boolean= false;
  retailersPrice:boolean= false;
  instructionsRetailers:boolean= false;
  retailersPreOrderDate:boolean= false;
  casePacks:boolean= false; 
  openSizing:boolean= false;
  prePacks:boolean= false;
  casePacks2:boolean= false;
  openSizing2:boolean= false;
  publistBtnDisabled:boolean= false;
  notValidError:boolean= false;
  notValidErrorMsg!:any;
  moreProductOptions1:boolean= false;
  productOptions1:boolean= true;
  moreProductOptions2:boolean= true;
  productOptions2:boolean= false;
  moreProductOptions3:boolean= false;
  productOptions3:boolean= false;
  clickNo:boolean = false;
  prepackRadioBtn!: any;
  prepackSizeRatio!: any;
  prepackCreate:boolean= false;
  hideCreatePrepack:boolean= false;

  togglePriceTable(event :any) {
    event.classList.toggle('myClass');
    this.priceTable = !this.priceTable;
  }

  showretailersPrice() { 
    this.retailersPrice = !this.retailersPrice;
  }

  showinstructionsRetailers() { 
    this.instructionsRetailers = !this.instructionsRetailers;
  }

  showretailersPreOrderDate() { 
    this.retailersPreOrderDate = !this.retailersPreOrderDate;
  }

  countriesArray:any = [
  ]

  constructor(public modalService: NgbModal, private apiService: ApiService, private storage: StorageMap, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private router:  Router, private activatedRoute: ActivatedRoute,  private toast: NgToastService, private appComponent: AppComponent) { 
    this.fromDate = null;
    this.toDate = null;
    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {

    });
  }
  
  isDirty = false;
  @HostListener('window:beforeunload')
  canDeactivate(): any {
    if(this.isDirty) {
      this.detectModal = this.modalService.open(this.detectChangeModal, { windowClass: 'detectChangeModal' });
    } else {
      return !this.isDirty;
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
    this.showForm1= true;

    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
      },
      error: (error) => {
        /* Called if data is invalid */
      },
    });

    this.activatedRoute.params.subscribe((routeParams) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.storage.get("user_session").subscribe({
        next: (user) => {
          /* Called if data is valid or `undefined` */
          let user_session = JSON.parse(JSON.stringify(user));
          this.user_id = user_session.id;
          this.product_id = this.activatedRoute.snapshot.params['id'];
          this.getCategories();
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        },
        error: (error) => {
          /* Called if data is invalid */
        },
      });

    })

    // this.getCountries();
    this.featured_image = 0;
    this.lists= [];
  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }
 
  getCategories() {
    this.apiService.getCategories().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.categories = response.data;
      this.getProductDetail();
      this.getCountries();
    })   
  }

  async getBase64ImageFromUrl(imageUrl: any) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
  
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  toDataURL(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      var reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
         this.imgId = this.imgId + 1;
          this.allImageChangedEventArray.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: url });
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
    
  }
  
  getProductDetail() {
    this.appComponent.showSpinner = true;
    this.apiService.getProductDetail(this.product_id).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.appComponent.showSpinner = false;
      this.product_detail = response.data[0];  
      this.product_name =  response.data[0].name.replace(/\\/g, '');
      this.initialValue = this.categories.find((item:any) => item.last_id == response.data[0].category);
      this.product_type = response.data[0].category;
         
      this.nextProductId = response.data[0].next_product_id;   
      this.prevProductId = response.data[0].prev_product_id;   
      
      if (response.data[0].description != "undefined" ) {
        this.description = response.data[0].description;
      }
      
      for(let i = 0 ; i < response.data[0].allimage.length ; i++)
      {
        this.previews.push(response.data[0].allimage[i].image);
        this.prev_product_images.push(response.data[0].allimage[i].image);
        this.all_details_images.push(response.data[0].allimage[i]);

      }
      
      for(let j = 0 ; j < response.data[0].videos.length ; j++)
      {
        this.video_url.push(response.data[0].videos[j].video_url);
        this.prev_product_videos.push(response.data[0].videos[j].video_url);
        this.all_details_videos.push(response.data[0].videos[j]);
      }
      this.imgCountArr.splice(0 , this.previews.length);

      this.product_made = response.data[0].country;
      if (response.data[0].sku != "undefined" && response.data[0].sku != "null" ) {
        this.shipping_sku = response.data[0].sku;
      }
      this.is_bestseller = response.data[0].is_bestseller;
      this.shipping_inventory = response.data[0].stock;
      this.shipping_tariff_code = response.data[0].tariff_code;
      this.shipping_weight = response.data[0].shipping_weight;
      this.shipping_length = response.data[0].shipping_length;
      this.weight_unit = response.data[0].weight_unit;
      this.shipping_width = response.data[0].shipping_width;
      this.shipping_height = response.data[0].shipping_height;
      this.shipping_length = response.data[0].shipping_length;
      this.dimension_unit = response.data[0].dimension_unit;
      if(response.data[0].case_quantity != 'undefined') {
        this.order_case_qty = response.data[0].case_quantity;
      }
      this.order_min_case_qty = response.data[0].min_order_qty;
      this.outside_us = response.data[0].outside_us;
      
      if(response.data[0].outside_us != '1' ) {
        this.apiService.convertPrice(response.data[0].usd_wholesale_price).subscribe((responseBody) => {
          let response = JSON.parse(JSON.stringify(responseBody));
          this.usd_wholesale_price = response.data.USD;
          this.usd_retail_price = response.data.USD * 2;
          this.cad_wholesale_price = response.data.CAD;
          this.cad_retail_price = response.data.CAD * 2;
          this.gbp_wholesale_price = response.data.GBP;
          this.gbp_retail_price = response.data.GBP * 2;
          this.aud_wholesale_price = response.data.AUD;
          this.aud_retail_price = response.data.AUD * 2;
          this.eur_wholesale_price = response.data.EUR;
          this.eur_retail_price = response.data.EUR * 2;
        })
      } else {
        this.usd_wholesale_price = response.data[0].usd_wholesale_price;
        this.usd_retail_price = response.data[0].usd_retail_price;
        this.cad_wholesale_price = response.data[0].cad_wholesale_price;
        this.cad_retail_price = response.data[0].cad_retail_price;
        this.gbp_wholesale_price = response.data[0].gbp_wholesale_price;
        this.gbp_retail_price = response.data[0].gbp_retail_price;
        this.eur_wholesale_price = response.data[0].eur_wholesale_price;
        this.eur_retail_price = response.data[0].eur_retail_price;
        this.aud_wholesale_price = response.data[0].gbr_wholesale_price;
        this.aud_retail_price = response.data[0].gbr_retail_price;
      }

      this.featured_image = response.data[0].featured_image_key;
      
      if(response.data[0].sell_type != null && response.data[0].sell_type) {
        this.sell_type = response.data[0].sell_type;
        if(response.data[0].sell_type == '1') {
          this.showCasePacks();
        } else if (response.data[0].sell_type == '2') {
          this.showOpenSizing();
        } else if (response.data[0].sell_type == '3') {
          this.showPrePacks();
        } else {}
      }

      this.testers_price = parseInt(response.data[0].usd_tester_price);

      if(this.testers_price > 0) {
        this.retailersPrice = true;
      }
      
      if(response.data[0].out_of_stock == "true") {
        this.out_of_stock = response.data[0].out_of_stock;
      }
     
      if (response.data[0].usd_tester_price != "undefined" && response.data[0].usd_tester_price != '' && response.data[0].usd_tester_price != '0' && response.data[0].usd_tester_price != 'null' && response.data[0].usd_tester_price != null) {
        this.testers_price = response.data[0].usd_tester_price;
        this.testers_price_radio = true;
      }
      if(response.data[0].reatailers_inst && response.data[0].reatailers_inst != 'undefined' ) {
        this.reatailers_inst = response.data[0].reatailers_inst;
        this.retailers_min_order_qty = response.data[0].reatailers_inst;
      }
      if(response.data[0].reatailer_input_limit != 'undefined' && response.data[0].reatailer_input_limit != 'null' ) {
        this.reatailer_input_limit = response.data[0].reatailer_input_limit;
      }
      if(response.data[0].retailer_add_charge != 'undefined' && response.data[0].retailer_add_charge != 'null' ) {
        this.retailer_add_charge = response.data[0].retailer_add_charge;
      }

      this.retailer_min_qty = response.data[0].retailer_min_qty;

      if(response.data[0].reatailers_inst != null && response.data[0].reatailers_inst != 'undefined' && response.data[0].reatailers_inst != '' && response.data[0].retailer_add_charge != '' &&  response.data[0].retailer_min_qty != '' ) {
        this.instructionsRetailers = true;
      }

      if(response.data[0].product_shipdate != '' && response.data[0].product_shipdate != '1970-01-01' && response.data[0].product_shipdate != 'null' && response.data[0].product_shipdate != null ){
        this.retailersPreOrderDate = true;
        this.fromDate = this.formatter.parse(response.data[0].product_shipdate);
        this.product_deadline = this.formatter.parse(response.data[0].product_deadline);
        this.keep_product = response.data[0].keep_product;
      }

      if(response.data[0].product_endshipdate != '' && response.data[0].product_endshipdate != '1970-01-01' && response.data[0].product_endshipdate != 'null' && response.data[0].product_shipdate != null ){
        this.retailersPreOrderDate = true;
        this.toDate = this.formatter.parse(response.data[0].product_endshipdate);
        this.product_deadline = this.formatter.parse(response.data[0].product_deadline);
        this.keep_product = response.data[0].keep_product;
      }


      if(response.data[0].allvariations.length > 0) {
        this.isVarAvailable = true;

        this.option_type = response.data[0].option_type;
        this.ext_option_type = response.data[0].option_type;
        
        if(response.data[0].option_type.length == 1 ) {
          this.lists.push({"declare":""}); 
        } else if(response.data[0].option_type.length == 2) {
          this.lists.push({"declare":""});
          this.lists.push({"declare":""});
        } else {
          this.lists.push({"declare":""});
          this.lists.push({"declare":""});
          this.lists.push({"declare":""}); 
        }

        this.resultAttribute = response.data[0].allvariations;
        
        this.prevYesStock = response.data[0].allvariations[0].inventory;

        this.option_items = response.data[0].option_value;

        this.resultAttributeImgPreview = [...response.data[0].allvariations];

        this.colorOptionItems = response.data[0].swatches;

        if(response.data[0].prepack_type != null) {
          this.prepack_type = response.data[0].prepack_type;
          if(response.data[0].prepack_type == '1') {
            this.showSubCasePacks();
          } else if (response.data[0].prepack_type == '2') {
            this.showSubOpenSizing();
          } else {}
        }

        if(response.data[0].pre_packs.length > 0){
          this.hideCreatePrepack = true;
          if(response.data[0].sell_type == '3') {
            this.showPrePacks();
          }
          this.prepackLists = response.data[0].pre_packs;

          this.sizeItemPrePack = response.data[0].pre_packs[0].size_range;

          if(this.option_type.includes('Size')) {
            let sizeIndex = this.option_type.indexOf('Size');
            this.option_items[sizeIndex].forEach((element: any) => {
              this.existingSize.push(element.value);
            })
          }

        } else if(this.option_type.includes('Size') && response.data[0].pre_packs.length == 0) {
          let prepackOptionType = [...this.option_type];
          let prepackOptionItems = [...this.option_items];
          if(prepackOptionType.includes('Size')) {
            let index = prepackOptionType.indexOf('Size');
            prepackOptionType.splice(index,1);
            prepackOptionItems.splice(index,1);
          }

          if(prepackOptionType.length > 0) {
            this.prepackLists = [];
            if(prepackOptionType.length == 1) {
              prepackOptionItems[0].forEach((element :any , key :any) => {
                if(element.value !== '' && element.value !== null && element.value !== undefined) {
                  let available = 0;
                  this.prepackLists.forEach((e: any) => {
                    if(element.value == e.style) {
                      available = 1;
                    }
                  });
                  if(available == 0 ) {
                    this.prepackLists.push({active: false, status: 'published', style:element.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [], size_range_value: '', packs_price: '',ratio_error: ''})
                  }
                }
                
              });
            }
            if(prepackOptionType.length == 2) {
              prepackOptionItems[1].forEach((element1 :any) => {
                prepackOptionItems[0].forEach((element0 :any , key: any) => {
                  if(element1.value !== '' && element1.value !== null && element1.value !== undefined && element0.value !== '' && element0.value !== null && element0.value !== undefined) {
                  let available = 0;
                this.prepackLists.forEach((e: any) => {
                  if(element0.value+'/'+element1.value == e.style) {
                    available = 1;
                  }
                });
                if(available == 0 ) {
                  this.prepackLists.push({active: false, status: 'published', style:element0.value+'/'+element1.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: '',ratio_error: ''})
                }
              }
                });
              });
            }
          } else {
            this.prepackLists = [];
            let available = 0;
            this.prepackLists.forEach((e: any) => {
              if(this.product_name == e.style) {
                available = 1;
              }
            });
            if(available == 0 ) {
            this.prepackLists.push({active: false, status: 'published', style:this.product_name,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: ''})
            }
          }
        
          if(this.option_type.includes('Color')){
            let index = this.option_type.indexOf('Color');
            let item = this.option_items[index];
            item.forEach((element: any) => {
              this.colorOptionItems.push({ 'name': element.value , 'img': ''});
            });
          
          }
        
          if(this.option_type.includes('Size')) {
            let index = this.option_type.indexOf('Size');
            let sizeItems = this.option_items[index];
            let sizeItemsClone = [...sizeItems];
            
            let arrOfSize: any = [];
            for( let j=0; j<sizeItemsClone.length; j++) {
              arrOfSize.push(sizeItemsClone[j].value) 
            }
        
            let chunkSize = 2;
            let resArray = [];
            for (let i = 0; i < arrOfSize.length; i += chunkSize) {
              let chunk = arrOfSize.slice(i, i + chunkSize);       
              let splited = chunk.join('-');
              resArray.push(splited);
              // do whatever
            }
            this.sizeItemPrePack = resArray;

          }
        } else {}

      }
      
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: 'Something went wrong. Please try again.' ,duration: 4000});
      this.appComponent.showSpinner = false;
    })
    
  }

  selectEventCat(item:any) {

    if(this.product_type != item.last_id ) {
      this.isDirty = true;
    }
    this.product_type = item.last_id;

  }

  onChangeSearchCat(val: string) {

  }
  
  onFocusedCat(e:any){

  }

  onInputCleared(e:any){
    this.isDirty = true;
    this.product_type = 0;
    // do something when input is focused
  }
  
  chooseNoFunction() { 
    this.showForm3= false;
    this.showForm1= true;
    this.showForm2= true;
    this.clickNo = true;
    this.isVarAvailable = false;
    if(this.resultAttribute.length > 0 ) {
      this.shipping_inventory = this.prevYesStock;
    }
    this.resultAttribute = [];
    this.resultAttributeImgPreview = [];
    this.option_items = [];
    this.option_type = [];
    this.prepackLists = [];
    this.lists = [];
    this.lists.push({"declare":""}); 
  }

  chooseYesFunction() { 
    this.lists.push({"declare":""});
    this.isVarAvailable = true;
    this.showForm2= true;
    this.showForm3= true;
    this.showForm1= false;
    this.clickNo = false;
  }

  blobConversion(blob: any) {
    alert(blob);
  }

  openAddProductModal(content:any) {
    this.addProductModal = this.modalService.open(content, { windowClass: 'productOptionsModal' });
  }

  openAddColorModal(content:any) { 
    this.addColorModal = this.modalService.open(content, { windowClass: 'colorOptionsModal' });
    this.addProductModal.close();
  }

  openColorModal(content:any) { 
    this.selectColorModal = this.modalService.open(content, { windowClass: 'selectColorModal' });
    this.addColorModal.close();
  }

  clickManageOpt() {
    this.colorOptionItems = [];
    this.swatchIndex = 0;
  }

  closeOptionModal() {  
    this.addProductModal.close();
  }

  closeDetectChangeModal() {  
    this.detectModal?.close();
    if(this.routeName) {
      this.router.navigate([this.routeName]);
    }

    this.isDirty = false;
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
          const reader = new FileReader();
          this.product_images.push(this.selectedFiles[i]);
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);
      }
    } else {
      alert("Only 12 images allowed!")
    }

    if(this.selectedFiles.length < 13){
      this.imgCountArr.splice(0 , this.previews.length);
    }

    let prev_product_images = [...this.product_images];
    if(prev_product_images.length == this.product_images.length) {
      this.isDirty = true;
    }
  }

  selectCropFiles(event: any): void {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.cropPreviews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);
      }
    } else {
      alert("Only 12 images allowed!")
    }

    if(this.selectedFiles.length < 13){
      this.imgCountArr.splice(0 , this.previews.length);
    }
    
  }

  prevDeleteImage(index:any , image:any) {

    let imageDetail = this.all_details_images.filter((item:any) => item.image === image);
    this.apiService.deleteProductImage(imageDetail[0].image_id).subscribe((responseBody) => {
      this.previews = this.previews.filter((item:any , i:any) => i !== index);
      this.featured_image = 0;
      this.isDirty = true;
    })
  }
  newDeleteImage(index:any) {
    this.previews = this.previews.filter((item:any , i:any) => i !== index);
    let prev_product_images = [...this.product_images];
    if(prev_product_images.length != this.product_images.length) {
      this.isDirty = true;
    }
    this.product_images = this.product_images.filter((item:any , i:any) => i !== index);
  }

  prevDeleteVideo(index:any , video:any) {
    let videoDetail = this.all_details_videos.filter((item:any) => item.video_url === video);
    this.apiService.deleteProductVideo(videoDetail[0].id).subscribe((responseBody) => {
      this.video_url = this.video_url.filter((item:any , i:any) => i !== index);      
    })
  }

  newDeleteVideo(index:any) {
    this.video_url = this.video_url.filter((item:any , i:any) => i !== index);
    this.product_videos = this.product_videos.filter((item:any , i:any) => i !== index);
  }

  onFeatureImgSelect(index:any) {
    this.featured_image = index;
    this.isDirty = true;
  }

  onSelectVideoFile(event:any) {
    let prevProduct_videos = [...this.product_videos];
    if(prevProduct_videos.length != event.target.files.length) {
      this.isDirty = true;
    }
    if (event.target.files && event.target.files[0] && event.target.files.length < 4 ){
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();

        if(event.target.files[i].size < 5e+6) {
          this.product_videos.push(event.target.files[i]);
          reader.readAsDataURL(event.target.files[i]);
      
          reader.onload = (event:any) => {
            this.video_url.push( event.target.result);
          }
        } else {
          // alert('File is too large. Over 5mb.');
        }
       }
    } else {
      // alert("3 videos allowed!")
    }
  }
  
  openVideoModal(content:any , index:any) { 
    this.videoModalShow = this.modalService.open(content, { windowClass: 'videoModal' });
    this.video_index = index;
    this.video_modal_url =  this.video_url.filter((item:any , i:any) => i == index);
  }
 
  updateProduct(addProductForm: any) {
    this.publistBtnDisabled = true;
    if(!this.isVarAvailable) {
      const formData = new FormData();
      for (var i = 0; i < this.product_images.length; i++) { 
        formData.append("product_images[]", this.product_images[i]);
      }
      for (var k = 0; k < this.product_videos.length; k++) { 
        formData.append("video_url[]", this.product_videos[k]);
      }
      formData.append("user_id", this.user_id);
      formData.append("id", this.product_id); 
      formData.append("product_name", this.product_name);
      formData.append("product_type", this.product_type);
      formData.append("description", this.description);
      formData.append("product_made", this.product_made);
      formData.append("is_bestseller", this.is_bestseller);
      formData.append("usd_wholesale_price" , this.usd_wholesale_price);
      formData.append("usd_retail_price" , this.usd_retail_price);
      formData.append("cad_wholesale_price" , this.cad_wholesale_price);
      formData.append("cad_retail_price" , this.cad_retail_price);
      formData.append("gbp_wholesale_price" , this.gbp_wholesale_price);
      formData.append("gbp_retail_price" , this.gbp_retail_price);
      formData.append("eur_wholesale_price" , this.eur_wholesale_price);
      formData.append("eur_retail_price" , this.eur_retail_price);
      formData.append("aud_wholesale_price" , this.aud_wholesale_price);
      formData.append("aud_retail_price" , this.aud_retail_price);
      formData.append("outside_us" , this.outside_us);
      formData.append("shipping_sku" , this.shipping_sku);
      formData.append("shipping_inventory" , this.shipping_inventory);
      formData.append("shipping_tariff_code" , this.shipping_tariff_code);
      formData.append("shipping_length" , this.shipping_length);
      formData.append("dimension_unit" , this.dimension_unit);
      formData.append("shipping_width" , this.shipping_width);
      formData.append("shipping_height" , this.shipping_height);
      formData.append("shipping_weight" , this.shipping_weight);
      formData.append("weight_unit" , this.weight_unit);
      formData.append("order_case_qty" , this.order_case_qty);
      formData.append("order_min_case_qty" , this.order_min_case_qty);
      formData.append("out_of_stock" , this.out_of_stock);
      formData.append("featured_image", this.featured_image);
      formData.append("testers_price", this.testers_price);
      formData.append("reatailers_inst", this.reatailers_inst);
      formData.append("reatailer_input_limit", this.reatailer_input_limit);
      formData.append("retailer_min_qty", this.retailer_min_qty);
      formData.append("retailer_add_charge", this.retailer_add_charge);
      formData.append("product_shipdate", this.formatter.format(this.fromDate));
      formData.append("product_endshipdate", this.formatter.format(this.toDate));
      formData.append("product_deadline", this.formatter.format(this.product_deadline));
      formData.append("keep_product", this.keep_product);
      formData.append("sell_type", this.sell_type);
      
      let pricingError = 0;
    if((this.usd_wholesale_price != undefined && this.usd_retail_price != undefined && this.usd_wholesale_price != '0' && this.usd_retail_price != '0') || (this.cad_wholesale_price != undefined && this.cad_retail_price != undefined && this.cad_wholesale_price != '0' && this.cad_retail_price != '0') || (this.gbp_wholesale_price != undefined && this.gbp_retail_price != undefined && this.gbp_wholesale_price != '0' && this.gbp_retail_price != '0') || (this.eur_wholesale_price != undefined && this.eur_retail_price != undefined &&  this.eur_wholesale_price != '0' && this.eur_retail_price != '0') || (this.aud_wholesale_price != undefined && this.aud_retail_price != undefined && this.aud_wholesale_price != '0' && this.aud_retail_price != '0')) {
      pricingError = 1;
    }
   
    if(this.product_type ==  undefined || this.product_type == null || this.product_type == 0 || this.product_type == '0') {
      this.publistBtnDisabled = false;
      this.notValidError = true;
      this.toast.error({detail:"Product type field is required.",summary: '' ,duration: 4000});
      return false;
    } else if(this.product_made == undefined || this.product_made == 'undefined' || this.product_made == '0' ) {
      this.publistBtnDisabled = false;
      this.notValidError = true;
      this.toast.error({detail:"Product made field is required.",summary: '' ,duration: 4000});
      return false;
    }  
      else if ( pricingError != 1 ) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Pricing list can't be blank.",summary: '' ,duration: 4000});
        return false;
      } else if(this.order_case_qty == undefined || this.order_case_qty == '0'){ 
        this.publistBtnDisabled = false;
        this.notValidError = true;
         this.toast.error({detail:"Ordering details is required.",summary: '' ,duration: 4000});
        return false;
      } else if(this.order_min_case_qty == undefined || this.order_min_case_qty == '0') {
        this.publistBtnDisabled = false;
        this.notValidError = true;
         this.toast.error({detail:"Ordering details is required.",summary: '' ,duration: 4000});
        return false;
        } else if(this.instructionsRetailers == true && ( this.reatailers_inst  == 'null' || this.reatailers_inst == null || this.reatailers_inst == '' || this.reatailers_inst == 'undefined' || this.reatailers_inst == undefined || this.reatailers_inst == '0' || this.reatailers_inst == 0 || this.reatailer_input_limit  == 'null' || this.reatailer_input_limit == null || this.reatailer_input_limit == '' || this.reatailer_input_limit == 'undefined' || this.reatailer_input_limit == undefined || this.reatailer_input_limit == '0' || this.reatailer_input_limit == 0 || this.retailer_min_qty  == 'null' || this.retailer_min_qty == null || this.retailer_min_qty == '' || this.retailer_min_qty == 'undefined' || this.retailer_min_qty == undefined || this.retailer_min_qty == '0' || this.retailer_min_qty == 0  )) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Retailers customize section can't be blank.",summary: '' ,duration: 4000});
          return false;
        } else if (this.retailersPreOrderDate == true && ( this.fromDate == null || this.toDate == null || this.fromDate == '' || this.toDate == '' )) {
          this.publistBtnDisabled = false; 
          this.notValidError = true;
          this.toast.error({detail:"Ship date can't be blank.",summary: '' ,duration: 4000});
          return false;
        } else {
        this.apiService.editProduct(formData).subscribe((responseBody) => {
          let response = JSON.parse(JSON.stringify(responseBody));
          if(response.res == true) {
            this.toast.success({detail:"SUCCESS",summary: 'Product updated successfully.' ,duration: 4000});
            this.notValidError = false;
            this.publistBtnDisabled = false;
            this.notValidErrorMsg = '';
            this.product_images = [];
            this.previews = [];
            this.isDirty = false;
            this.closeDetectChangeModal();
            if(addProductForm == 'fromPopup' && this.routeName) {
              this.router.navigate([this.routeName]);
            } else {
              this.getProductDetail();
            }

          } else {
            this.notValidError = true;
            this.publistBtnDisabled = false;
            this.notValidErrorMsg = 'Something went wrong. please try again later!';
          }
  
        },(error) => {
          this.publistBtnDisabled = false;
          this.notValidErrorMsg = 'Something went wrong. please try again later!';
        })
        return true;
      }
    } else {
      let formData = new FormData();
      formData.append("user_id" , this.user_id);
      formData.append("id", this.product_id);
      formData.append("product_name" , this.product_name);
      formData.append("outside_us", this.outside_us); 
      formData.append("product_type" ,this.product_type);
      formData.append("description" ,this.description);
      formData.append("product_made" ,this.product_made);
      formData.append("is_bestseller" ,this.is_bestseller);
      formData.append("order_case_qty" ,this.order_case_qty);
      formData.append("order_min_case_qty" ,this.order_min_case_qty);
      formData.append("usd_wholesale_price" , '0');
      formData.append("usd_retail_price" , '0');
      formData.append("cad_wholesale_price" , '0');
      formData.append("cad_retail_price" , '0');
      formData.append("gbp_wholesale_price" , '0');
      formData.append("gbp_retail_price" , '0');
      formData.append("eur_wholesale_price" , '0');
      formData.append("eur_retail_price" , '0');
      formData.append("aud_wholesale_price" , '0');
      formData.append("aud_retail_price" , '0');
      formData.append("shipping_inventory" , '0');
      formData.append("product_shipdate", this.formatter.format(this.fromDate));
      formData.append("product_endshipdate", this.formatter.format(this.toDate));
      formData.append("product_deadline", this.formatter.format(this.product_deadline));
      formData.append("out_of_stock", this.out_of_stock);
      formData.append("sell_type", this.sell_type);
      formData.append("prepack_type", this.prepack_type);
      formData.append("testers_price", this.testers_price);
      formData.append("reatailers_inst", this.reatailers_inst);
      formData.append("reatailer_input_limit", this.reatailer_input_limit);
      formData.append("retailer_min_qty", this.retailer_min_qty);
      formData.append("retailer_add_charge", this.retailer_add_charge);
      formData.append("featured_image", this.featured_image);
      formData.append("keep_product", this.keep_product);

      for (var i = 0; i < this.product_images.length; i++) { 
        formData.append("product_images[]", this.product_images[i]);
      }
      let varPriceError = 0;

      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.status == 'published' && (elementVar.usd_wholesale_price == '' || elementVar.usd_wholesale_price == null || elementVar.usd_wholesale_price == undefined || elementVar.usd_retail_price == '' || elementVar.usd_retail_price == null || elementVar.usd_retail_price == undefined)) {
          varPriceError = 1 ;
        }
      });

      formData.append("colorOptionItems", JSON.stringify(this.colorOptionItems));

      formData.append("option_type", this.option_type);
      this.resultAttribute.forEach((element: any , index:any) => {
        this.resultAttribute[index].swatch_image = '';
      });

      formData.append("variations" , JSON.stringify(this.resultAttribute));
      this.prepackLists.forEach((element: any) => {
        if(element.active == true) {
          element.active = '1';
        } else { 
          element.active = '0';
        }
      });
      formData.append("pre_packs" , JSON.stringify(this.prepackLists));

      let prepackError = 0;
      this.prepackLists.forEach((element: any) => {
        if((element.pack_name == '' || element.pack_name == null || element.size_ratio == '' || element.size_ratio == null || element.size_range_value == '' || element.size_range_value == null ) && element.status == 'published' ) {
          prepackError = 1 ;
        }
      });

      if(this.product_type ==  undefined || this.product_type == null || this.product_type == 0 || this.product_type == '0') {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Product type field is required.",summary: '' ,duration: 4000});
        return false;
      } else if(this.product_made == undefined || this.product_made == 'undefined' || this.product_made == '0' ) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Product made field is required.",summary: '' ,duration: 4000});
        return false;
      }  
      else if(varPriceError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Products must have both a wholesale and a retail price.",summary: '' ,duration: 4000});
        return false;
      } else if(this.order_min_case_qty == 'undefined' || this.order_min_case_qty == '0' ) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        if(this.option_type.includes('Size')) {
  
          this.toast.error({detail:"Please choose one sell type.",summary: '' ,duration: 4000});
        } else {

          this.toast.error({detail:"Ordering details is required.",summary: '' ,duration: 4000});
        }
        
        return false;
      } else if(this.prepackLists.length > 0 && this.hideCreatePrepack == true && prepackError == 1 ) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Prepack list can't be blank.",summary: '' ,duration: 4000});
        return false;
      } else if(this.instructionsRetailers == true && ( this.reatailers_inst  == 'null' || this.reatailers_inst == null || this.reatailers_inst == '' || this.reatailers_inst == 'undefined' || this.reatailers_inst == undefined || this.reatailers_inst == '0' || this.reatailers_inst == 0 || this.reatailer_input_limit  == 'null' || this.reatailer_input_limit == null || this.reatailer_input_limit == '' || this.reatailer_input_limit == 'undefined' || this.reatailer_input_limit == undefined || this.reatailer_input_limit == '0' || this.reatailer_input_limit == 0 || this.retailer_min_qty  == 'null' || this.retailer_min_qty == null || this.retailer_min_qty == '' || this.retailer_min_qty == 'undefined' || this.retailer_min_qty == undefined || this.retailer_min_qty == '0' || this.retailer_min_qty == 0  )) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Retailers customize section can't be blank.",summary: '' ,duration: 4000});
        return false;
      } else if (this.retailersPreOrderDate == true && ( this.fromDate == null || this.toDate == null || this.fromDate == '' || this.toDate == '' )) {
        this.publistBtnDisabled = false; 
        this.notValidError = true;
        this.toast.error({detail:"Ship date can't be blank.",summary: '' ,duration: 4000});
        return false;
      } else {
        this.apiService.editProduct(formData).subscribe((responseBody) => {
          let response = JSON.parse(JSON.stringify(responseBody));
          if(response.res == true) {
            this.toast.success({detail:"SUCCESS",summary: 'Product updated successfully.' ,duration: 4000});
            this.notValidError = false;
            this.publistBtnDisabled = false;
            this.notValidErrorMsg = '';
            this.product_images = [];
            this.previews = [];
            this.isDirty = false;
            this.closeDetectChangeModal();
            if(addProductForm == 'fromPopup' && this.routeName) {
              this.router.navigate([this.routeName]);
            } else {
              this.getProductDetail();
            }

          } else {
            this.notValidError = true;
            this.publistBtnDisabled = false;
            this.notValidErrorMsg = 'Something went wrong. please try again later!';
          }
        }, (error:any) => {
          this.publistBtnDisabled = false;
          this.notValidErrorMsg = 'Something went wrong. please try again later!';
        })
        return true;
      } 
    }
  }

  //date-range
  onDateSelection(date: NgbDate) {
    this.isDirty = true;
    if (!this.fromDate && !this.toDate) { 
      this.fromDate = date;
      this.product_shipdate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.product_endshipdate = date;
      this.myRangeInput.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  closeModal() {  
    this.selectColorModal.close();
    this.resultAttributeImgPreview.forEach((element: any , arttrindex:any) => {
      this.colorOptionItems.forEach((element1 :any) => {
        if(element1.name == element.Color) {
           if(element1.img != '') {
            element.swatch_image = element1.img;
           }              
        } 
      });
    });
  }

  cropImage(imgId: any) {
    this.currentProcessingImg = imgId;
    var imgObj = this.allImageChangedEventArray.find((x:any) => x.imgId === imgId);
    //created dummy event Object and set as imageChangedEvent so it will set cropper on this image 
    if(imgObj) {
      var event = {
        target: {
          files: [imgObj.imgFile]
        }
      };
      this.imageChangedEvent = event;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedCropFiles = event.target.files;
    for (var i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      this.imageProcess(event, event.target.files[i]);
      reader.onload = (e: any) => {
       this.previews.push(e.target.result);
      };
      reader.readAsDataURL(event.target.files[i]);
    }
}

imageProcess(event: any, file: any) {
  //Setting images in our required format
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    this.imgId = this.imgId + 1;
    this.allImageChangedEventArray.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: file });
  };
}

onOpenSwatchModal(color: any) {
  this.colorOptionItems.forEach((element: any , index: any) => {
      if(element.name == color) {
        this.changeSwatchName(index);
        this.cropImage(index+1);
        this.imageChangedEvent = '';
      }
  });
}

changeSwatchName(index:any) {
  let name = this.colorOptionItems.find((element :any , i:any) => i == index);
  this.swatchName = name.name;
  this.swatchIndex = index;
  
}

onCropperImgChange(index:any) {
}

imageCropped(event: ImageCroppedEvent) {
    this.colorOptionItems[this.swatchIndex].img = event.base64;
    this.croppedImage = event.base64;
    this.croppedImageReady = event.base64;
}

imageLoaded(image: LoadedImage) {
    // show cropper
}

cropperReady() {
    // cropper ready
}

loadImageFailed() {
    // show message
}

addAttribute() {
  let localresultAttribute: any = [];
    let attributes = this.option_type;
    let optionNotBlank =  true;
    attributes.forEach((element :any , key :any) => {
      if(element == '') {
        optionNotBlank = false;
        return;
      }
    })

    let optionValueNotBlank = true;
    let tempoption_items = [...this.option_items];
    tempoption_items = tempoption_items.filter((item: any) => item[0]?.value != undefined);
    if(attributes.length != tempoption_items.length){
      this.option_items.forEach((elementOT: any) => {
        if(elementOT.value == undefined || elementOT.value == null || elementOT.value == '' || elementOT.value ) {
          optionValueNotBlank = false;
        }
      });
    }
    
    if(this.lists.length == attributes.length && optionNotBlank == true && optionValueNotBlank == true) {
      if(attributes.length == 1) {
            this.option_items[0].forEach((element :any , key :any) => {
              let var_options = [attributes[0]];
                let var_values = [element.value];
                localresultAttribute.push({ 'variation_options': var_options, 'variation_values': var_values, 'status': 'published', 'option1': attributes[0], 'option2': '','option3': '', 'value1': element.value, 'value2': '','value3': '',  [attributes[0]]:element.value , 'images': [],'image_index': '',  'swatch_image': '', 'sku' : '' , 'usd_wholesale_price': 0 , 'usd_retail_price': 0 , 'cad_wholesale_price': 0, 'cad_retail_price': 0, 'gbp_wholesale_price': 0, 'gbp_retail_price': 0, 'eur_wholesale_price': 0, 'eur_retail_price': 0, 'aud_wholesale_price': 0, 'aud_retail_price': 0, 'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});
            });
          }
      if(attributes.length == 2) {
            this.option_items[1]?.forEach((element1 :any) => {
              this.option_items[0]?.forEach((element0 :any , key: any) => {
                let var_options = [attributes[0], attributes[1]];
                let var_values = [element0.value, element1.value];
                localresultAttribute.push({ 'variation_options': var_options, 'variation_values': var_values,'status': 'published', 'option1': attributes[0], 'option2': attributes[1],'option3': '', 'value1': element0.value, 'value2': element1.value,'value3': '',  [attributes[0]]:element0.value,[attributes[1]]:element1.value, 'images': [],'image_index': '', 'swatch_image': '', 'sku' : '' , 'usd_wholesale_price': 0 , 'usd_retail_price': 0 , 'cad_wholesale_price': 0, 'cad_retail_price': 0, 'gbp_wholesale_price': 0, 'gbp_retail_price': 0, 'eur_wholesale_price': 0, 'eur_retail_price': 0, 'aud_wholesale_price': 0, 'aud_retail_price': 0, 'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});
              });
            });
      }
      if(attributes.length == 3) {
            this.option_items[2].forEach((element2 :any) => {
              this.option_items[1].forEach((element1 :any) => {
                  this.option_items[0].forEach((element0 :any) => {
                    let var_options = [attributes[0], attributes[1], attributes[2]];
                    let var_values = [element0.value, element1.value, element2.value];
                    localresultAttribute.push({'variation_options': var_options, 'variation_values': var_values,'status': 'published', 'option1': attributes[0], 'option2': attributes[1],'option3': attributes[2], 'value1': element0.value, 'value2': element1.value,'value3': element2.value, [attributes[0]]:element0.value, [attributes[1]]:element1.value,[attributes[2]]:element2.value, 'images': [],'image_index': '', 'swatch_image': '', 'sku' : '' , 'usd_wholesale_price': 0 , 'usd_retail_price': 0, 'cad_wholesale_price': 0, 'cad_retail_price': 0, 'gbp_wholesale_price': 0, 'gbp_retail_price': 0, 'eur_wholesale_price': 0, 'eur_retail_price': 0, 'aud_wholesale_price': 0, 'aud_retail_price': 0, 'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});
                });
              });
            });
      }
      let prevresultAttribute = [...this.resultAttribute];
      let loopitem = 0;
      this.resultAttribute.forEach((reselem: any, reskey: any) => {
        loopitem = 0;
        localresultAttribute.forEach((locelement: any, lockey: any) => {
          
          if(locelement.checked != true && loopitem == 0) {
            if(prevresultAttribute[0].option1 != locelement.option1 && prevresultAttribute[0].option2 != locelement.option2 && prevresultAttribute[0].option3 != locelement.option3) {
              prevresultAttribute[0].status = 'deleted';
              prevresultAttribute[0].checked = true;
              localresultAttribute.push(prevresultAttribute[0]);
            } else {
              localresultAttribute[lockey].variant_id = prevresultAttribute[0].variant_id;
              localresultAttribute[lockey].usd_wholesale_price = prevresultAttribute[0].usd_wholesale_price;
              localresultAttribute[lockey].usd_retail_price = prevresultAttribute[0].usd_retail_price;
              localresultAttribute[lockey].inventory = prevresultAttribute[0].inventory;
              localresultAttribute[lockey].image_index = prevresultAttribute[0].image_index;
              localresultAttribute[lockey].swatch_image = prevresultAttribute[0].swatch_image;
              localresultAttribute[lockey].preview_images = prevresultAttribute[0].preview_images;
              localresultAttribute[lockey].aud_wholesale_price = prevresultAttribute[0].aud_wholesale_price;
              localresultAttribute[lockey].aud_retail_price = prevresultAttribute[0].aud_retail_price;
              localresultAttribute[lockey].cad_wholesale_price = prevresultAttribute[0].cad_wholesale_price;
              localresultAttribute[lockey].cad_retail_price = prevresultAttribute[0].cad_retail_price;
              localresultAttribute[lockey].eur_wholesale_price = prevresultAttribute[0].eur_wholesale_price;
              localresultAttribute[lockey].eur_retail_price = prevresultAttribute[0].eur_retail_price;
              localresultAttribute[lockey].gbp_wholesale_price = prevresultAttribute[0].gbp_wholesale_price;
              localresultAttribute[lockey].gbp_retail_price = prevresultAttribute[0].gbp_retail_price;
              localresultAttribute[lockey].height = prevresultAttribute[0].height;
              localresultAttribute[lockey].height_unit = prevresultAttribute[0].height_unit;
              localresultAttribute[lockey].length = prevresultAttribute[0].length;
              localresultAttribute[lockey].length_unit = prevresultAttribute[0].length_unit;
              localresultAttribute[lockey].tariff_code = prevresultAttribute[0].tariff_code;
              localresultAttribute[lockey].weight = prevresultAttribute[0].weight;
              localresultAttribute[lockey].weight_unit = prevresultAttribute[0].weight_unit;
              localresultAttribute[lockey].width = prevresultAttribute[0].width;
              localresultAttribute[lockey].width_unit = prevresultAttribute[0].width_unit;
              localresultAttribute[lockey].website = prevresultAttribute[0].website;
              localresultAttribute[lockey].website_product_id = prevresultAttribute[0].website_product_id;
              localresultAttribute[lockey].variation_id = prevresultAttribute[0].variation_id;
              localresultAttribute[lockey].inventory_item_id = prevresultAttribute[0].inventory_item_id;
              localresultAttribute[lockey].sku = prevresultAttribute[0].sku;
              localresultAttribute[lockey].checked = true;
            }
            loopitem = 1;
          }
        });
        prevresultAttribute.splice(0,1);
      });
    
      this.resultAttributeImgPreview = [];
      localresultAttribute.forEach((elem: any) => {
        this.resultAttributeImgPreview.push(elem);        
        if(elem.preview_images != '' && elem.preview_images != undefined && elem.preview_images.startsWith("http")) {

        }else {
          elem.preview_images = '';
        }
 
      })
      this.resultAttribute = localresultAttribute;  
      if(this.option_type.includes('Color')){
        let index = this.option_type.indexOf('Color');
        let item = this.option_items[index];
        item.forEach((element: any) => {
          this.colorOptionItems.push({ 'name': element.value , 'img': ''});
        });
        } 
        this.optionTypeBlkErr = '';
        this.closeOptionModal();
    } else {
      this.optionTypeBlkErr = 'Option Type and Values Can not be blank';
    }

  let newSizeArray = [];
  if(this.option_type.includes('Size')) {
    let sizeIndex = this.option_type.indexOf('Size');
    this.option_items[sizeIndex].forEach((element: any) => {
      newSizeArray.push(element.value);
    })
  }

  if(this.product_detail.pre_packs.length > 0) {
    if(newSizeArray.length == this.existingSize.length ) {
      let prepackOptionType = [...this.option_type];
      let prepackOptionItems = [...this.option_items];
      if(prepackOptionType.includes('Size')) {
        let index = prepackOptionType.indexOf('Size');
        prepackOptionType.splice(index,1);
        prepackOptionItems.splice(index,1);
      }
  
      if(prepackOptionType.length > 0) {
        if(prepackOptionType.length == 1) {
          prepackOptionItems[0].forEach((element :any , key :any) => {
            let available = 0;
            this.prepackLists.forEach((e: any) => {
              if(element.value == e.style) {
                available = 1;
              }
            });
            if(available == 0 ) {
              this.prepackLists.push({active: false, status: 'published', style:element.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [], size_range_value: '', packs_price: '',ratio_error: ''})
            }
            
          });
        }
        if(prepackOptionType.length == 2) {
          prepackOptionItems[1]?.forEach((element1 :any) => {
            prepackOptionItems[0]?.forEach((element0 :any , key: any) => {
              let available = 0;
            this.prepackLists.forEach((e: any) => {
              if(element0.value+'/'+element1.value == e.style) {
                available = 1;
              }
            });
            if(available == 0 ) {
              this.prepackLists.push({active: false, status: 'published', style:element0.value+'/'+element1.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: '',ratio_error: ''})
            }
            });
          });
        }
      } else {
        this.prepackLists.push({active: false, status: 'published', style:this.product_name,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: ''})
      }
    
      if(this.option_type.includes('Color')){
        let index = this.option_type.indexOf('Color');
        let item = this.option_items[index];
        item.forEach((element: any) => {
          this.colorOptionItems.push({ 'name': element.value , 'img': ''});
        });
      
      }

    
      if(this.option_type.includes('Size')) {
        let index = this.option_type.indexOf('Size');
        let sizeItems = this.option_items[index];
        let sizeItemsClone = [...sizeItems];
        
        let arrOfSize: any = [];
        for( let j=0; j<sizeItemsClone.length; j++) {
          arrOfSize.push(sizeItemsClone[j].value) 
        }
    
        let chunkSize = 2;
        let resArray = [];
        for (let i = 0; i < arrOfSize.length; i += chunkSize) {
          let chunk = arrOfSize.slice(i, i + chunkSize);       
          let splited = chunk.join('-');
          resArray.push(splited);
          // do whatever
        }

        this.sizeItemPrePack = resArray;

    }
   
    } else {
      this.prepackError = 'Update your product listing before crafting a new prepack.';
    }
  } else {


    let prepackOptionType = [...this.option_type];
    let prepackOptionItems = [...this.option_items];
    if(prepackOptionType.includes('Size')) {
      let index = prepackOptionType.indexOf('Size');
      prepackOptionType.splice(index,1);
      prepackOptionItems.splice(index,1);
    }

    if(prepackOptionType.length > 0) {
      this.prepackLists = [];
      if(prepackOptionType.length == 1) {
        prepackOptionItems[0].forEach((element :any , key :any) => {
          if(element.value !== '' && element.value !== null && element.value !== undefined) {
            let available = 0;
            this.prepackLists.forEach((e: any) => {
              if(element.value == e.style) {
                available = 1;
              }
            });
            if(available == 0 ) {
              this.prepackLists.push({active: false, status: 'published', style:element.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [], size_range_value: '', packs_price: '',ratio_error: ''})
            }
          }
          
        });
      }
      if(prepackOptionType.length == 2) {
        prepackOptionItems[1].forEach((element1 :any) => {
          prepackOptionItems[0].forEach((element0 :any , key: any) => {
            if(element1.value !== '' && element1.value !== null && element1.value !== undefined && element0.value !== '' && element0.value !== null && element0.value !== undefined) {
            let available = 0;
          this.prepackLists.forEach((e: any) => {
            if(element0.value+'/'+element1.value == e.style) {
              available = 1;
            }
          });
          if(available == 0 ) {
            this.prepackLists.push({active: false, status: 'published', style:element0.value+'/'+element1.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: '',ratio_error: ''})
          }
        }
          });
        });
      }
    } else {
      this.prepackLists = [];
      let available = 0;
      this.prepackLists.forEach((e: any) => {
        if(this.product_name == e.style) {
          available = 1;
        }
      });
      if(available == 0 ) {
      this.prepackLists.push({active: false, status: 'published', style:this.product_name,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: ''})
      }
    }
  
    if(this.option_type.includes('Color')){
      let index = this.option_type.indexOf('Color');
      let item = this.option_items[index];
      item.forEach((element: any) => {
        this.colorOptionItems.push({ 'name': element.value , 'img': ''});
      });
    
    }

  
    if(this.option_type.includes('Size')) {
      let index = this.option_type.indexOf('Size');
      let sizeItems = this.option_items[index];
      let sizeItemsClone = [...sizeItems];
      
      let arrOfSize: any = [];
      for( let j=0; j<sizeItemsClone.length; j++) {
        arrOfSize.push(sizeItemsClone[j].value) 
      }
  
      let chunkSize = 2;
      let resArray = [];
      for (let i = 0; i < arrOfSize.length; i += chunkSize) {
        let chunk = arrOfSize.slice(i, i + chunkSize);       
        let splited = chunk.join('-');
        resArray.push(splited);
      }
      this.sizeItemPrePack = resArray;
    }
  }
}

  addbutton()  
  {  
    this.lists.push({"declare":""})  
    let  namesToDeleteSet = new Set(this.option_type);
      this.data =  this.data.filter((name) => {
      // return those elements not in the namesToDeleteSet
      return !namesToDeleteSet.has(name);
    });

    let attribute:any = {
      option_type: this.option_type,
      option_item: this.option_items
    }
  } 

  deletebutton(i: number) {  
    this.data.push(this.option_type[i]); 
    this.lists.splice(i, 1);
    this.option_items.splice(i,1);  
    this.option_type.splice(i,1);
  } 

  onItemRemoved(item:any) {

  }

  onItemAdded(item:any) {

  }

  onFocused(e:any){
    // do something when input is focused
  }

  onChangeSearch(val: string) {  
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }


  
  select1stOptionEvent(item:any) {
    // do something with selected item
    this.option1 = item.name;
  }

  select2ndOptionEvent(item:any) {
    // do something with selected item
    this.option2 = item.name;
  }

  select3rdOptionEvent(item:any) {
    this.option3 = item.name;
  }

  showCasePacks() {
    this.openSizing= false;
    this.prePacks= false;
    this.casePacks2= false;
    this.openSizing2= false;
    this.casePacks= true;
  }

  showOpenSizing() {
    this.casePacks= false;
    this.prePacks= false;
    this.casePacks2= false;
    this.openSizing2= false;
    this.openSizing= true;
  }

  showPrePacks() {
    this.casePacks= false;
    this.openSizing= false;
    this.prePacks= true;
    this.casePacks2 = true;
  }
    
  showPrepackCreate(index: any) {
    this.prepackLists[index].dropActive = true;
  }

  showCreatePrepack() { 
    this.hideCreatePrepack = true;
  }

  showSubCasePacks() { 
    this.openSizing2= false;
    this.casePacks2= true;
    this.prepack_type = 1;
  }

  showSubOpenSizing() {
    this.casePacks2= false;
    this.openSizing2= true;
    this.prepack_type = 2;
  }

  proDelete(index :any) {
    this.resultAttribute[index].status = 'deleted';
  }

  selectAttriImages(event: any , index: any) {
    for(let i = 0; i < event.target.files.length; i++) {

      if(event.target.files[i].type == "image/jpeg" || event.target.files[i].type == "image/png" || event.target.files[i].type == "image/jpg" || event.target.files[i].type == "image/gif") {
        const reader = new FileReader();
        this.product_images.push(event.target.files[i]);
        reader.onload = (e: any) => {
          this.resultAttributeImgPreview[index].preview_images.push(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      } else {
      }
     
    }
  }

  openVariantsProductsModal(content:any) { 
    this.variantsProductsModal = this.modalService.open(content, { windowClass: 'variantsProductsModal' });
    this.addColorModal.close();
  }

  selectVarImage(index: any) {
    this.previews.forEach((element , prevIndex) => {
      let image = this.previews.find((x , i) => i == index);
      this.resultAttributeImgPreview[this.varImageIndex].preview_images = image;
      this.resultAttribute[this.varImageIndex].image_index = index;
      this.isDirty = true;
    })
    this.variantsProductsModal.close();
  }

  selectVarImageRow(index: any) {
    this.varImageIndex = index;
    
  }

  
  autoPriceCall() {
    this.apiService.convertPrice(this.usd_wholesale_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.usd_wholesale_price = response.data.USD;
      this.usd_retail_price = this.usd_wholesale_price * 2;
      this.cad_wholesale_price = response.data.CAD;
      this.cad_retail_price = response.data.CAD * 2;
      this.gbp_wholesale_price = response.data.GBP;
      this.gbp_retail_price = response.data.GBP * 2;
      this.aud_wholesale_price = response.data.AUD;
      this.aud_retail_price = response.data.AUD * 2;
      this.eur_wholesale_price = response.data.EUR;
      this.eur_retail_price = response.data.EUR * 2;
    })
  }

  autoRPPriceCall() {
    this.apiService.convertPrice(this.usd_retail_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.usd_wholesale_price = this.usd_retail_price / 2;
      this.usd_retail_price = response.data.USD;
      this.cad_wholesale_price = response.data.CAD / 2;
      this.cad_retail_price = response.data.CAD;
      this.gbp_wholesale_price = response.data.GBP / 2;
      this.gbp_retail_price = response.data.GBP ;
      this.aud_wholesale_price = response.data.AUD / 2;
      this.aud_retail_price = response.data.AUD ;
      this.eur_wholesale_price = response.data.EUR / 2;
      this.eur_retail_price = response.data.EUR;
    })
  }

  onWSChange(index: any) {
    this.apiService.convertPrice(this.resultAttribute[index].usd_wholesale_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.resultAttribute[index].usd_wholesale_price = response.data.USD;
      this.resultAttribute[index].usd_retail_price = this.resultAttribute[index].usd_wholesale_price * 2;
      this.resultAttribute[index].cad_wholesale_price = response.data.CAD;
      this.resultAttribute[index].cad_retail_price = response.data.CAD * 2;
      this.resultAttribute[index].gbp_wholesale_price = response.data.GBP;
      this.resultAttribute[index].gbp_retail_price = response.data.GBP * 2;
      this.resultAttribute[index].aud_wholesale_price = response.data.AUD;
      this.resultAttribute[index].aud_retail_price = response.data.AUD * 2;
      this.resultAttribute[index].eur_wholesale_price = response.data.EUR;
      this.resultAttribute[index].eur_retail_price = response.data.EUR * 2;
    })
  }

  onRPChange(index: any) {
    this.apiService.convertPrice(this.resultAttribute[index].usd_retail_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.resultAttribute[index].usd_wholesale_price = this.resultAttribute[index].usd_retail_price / 2;
      this.resultAttribute[index].usd_retail_price = this.resultAttribute[index].usd_retail_price;
      this.resultAttribute[index].cad_wholesale_price = response.data.CAD / 2;
      this.resultAttribute[index].cad_retail_price = response.data.CAD;
      this.resultAttribute[index].gbp_wholesale_price = response.data.GBP / 2;
      this.resultAttribute[index].gbp_retail_price = response.data.GBP ;
      this.resultAttribute[index].aud_wholesale_price = response.data.AUD / 2;
      this.resultAttribute[index].aud_retail_price = response.data.AUD ;
      this.resultAttribute[index].eur_wholesale_price = response.data.EUR / 2;
      this.resultAttribute[index].eur_retail_price = response.data.EUR;
    })
  }

  onBestSellerChanged(value: any) {
    this.is_bestseller = value;
  }
  onOutsideUsChanged(value: any) {
    this.outside_us = value;
  }

  addPrepackRow(i: any) {
    let item = this.prepackLists[i];
    let style = item.style;
    let newClone = {active: false,status: 'published', style:style, pack_name: '', dropActive: false, size_ratio: '', size_range: [], size_range_value: '', packs_price: '', ratio_error: ''};
    this.prepackLists.splice(i+1, 0, newClone);
  }

  
  sizeRangeChange(index: any , event: any) {
    let splitVal = event.target.value.split('-');
    let splitValRatio = this.prepackLists[index].size_ratio.split('-');
    let resultArray: any = [];
    let tempArray: any = [];
    let sizeCal = 0;
    splitVal.forEach((valElm: any, key: any) => {
      tempArray = [];
      this.resultAttribute.forEach((element :any , key1: any) => {
        if(element.Size){
            if(element.Size == valElm ) {
              tempArray.push(element.usd_wholesale_price);
            }
        }
      });
      resultArray[valElm]=tempArray;
      let average = resultArray[valElm].reduce((a: any, b: any) => a + b, 0) / resultArray[valElm].length;
      sizeCal += splitValRatio[key] * average;
    });
     this.prepackLists[index].packs_price = sizeCal;
  }
  
  
  sizeRatioChange(index: any , event: any) {
    this.prepackLists[index].size_range = [];
    this.prepackLists[index].packs_price = '';
    let indexOfSize = this.option_type.indexOf('Size'); 
    let sizeItemArray = this.option_items[indexOfSize];
    let splitVal = event.target.value.split('-');
    let re = /^\d+(-\d+)*$/;
    let remainder = sizeItemArray.length % 2;
    if(re.test(event.target.value) && sizeItemArray.length > 1 && sizeItemArray.length == splitVal.length && remainder) { 
      this.prepackLists[index].size_range = [];
      this.prepackLists[index].packs_price = '';
      this.prepackLists[index].size_ratio = event.target.value;
      this.prepackLists[index].size_range_value = '';
      this.prepackLists[index].ratio_error = '';
        this.prepackLists[index].size_range = [];
        this.prepackLists[index].packs_price = '';
        this.prepackLists[index].size_range.push(sizeItemArray[0].value + '-' + sizeItemArray[sizeItemArray.length - 1].value);
    } else if (re.test(event.target.value) && splitVal.length == 2 && !remainder) { 

      this.prepackLists[index].size_range = [];
      this.prepackLists[index].packs_price = '';
      this.prepackLists[index].size_range = this.sizeItemPrePack;
      this.prepackLists[index].size_range_value = '';
      this.prepackLists[index].ratio_error = '';
      this.prepackLists[index].size_ratio = event.target.value;
    } else {
      this.prepackLists[index].size_range = [];
      this.prepackLists[index].packs_price = '';
      this.prepackLists[index].ratio_error ='Invalid size ratio';
    }
    
  }

  savePrePack(index: any) {
    if(this.prepackLists[index].ratio_error != 'Invalid size ratio') {
      this.prepackLists[index].dropActive = false;
    }
  } 

  delPrepackRow(i: any) {
    this.prepackLists[i].status = 'deleted';
  }

  prepackActiveClick(i: any, event: any) {
    this.prepackLists[i].active = event.target.checked;
  }

  prepackNameChange(i: any, event: any) {
    this.prepackLists[i].pack_name = event.target.value;
  }

  onTesterPriceChange(event: any) {
    this.isDirty = true;
    this.testers_price_radio = event.target.checked;
    if(event.target.checked == false) {
      this.testers_price = 0;
    }
  }

  onCustProChange(event: any) {
    this.isDirty = true;
    this.instructionsRetailers = event.target.checked;
    if(event.target.checked == false) {
      this.reatailers_inst = '';
      this.reatailer_input_limit = 0;
      this.retailer_add_charge = 0;
      this.retailer_min_qty = 0;
    }
  }

  onReatPreChange(event: any) {
    this.isDirty = true;
    if(event.target.checked == false) {
      this.toDate = null;
      this.fromDate = null;
      this.product_deadline = null;
    }
  }

  getRouteName(value: any) {
    this.routeName = value;
  }

  onKeepProChange(event: any) {
    this.keep_product = event.target.checked;
  }

  onNextProductClick() {
    if(this.isDirty) {
      this.detectModal = this.modalService.open(this.detectChangeModal, { windowClass: 'detectChangeModal' });
      let route = `/edit-product/${this.nextProductId}`
      this.routeName = route;
    } else {
      this.router.navigate([`/edit-product/${this.nextProductId}`])
      .then(() => {
      });
    }

  }

  onPrevProductClick() {
    if(this.isDirty) {
      this.detectModal = this.modalService.open(this.detectChangeModal, { windowClass: 'detectChangeModal' });
      let route = `/edit-product/${this.prevProductId}`
      this.routeName = route;
    } else {
      this.router.navigate([`/edit-product/${this.prevProductId}`]);
    }

  }

  onProRouteClick() {
    this.routeName = '';
    if(this.isDirty) {
      this.detectModal = this.modalService.open(this.detectChangeModal, { windowClass: 'detectChangeModal' });
      this.routeName = '/products';
    } else {
      this.router.navigate([`/products`]);
    }
  }

  onShipDateChnage(event: any) {
    if(event.target.value == '') {
      this.fromDate = null;
      this.toDate = null;
    }
  }

  onDeleteShipDate() {
    this.fromDate = null;
    this.toDate = null;
  }

  onDeleteDeadLine() {
    this.product_deadline = null;
  }
  
  
}
