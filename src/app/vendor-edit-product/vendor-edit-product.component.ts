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
import { F } from 'chart.js/dist/chunks/helpers.core';

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
  minDate!: any;
  options_available!: any;

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
  data = ['Size' , 'Material',  'Color' , 'Style', 'Scent'];
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
  proNameError:boolean= false;
  inventoryError!:any;
  tariffError!:any;
  lengthError!:any;
  widthError!:any;
  heightError!:any;
  weightError!:any;
  testersPriceError!:any;
  reatailerInputLimitError!:any;
  retailerAddChargeError!:any;
  caseQtyError!:any;
  instRetError:boolean= false;
  minOrdQtyError!:any;
  prePackNameError:boolean= false;
  skuError:boolean= false;
  blankImgExist:boolean= false;
  varOptionNotBlank:boolean= false;
  duplicateOptionError:boolean= false;
  prevArray: any = [];
  prevOptionsType!: any;
  pricingListError:any = {usdws: '', usdret: '', cadws: '', cadret: '', gbpws: '', gbpret: '', audws: '', audret: '', eurws: '', eurret: '', };
  blankImgExistMsg!: any;

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

  constructor(public modalService: NgbModal, private apiService: ApiService, private storage: StorageMap, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private router:  Router, private activatedRoute: ActivatedRoute, private toast: NgToastService, private appComponent: AppComponent) { 
    this.fromDate = null;
    this.toDate = null;
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
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
    this.featured_image = 0;
    this.lists= [];
    this.dimension_unit = 'cm';
    this.weight_unit = 'kg';
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
    this.lists = [];
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
      this.video_url = [];
      this.prev_product_videos = [];
      this.all_details_videos = [];
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
      this.usd_wholesale_price = response.data[0].usd_wholesale_price;
      this.usd_retail_price = response.data[0].usd_retail_price;
      this.cad_wholesale_price = response.data[0].cad_wholesale_price;
      this.cad_retail_price = response.data[0].cad_retail_price;
      this.gbp_wholesale_price = response.data[0].gbp_wholesale_price;
      this.gbp_retail_price = response.data[0].gbp_retail_price;
      this.eur_wholesale_price = response.data[0].eur_wholesale_price;
      this.eur_retail_price = response.data[0].eur_retail_price;
      this.aud_wholesale_price = response.data[0].aud_wholesale_price;
      this.aud_retail_price = response.data[0].aud_retail_price;

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

      if(response.data[0].usd_tester_price) {
        this.testers_price = parseInt(response.data[0].usd_tester_price);
      }
      
      if(this.testers_price > 0) {
        this.retailersPrice = true;
      }
      
      if(response.data[0].out_of_stock == "true") {
        this.out_of_stock = response.data[0].out_of_stock;
      }
     
      if (response.data[0].usd_tester_price != "undefined" && response.data[0].usd_tester_price != '' && response.data[0].usd_tester_price != '0' && response.data[0].usd_tester_price != '0.00' && response.data[0].usd_tester_price != 'null' && response.data[0].usd_tester_price != null) {
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
        this.options_available = 1;
        this.option_type = response.data[0].option_type;
        this.prevOptionsType = [...response.data[0].option_type];
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
        let prevAryLocal: any = [];
        let varString = '';
        this.resultAttribute.forEach((forResPrev: any) => {
          varString = '';
          this.option_type.forEach((opPrevElm: any) => {
            varString += forResPrev[opPrevElm];
          })
          prevAryLocal.push(varString);
        })
        this.prevArray = prevAryLocal;

        this.prevYesStock = response.data[0].allvariations[0].inventory;

        this.option_items = response.data[0].option_value;

        this.resultAttributeImgPreview = [...response.data[0].allvariations];

        this.colorOptionItems = response.data[0].swatches;

        if(response.data[0].prepack_type != null) {
          this.prepack_type = response.data[0].prepack_type;
          if(response.data[0].prepack_type == '1' || response.data[0].prepack_type == 1) {
            this.showSubCasePacks();
          } else if (response.data[0].prepack_type == '2' || response.data[0].prepack_type == 2) {
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
                    this.prepackLists.push({active: false, status: 'published', style:element.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [], size_range_value: '', packs_price: '',ratio_error: '', name_error: ''})
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
                  this.prepackLists.push({active: false, status: 'published', style:element0.value+'/'+element1.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: '',ratio_error: '', name_error: ''})
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
        
          // if(this.option_type.includes('Color')){
          //   let index = this.option_type.indexOf('Color');
          //   let item = this.option_items[index];
          //   item.forEach((element: any) => {
          //     this.colorOptionItems.push({ 'name': element.value , 'img': element.img});
          //   });
          
          // }
        
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
      } else {
        this.options_available = 0;
      }
    }, (error) => {
      if(error.status == 401) {
        this.toast.error({detail:error.statusText,summary: '' ,duration: 4000});
        this.appComponent.showSpinner = false;
      } else {
        this.toast.error({detail:"Something went wrong. Please try again.",summary: '' ,duration: 4000});
        this.appComponent.showSpinner = false;
      }
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
    if(this.lists.length == 0) {
      this.lists.push({"declare":""});
    }
    if(this.options_available == 0) {
      this.sell_type = '1';
      this.showCasePacks();
    }
    this.isVarAvailable = true;
    this.showForm2= true;
    this.showForm3= true;
    this.showForm1= false;
    this.clickNo = false;
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
    // this.colorOptionItems = [];
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
        let fileName = event.target.files[i].name;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png") {
          const reader = new FileReader();
          this.product_images.push(this.selectedFiles[i]);
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);
        } else {
          this.toast.error({detail:"Only jpg/jpeg and png files are allowed!",summary: "" ,duration: 4000});
        }
      }
    }
    
    if(this.selectedFiles.length < 13){
      this.imgCountArr.splice(0 , this.previews.length);
    }

    let prev_product_images = [...this.product_images];
    if(prev_product_images.length == this.product_images.length) {
      this.isDirty = true;
    }
    event.target.value = '';
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
    } 
    if(this.selectedFiles.length < 13) {
      this.imgCountArr.splice(0 , this.previews.length);
    }
  }

  prevDeleteImage(index:any , image:any) {
    let imageDetail = this.all_details_images.filter((item:any) => item.image === image);
    let values = {
      image_id: imageDetail[0].image_id,
      product_id: this.product_id
    }
    this.apiService.deleteProductImage(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.previews = this.previews.filter((item:any , i:any) => i !== index);
        this.featured_image = 0;
      } else {
        this.toast.error({detail: response.msg,summary: "" ,duration: 4000});
      }
    })
  }

  newDeleteImage(index:any) {
    this.previews = this.previews.filter((item:any , i:any) => i !== index);
    let prev_product_images = [...this.product_images];
    this.product_images = this.product_images.filter((item:any , i:any) => i !== index);
  }

  prevDeleteVideo(index:any , video:any) {
    let videoDetail = this.all_details_videos.filter((item:any) => item.video_url === video);
    let values = {
      id: videoDetail[0].id,
      product_id: this.product_id
    }
    this.apiService.deleteProductVideo(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.video_url = this.video_url.filter((item:any , i:any) => i !== index); 
      } else {
        this.toast.error({detail: response.msg,summary: "" ,duration: 4000});
      }     
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
    if (event.target.files && event.target.files[0] && event.target.files.length < 4 ) {
      for (let i = 0; i < event.target.files.length; i++) {
        let fileName = event.target.files[i].name;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile=="mp4" || extFile=="mkv" || extFile=="mov") {
          var reader = new FileReader();
          if(event.target.files[i].size < 5e+6) {
            this.product_videos.push(event.target.files[i]);
            reader.readAsDataURL(event.target.files[i]);
            reader.onload = (event:any) => {
              this.video_url.push( event.target.result);
            }
          } else {
            this.toast.error({detail:"File is too large. Over 5mb.",summary: "" ,duration: 4000});
          }
        } else {
          this.toast.error({detail:"Only MP4, MOV and MKV files are allowed!",summary: "" ,duration: 4000});
        }
       }
    } else {
      this.toast.error({detail:"3 videos allowed!",summary: "" ,duration: 4000});
    }
    event.target.value = '';
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
      formData.append("description", this.description ? this.description : '');
      formData.append("product_made", this.product_made ? this.product_made : '');
      formData.append("is_bestseller", this.is_bestseller ? this.is_bestseller : '');
      formData.append("usd_wholesale_price" , this.usd_wholesale_price ? this.usd_wholesale_price :'');
      formData.append("usd_retail_price" , this.usd_retail_price ? this.usd_retail_price : '');
      formData.append("cad_wholesale_price" , this.cad_wholesale_price ? this.cad_wholesale_price : '');
      formData.append("cad_retail_price" , this.cad_retail_price ? this.cad_retail_price : '');
      formData.append("gbp_wholesale_price" , this.gbp_wholesale_price ? this.gbp_wholesale_price : '');
      formData.append("gbp_retail_price" , this.gbp_retail_price ? this.gbp_retail_price : '');
      formData.append("eur_wholesale_price" , this.eur_wholesale_price ? this.eur_wholesale_price : '');
      formData.append("eur_retail_price" , this.eur_retail_price ? this.eur_retail_price : '');
      formData.append("aud_wholesale_price" , this.aud_wholesale_price ? this.aud_wholesale_price : '');
      formData.append("aud_retail_price" , this.aud_retail_price ? this.aud_retail_price : '');
      formData.append("outside_us" , this.outside_us ? this.outside_us : '');
      formData.append("shipping_sku" , this.shipping_sku ? this.shipping_sku : '');
      formData.append("shipping_inventory" , this.shipping_inventory ? this.shipping_inventory : '');
      formData.append("shipping_tariff_code" , this.shipping_tariff_code ? this.shipping_tariff_code : '');
      formData.append("shipping_length" , this.shipping_length ? this.shipping_length : '');
      formData.append("dimension_unit" , this.dimension_unit ? this.dimension_unit : '');
      formData.append("shipping_width" , this.shipping_width ? this.shipping_width : '');
      formData.append("shipping_height" , this.shipping_height ? this.shipping_height : '');
      formData.append("shipping_weight" , this.shipping_weight ? this.shipping_weight : '');
      formData.append("weight_unit" , this.weight_unit ? this.weight_unit : '');
      formData.append("order_case_qty" , this.order_case_qty);
      formData.append("order_min_case_qty" , this.order_min_case_qty ? this.order_min_case_qty : '');
      formData.append("out_of_stock" , this.out_of_stock ? this.out_of_stock : '');
      formData.append("featured_image", this.featured_image ? this.featured_image : 0);
      formData.append("testers_price", this.testers_price ? this.testers_price : '');
      formData.append("reatailers_inst", this.reatailers_inst ? this.reatailers_inst : '');
      formData.append("reatailer_input_limit", this.reatailer_input_limit ? this.reatailer_input_limit : '');
      formData.append("retailer_min_qty", this.retailer_min_qty ? this.retailer_min_qty : '');
      formData.append("retailer_add_charge", this.retailer_add_charge ? this.retailer_add_charge : '');
      formData.append("product_shipdate", this.formatter.format(this.fromDate));
      formData.append("product_endshipdate", this.formatter.format(this.toDate));
      formData.append("product_deadline", this.formatter.format(this.product_deadline));
      formData.append("keep_product", this.keep_product ? this.keep_product : '');
      formData.append("sell_type", this.sell_type ? this.sell_type : '');
      formData.append("options_available", '0');
      formData.append("instructionsRetailers", this.instructionsRetailers ? '1' : '0');
      formData.append("retailersPreOrderDate", this.retailersPreOrderDate ? '1' : '0');
      formData.append("retailersPrice", this.retailersPrice ? '1' : '0');
      let pricingError = 0;
      if(this.usd_wholesale_price == undefined || this.usd_retail_price == undefined || this.usd_wholesale_price == '0' || this.usd_retail_price == '0' || this.cad_wholesale_price == undefined || this.cad_retail_price == undefined || this.cad_wholesale_price == '0' || this.cad_retail_price == '0' || this.gbp_wholesale_price == undefined || this.gbp_retail_price == undefined || this.gbp_wholesale_price == '0' || this.gbp_retail_price == '0' || this.eur_wholesale_price == undefined || this.eur_retail_price == undefined || this.eur_wholesale_price == '0' || this.eur_retail_price == '0' || this.aud_wholesale_price == undefined || this.aud_retail_price == undefined || this.aud_wholesale_price == '0' || this.aud_retail_price == '0') {
        pricingError = 1;
      }
      let maxPricingError = 0;
      Object.values(this.pricingListError).forEach((elem:any) => {
        if(elem != '') {
          maxPricingError = 1;
        }
      })
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
    } else if ( pricingError == 1 ) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Pricing list can't be blank.",summary: '' ,duration: 4000});
        return false;
      } else if ( maxPricingError == 1 ) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Pricing list must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.shipping_sku && !/^[A-Za-z0-9]*$/.test(this.shipping_sku)) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Invalid sku.",summary: '' ,duration: 4000});
        return false;
      } else if(this.shipping_inventory && !/^[0-9]{0,6}$/.test(this.shipping_inventory)) {       
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Inventory must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.shipping_tariff_code && !/^[0-9]{0,6}$/.test(this.shipping_tariff_code)) {       
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Tariff Code must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.shipping_length && !/^[0-9]{0,6}$/.test(this.shipping_length)) {       
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Length must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.shipping_width && !/^[0-9]{0,6}$/.test(this.shipping_width)) {       
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Width must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.shipping_height && !/^[0-9]{0,6}$/.test(this.shipping_height)) {       
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Height must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.shipping_weight && !/^[0-9]{0,6}$/.test(this.shipping_weight)) {       
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Weight must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.caseQtyError) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Case quantity must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
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
        } else if(this.retailersPrice == true && ( this.testers_price  == 'null' || this.testers_price == null || this.testers_price == '' || this.testers_price == 'undefined' || this.testers_price == undefined || this.testers_price == '0' || this.testers_price == 0 )) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Testers price can't be blank.",summary: '' ,duration: 4000});
          return false;
        } else if(this.testersPriceError) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Testers price must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
          return false;
        } else if(this.instructionsRetailers == true && ( this.reatailers_inst  == 'null' || this.reatailers_inst == null || this.reatailers_inst == '' || this.reatailers_inst == 'undefined' || this.reatailers_inst == undefined || this.reatailers_inst == '0' || this.reatailers_inst == 0 || this.reatailer_input_limit  == 'null' || this.reatailer_input_limit == null || this.reatailer_input_limit == '' || this.reatailer_input_limit == 'undefined' || this.reatailer_input_limit == undefined || this.reatailer_input_limit == '0' || this.reatailer_input_limit == 0 || this.retailer_min_qty  == 'null' || this.retailer_min_qty == null || this.retailer_min_qty == '' || this.retailer_min_qty == 'undefined' || this.retailer_min_qty == undefined || this.retailer_min_qty == '0' || this.retailer_min_qty == 0  )) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Retailers customize section can't be blank.",summary: '' ,duration: 4000});
          return false;
        } else if(this.instructionsRetailers == true && this.reatailerInputLimitError) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Retailers input must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
          return false;
        } else if(this.instructionsRetailers == true && this.retailerAddChargeError) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Additional must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
          return false;
        } else if(this.retailersPreOrderDate == true && ( this.fromDate == null || this.toDate == null )) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Ship date can't be blank.",summary: '' ,duration: 4000});
          return false;
        } else if(this.instRetError) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Instructions for retailers is not valid.",summary: '' ,duration: 4000});
          return false;
        } else {
        this.apiService.editProduct(formData).subscribe((responseBody) => {
          let response = JSON.parse(JSON.stringify(responseBody));
          if(response.res == true) {
            this.toast.success({detail:"Product updated successfully.",summary: '' ,duration: 4000});
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
            this.toast.error({detail: response.msg, summary: "", duration: 4000});
          }
        },(error) => {
          this.publistBtnDisabled = false;
          this.toast.error({detail: "Something went wrong. please try again later!", summary: "", duration: 4000});
        })
        return true;
      }
    } else {
      let formData = new FormData();
      formData.append("user_id" , this.user_id);
      formData.append("id", this.product_id);
      formData.append("product_name" , this.product_name);
      formData.append("outside_us", this.outside_us ? this.outside_us : ''); 
      formData.append("product_type" ,this.product_type);
      formData.append("description" ,this.description ? this.description : '');
      formData.append("product_made" ,this.product_made ? this.product_made : '');
      formData.append("is_bestseller" ,this.is_bestseller ? this.is_bestseller : '');
      formData.append("order_case_qty" ,this.order_case_qty);
      formData.append("order_min_case_qty" ,this.order_min_case_qty ? this.order_min_case_qty : '');
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
      formData.append("out_of_stock", this.out_of_stock ? this.out_of_stock : '');
      formData.append("sell_type", this.sell_type ?  this.sell_type : '');
      formData.append("prepack_type", this.prepack_type);
      formData.append("testers_price", this.testers_price ? this.testers_price : '');
      formData.append("reatailers_inst", this.reatailers_inst ? this.reatailers_inst : '');
      formData.append("reatailer_input_limit", this.reatailer_input_limit ? this.reatailer_input_limit : '');
      formData.append("retailer_min_qty", this.retailer_min_qty ? this.retailer_min_qty : '');
      formData.append("retailer_add_charge", this.retailer_add_charge ? this.retailer_add_charge : '');
      formData.append("featured_image", this.featured_image ? this.featured_image : 0);
      formData.append("keep_product", this.keep_product ? this.keep_product : '');
      formData.append("options_available", '1');
      formData.append("instructionsRetailers", this.instructionsRetailers ? '1' : '0');
      formData.append("retailersPreOrderDate", this.retailersPreOrderDate ? '1' : '0');
      formData.append("retailersPrice", this.retailersPrice ? '1' : '0');
      formData.append("prepackAvailable", this.hideCreatePrepack ? '1' : '0');
      for (var i = 0; i < this.product_images.length; i++) { 
        formData.append("product_images[]", this.product_images[i]);
      }
      for (var k = 0; k < this.product_videos.length; k++) { 
        formData.append("video_url[]", this.product_videos[k]);
      }

      let maxVarPricingError = 0;
      let varPriceError = 0;
      let skuError = 0;
      let inventoryError = 0;
      let weightError = 0;
      let lengthError = 0;
      let widthError = 0;
      let heightError = 0;
      let tariffCodeError = 0;
      let balnkVarError = 0;
      let duplicateValError = 0;

      //Checking for blank variations options
      this.resultAttribute.forEach((elementVar: any) => {
        if(elementVar.status == 'published') {
          if(this.option_type.length == 1) {
            if(elementVar.value1 == '' || elementVar.value1 == undefined) {
              balnkVarError = 1;
            }
          } else if(this.option_type.length == 2) {
            if(elementVar.value1 == '' || elementVar.value2 == '' || elementVar.value1 == undefined || elementVar.value2 == undefined) {
              balnkVarError = 1;
            }
          } else if(this.option_type.length == 3) {
            if(elementVar.value1 == '' || elementVar.value2 == '' || elementVar.value3 == '' || elementVar.value1 == undefined || elementVar.value2 == undefined || elementVar.value3 == undefined) {
              balnkVarError = 1;
            }
          }
        }
      });

      //Checking for duplicate values in variations
      let prevAryLocal: any = [];
      let varString = '';
      let localResultAttribute: any = [];

      this.resultAttribute.forEach((forResPrev: any) => {
        if(forResPrev.status == 'published') {
          localResultAttribute.push(forResPrev);
        }
      })

      localResultAttribute.forEach((locforResPrev: any) => {
        if(locforResPrev.status == 'published') {
          varString = '';
          this.option_type.forEach((opPrevElm: any) => {
            varString += locforResPrev[opPrevElm];
          })
        }
        prevAryLocal.push(varString);
        // prevAryLocal.forEach((prevAryLocalElm: any) => {
          // if(!prevAryLocal.includes(varString)) {
          //   prevAryLocal.push(varString);
          // } else {
          //   alert('Error');
          // }
        // })
      })

      // prevAryLocal.forEach((elm: any) => {
      //   if(elm == elm)
      // })

      let toFindDuplicates = (arry: any) => arry.filter((item: any, index: any) => arry.indexOf(item) !== index)
      let duplicateElements = toFindDuplicates(prevAryLocal);

      if(duplicateElements.length > 0) {
        duplicateValError = 1;
      }

      this.colorOptionItems.forEach((element1 :any) => {
        if(element1.img == '') {
          this.blankImgExist = true;
        } else {
          this.blankImgExist = false;
        }
      });

      this.resultAttribute.forEach((elementVar: any) => {
        if(elementVar.usdws || elementVar.usdret || elementVar.cadws || elementVar.cadret || elementVar.gbpws || elementVar.gbpret || elementVar.eurws || elementVar.eurret || elementVar.audws || elementVar.audret ) {
          maxVarPricingError = 1 ;
        }
      });
      
      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.status == 'published' && (elementVar.usd_wholesale_price == '' || elementVar.usd_wholesale_price == null || elementVar.usd_wholesale_price == undefined || elementVar.usd_retail_price == '' || elementVar.usd_retail_price == null || elementVar.usd_retail_price == undefined)) {
          varPriceError = 1 ;
        }
      });

      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.status == 'published' && (elementVar.sku && !/^[A-Za-z0-9]*$/.test(elementVar.sku))) {
          skuError = 1 ;
        }
      });
      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.inventory && !/^[0-9]{0,6}$/.test(elementVar.inventory)) {
          inventoryError = 1;
        }
      });
      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.weight && !/^[0-9]{0,6}$/.test(elementVar.weight)) {
          weightError = 1;
        }
      });
      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.length && !/^[0-9]{0,6}$/.test(elementVar.length)) {
          lengthError = 1;
        }
      });
      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.width && !/^[0-9]{0,6}$/.test(elementVar.width)) {
          widthError = 1;
        }
      });
      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.height && !/^[0-9]{0,6}$/.test(elementVar.height)) {
          heightError = 1;
        }
      });
      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.tariff_code && !/^[0-9]{0,6}$/.test(elementVar.tariff_code)) {
          tariffCodeError = 1;
        }
      });

      this.resultAttribute.forEach((elementVar: any) => {
        if( elementVar.status == 'published' && (elementVar.inventory && !/^[0-9]*$/.test(elementVar.inventory))) {
          inventoryError = 1 ;
        }
      });

      formData.append("colorOptionItems", JSON.stringify(this.colorOptionItems));
      formData.append("option_type", this.option_type);

      if(!this.blankImgExist) {
        this.resultAttribute.forEach((element: any , index:any) => {
          this.resultAttribute[index].swatch_image = '';
        });
      }

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
      } else if(balnkVarError) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Please select options in variation.",summary: '' ,duration: 4000});
        return false;
      } else if(duplicateValError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Duplicate values not allowed in variations.",summary: '' ,duration: 4000});
        return false;
      } else if(skuError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Invalid sku.",summary: '' ,duration: 4000});
        return false;
      } else if(varPriceError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Products must have both a wholesale and a retail price.",summary: '' ,duration: 4000});
        return false;
      } else if (maxVarPricingError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Price must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      }  else if(inventoryError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Inventory must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(weightError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Weight must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(lengthError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Length must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(widthError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Width must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(heightError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Height must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(tariffCodeError == 1) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Tariff code must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.blankImgExist) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Please choose each variation image swatches to proceed.",summary: '' ,duration: 4000});
        return false;
      } else if(this.caseQtyError) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Case quantity must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.order_min_case_qty == 'undefined' || this.order_min_case_qty == undefined || this.order_min_case_qty == '0' ) {
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
      } else if(this.prepackLists.length > 0 && this.hideCreatePrepack == true && this.prePackNameError ) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Prepack name is invalid.",summary: '' ,duration: 4000});
        return false;
      } else if(this.retailersPrice == true && ( this.testers_price  == 'null' || this.testers_price == null || this.testers_price == '' || this.testers_price == 'undefined' || this.testers_price == undefined || this.testers_price == '0' || this.testers_price == 0 )) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Testers price can't be blank.",summary: '' ,duration: 4000});
        return false;
      } else if(this.testersPriceError) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Testers price must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.instructionsRetailers == true && ( this.reatailers_inst  == 'null' || this.reatailers_inst == null || this.reatailers_inst == '' || this.reatailers_inst == 'undefined' || this.reatailers_inst == undefined || this.reatailers_inst == '0' || this.reatailers_inst == 0 || this.reatailer_input_limit  == 'null' || this.reatailer_input_limit == null || this.reatailer_input_limit == '' || this.reatailer_input_limit == 'undefined' || this.reatailer_input_limit == undefined || this.reatailer_input_limit == '0' || this.reatailer_input_limit == 0 || this.retailer_min_qty  == 'null' || this.retailer_min_qty == null || this.retailer_min_qty == '' || this.retailer_min_qty == 'undefined' || this.retailer_min_qty == undefined || this.retailer_min_qty == '0' || this.retailer_min_qty == 0  )) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Retailers customize section can't be blank.",summary: '' ,duration: 4000});
        return false;
      } else if(this.instructionsRetailers == true && this.reatailerInputLimitError) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Retailers input must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if(this.instructionsRetailers == true && this.retailerAddChargeError) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Additional Charge must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.",summary: '' ,duration: 4000});
        return false;
      } else if (this.retailersPreOrderDate == true && ( this.fromDate == null || this.toDate == null || this.fromDate == '' || this.toDate == '' )) {
        this.publistBtnDisabled = false; 
        this.notValidError = true;
        this.toast.error({detail:"Ship date can't be blank.",summary: '' ,duration: 4000});
        return false;
      } else if(this.instRetError) {
        this.publistBtnDisabled = false;
        this.notValidError = true;
        this.toast.error({detail:"Instructions for retailers is not valid.",summary: '' ,duration: 4000});
        return false;
      } else {
        this.publistBtnDisabled = false;
        return;
        this.apiService.editProduct(formData).subscribe((responseBody) => {
          let response = JSON.parse(JSON.stringify(responseBody));
          if(response.res == true) {
            this.toast.success({detail:"Product updated successfully.",summary: '' ,duration: 4000});
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
            this.toast.error({detail: response.msg, summary: '' ,duration: 4000});
          }
        }, (error:any) => {
          this.publistBtnDisabled = false;
          this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
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
    this.resultAttributeImgPreview.forEach((element: any , arttrindex:any) => {
      this.colorOptionItems.forEach((element1 :any) => {
        if(element1.name == element.Color) {
           if(element1.img != '') {
            element.swatch_image = element1.img;
           }              
        } 
      });
    });
    this.resultAttributeImgPreview.forEach((element: any , arttrindex:any) => {
      this.colorOptionItems.forEach((element1 :any) => {
        if(element1.img == '') {
          this.blankImgExist = true;
        } else {
          this.blankImgExist = false;
        }
      });
    });
    if(this.blankImgExist) {
      this.blankImgExistMsg = 'Please choose each variation image swatches to proceed.';
    } else {
      this.blankImgExistMsg = '';
      this.selectColorModal.close();
    }
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
    let fileName = event.target.files[0].name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png") {
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
    } else {
      this.toast.error({detail:"Only jpg/jpeg and png files are allowed!",summary: "" ,duration: 4000});
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
  let localresultAttribute: any = this.resultAttribute;
    let attributes = this.option_type;
    let optionNotBlank =  true;
    this.varOptionNotBlank = true;
    attributes.forEach((element :any , key :any) => {
      if(element == '') {
        optionNotBlank = false;
        this.varOptionNotBlank = false;
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
      
      if(this.resultAttribute.length == 0) {
        localresultAttribute.push({ 'variation_options': '', 'variation_values': '', 'status': 'published', 'option1': attributes[0], 'option2': '','option3': '', 'value1': '', 'value2': '','value3': '',  [attributes[0]]:'' , 'images': [],'image_index': '',  'swatch_image': '', 'sku' : '' , 'usd_wholesale_price': '' , 'usd_retail_price': '' , 'cad_wholesale_price': '', 'cad_retail_price': '', 'gbp_wholesale_price': '', 'gbp_retail_price': '', 'eur_wholesale_price': '', 'eur_retail_price': '', 'aud_wholesale_price': '', 'aud_retail_price': '', 'inventory': '', 'weight': '' , 'length': '' , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': '', 'height': '' , 'dimension_unit': 'cm' , 'weight_unit': 'kg' , 'tariff_code': ''});
      }
      

      // if(attributes.length == 1) {
      //   this.option_items[0].forEach((element :any , key :any) => {
      //     let var_options = [attributes[0]];
      //       let var_values = [element.value];
      //       localresultAttribute.push({ 'variation_options': '', 'variation_values': '', 'status': 'published', 'option1': attributes[0], 'option2': '','option3': '', 'value1': element.value, 'value2': '','value3': '',  [attributes[0]]:element.value , 'images': [],'image_index': '',  'swatch_image': '', 'sku' : '' , 'usd_wholesale_price': '' , 'usd_retail_price': '' , 'cad_wholesale_price': '', 'cad_retail_price': '', 'gbp_wholesale_price': '', 'gbp_retail_price': '', 'eur_wholesale_price': '', 'eur_retail_price': '', 'aud_wholesale_price': '', 'aud_retail_price': '', 'inventory': '', 'weight': '' , 'length': '' , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': '', 'height': '' , 'dimension_unit': 'cm' , 'weight_unit': 'kg' , 'tariff_code': ''});
      //   });
      // }
      // if(attributes.length == 2) {
      //   this.option_items[1]?.forEach((element1 :any) => {
      //     this.option_items[0]?.forEach((element0 :any , key: any) => {
      //       let var_options = [attributes[0], attributes[1]];
      //       let var_values = [element0.value, element1.value];
      //       localresultAttribute.push({ 'variation_options': var_options, 'variation_values': var_values,'status': 'published', 'option1': attributes[0], 'option2': attributes[1],'option3': '', 'value1': element0.value, 'value2': element1.value,'value3': '',  [attributes[0]]:element0.value,[attributes[1]]:element1.value, 'images': [],'image_index': '', 'swatch_image': '', 'sku' : '' , 'usd_wholesale_price': '' , 'usd_retail_price': '' , 'cad_wholesale_price': '', 'cad_retail_price': '', 'gbp_wholesale_price': '', 'gbp_retail_price': '', 'eur_wholesale_price': '', 'eur_retail_price': '', 'aud_wholesale_price': '', 'aud_retail_price': '', 'inventory': '', 'weight': '' , 'length': '' , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': '', 'height': '' , 'dimension_unit': 'cm' , 'weight_unit': 'kg' , 'tariff_code': ''});
      //     });
      //   });
      // }
      // if(attributes.length == 3) {
      //   this.option_items[2].forEach((element2 :any) => {
      //     this.option_items[1].forEach((element1 :any) => {
      //         this.option_items[0].forEach((element0 :any) => {
      //           let var_options = [attributes[0], attributes[1], attributes[2]];
      //           let var_values = [element0.value, element1.value, element2.value];
      //           localresultAttribute.push({'variation_options': var_options, 'variation_values': var_values,'status': 'published', 'option1': attributes[0], 'option2': attributes[1],'option3': attributes[2], 'value1': element0.value, 'value2': element1.value,'value3': element2.value, [attributes[0]]:element0.value, [attributes[1]]:element1.value,[attributes[2]]:element2.value, 'images': [],'image_index': '', 'swatch_image': '', 'sku' : '' , 'usd_wholesale_price': '' , 'usd_retail_price': '', 'cad_wholesale_price': '', 'cad_retail_price': '', 'gbp_wholesale_price': '', 'gbp_retail_price': '', 'eur_wholesale_price': '', 'eur_retail_price': '', 'aud_wholesale_price': '', 'aud_retail_price': '', 'inventory': '', 'weight': '' , 'length': '' , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': '', 'height': '' , 'dimension_unit': 'cm' , 'weight_unit': 'kg' , 'tariff_code': ''});
      //       });
      //     });
      //   });
      // }
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
              if(this.option_type.length == 1) {
                localresultAttribute[lockey][this.option_type[0]] = prevresultAttribute[0][this.option_type[0]];
              } else if(this.option_type.length == 2) {
                localresultAttribute[lockey][this.option_type[0]] = prevresultAttribute[0][this.option_type[0]];
                localresultAttribute[lockey][this.option_type[1]] = prevresultAttribute[0][this.option_type[1]];
              } else if(this.option_type.length == 3) {
                localresultAttribute[lockey][this.option_type[0]] = prevresultAttribute[0][this.option_type[0]];
                localresultAttribute[lockey][this.option_type[1]] = prevresultAttribute[0][this.option_type[1]];
                localresultAttribute[lockey][this.option_type[2]] = prevresultAttribute[0][this.option_type[2]];
              }
              localresultAttribute[lockey].value1 = prevresultAttribute[0].value1;
              localresultAttribute[lockey].value2 = prevresultAttribute[0].value2;
              localresultAttribute[lockey].value3 = prevresultAttribute[0].value3;
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
      let extArry:any = [];
      this.colorOptionItems.forEach((opElm: any) => {
        extArry.push(opElm.name.toLowerCase());
      })

      if(this.option_type.includes('Color')) {
        let index = this.option_type.indexOf('Color');
        let item = this.option_items[index];
        item.forEach((element: any, key: any) => {
          if(!extArry.includes(element.value.toLowerCase())) {
            this.colorOptionItems.push({ 'name': element.value , 'img': ''});
          }
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
              this.prepackLists.push({active: false, status: 'published', style:element.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [], size_range_value: '', packs_price: '',ratio_error: '', name_error: ''})
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
              this.prepackLists.push({active: false, status: 'published', style:element0.value+'/'+element1.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: '',ratio_error: '', name_error: ''})
            }
            });
          });
        }
      } else {
        this.prepackLists.push({active: false, status: 'published', style:this.product_name,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: ''})
      }
    
      // if(this.option_type.includes('Color')){
      //   let index = this.option_type.indexOf('Color');
      //   let item = this.option_items[index];
      //   item.forEach((element: any) => {
      //     this.colorOptionItems.push({ 'name': element.value , 'img': ''});
      //   });
      // }

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
              this.prepackLists.push({active: false, status: 'published', style:element.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [], size_range_value: '', packs_price: '',ratio_error: '', name_error: ''})
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
            this.prepackLists.push({active: false, status: 'published', style:element0.value+'/'+element1.value,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: '',ratio_error: '', name_error: ''})
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
  
    // if(this.option_type.includes('Color')){
    //   let index = this.option_type.indexOf('Color');
    //   let item = this.option_items[index];
    //   item.forEach((element: any) => {
    //     this.colorOptionItems.push({ 'name': element.value , 'img': ''});
    //   });
    // }
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

onAddNewOptionClick() {
  this.resultAttribute.push({ 'status': 'published', 'option1': '', 'option2': '','option3': '', 'value1': '', 'value2': '','value3': '', 'images': [],'preview_images': [], 'image_index': '', 'swatch_image': '', 'sku' : '' , 'usd_wholesale_price': '' , 'usd_retail_price': '' , 'cad_wholesale_price': '', 'cad_retail_price': '', 'gbp_wholesale_price': '', 'gbp_retail_price': '', 'eur_wholesale_price': '', 'eur_retail_price': '', 'aud_wholesale_price': '', 'aud_retail_price': '', 'inventory': '', 'weight': '' , 'length': '' , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': '', 'height': '', 'dimension_unit': 'cm' , 'weight_unit': 'kg' , 'tariff_code': ''});
  this.resultAttributeImgPreview.push({ 'option1': '', 'option2': '','option3': '', 'value1': 'element.value', 'value2': '','value3': '', 'images': [],'preview_images': [], 'image_index': '', 'sku' : '' , 'usd_wholesale_price': '' , 'usd_retail_price': '' , 'inventory': '', 'weight': '' , 'length': '' , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': '', 'height': '' , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': ''});
}

onVarOptionFromTableChange(event: any, index: any, attriValue: any) {
  this.resultAttribute[index][attriValue] = event.target.value;
  this.resultAttributeImgPreview[index][attriValue] = event.target.value;
  this.resultAttribute[index].resultAttributeSelect = event.target.value;

  for (var i = 0; i < this.resultAttribute.length; i++) {
    Object.keys(this.resultAttribute[i]).forEach((field: any) => {
    if(this.resultAttribute[i][field] == undefined){
      this.resultAttribute[i][field] = "";
    }
    })                   
  };
  let localArray: any = [];

  this.resultAttribute.forEach((element: any) => {
    if(this.option_type.length == 1) {
      if(!localArray.includes(element[this.option_type[0]])) {
        localArray.push(element[this.option_type[0]]);
        this.resultAttribute[index].option1 = this.option_type[0];
        this.resultAttribute[index].value1 = this.resultAttribute[index][this.option_type[0]];
      }
    } else if (this.option_type.length == 2) {
      if(!localArray.includes(element[this.option_type[0]] + element[this.option_type[1]])) {
        localArray.push(element[this.option_type[0]]+element[this.option_type[1]]);
        this.resultAttribute[index].option1 = this.option_type[0];
        this.resultAttribute[index].option2 = this.option_type[1];
        this.resultAttribute[index].value1 = this.resultAttribute[index][this.option_type[0]];
        this.resultAttribute[index].value2 = this.resultAttribute[index][this.option_type[1]];
        this.resultAttribute[index].duplicateValue = false;
      }
    } else if (this.option_type.length == 3) {
      if(!localArray.includes(element[this.option_type[0]] + element[this.option_type[1]] + element[this.option_type[2]])) {
        localArray.push(element[this.option_type[0]]+element[this.option_type[1]]+element[this.option_type[2]]);
        this.resultAttribute[index].option1 = this.option_type[0];
        this.resultAttribute[index].option2 = this.option_type[1];
        this.resultAttribute[index].option3 = this.option_type[2];
        this.resultAttribute[index].value1 = this.resultAttribute[index][this.option_type[0]];
        this.resultAttribute[index].value2 = this.resultAttribute[index][this.option_type[1]];
        this.resultAttribute[index].value3 = this.resultAttribute[index][this.option_type[2]];
      }
    }
    this.duplicateVarValCheck();
    if(this.option_type.includes('Color')) {
      this.resultAttributeImgPreview.forEach((colorelement: any) => {
        this.colorOptionItems.forEach((colorelement1 :any) => {
          if(colorelement1.name == colorelement.Color) {
             if(colorelement1.img != '') {
              colorelement.swatch_image = colorelement1.img;
             }              
          } 
        });
      });
    }
  });
}

  addbutton() {  
    let tempArray:any = [];
    this.option_type.forEach((elem:any) => {
      if(elem !== '') {
        tempArray.push(elem);
      }
    })
    if(tempArray.length !== this.lists.length) {
      this.optionTypeBlkErr = 'Please select option to add new section.';
    } else {
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
      this.optionTypeBlkErr = '';
    }
  } 

  deletebutton(i: number) {  
    this.data.push(this.option_type[i]); 
    this.lists.splice(i, 1);
    this.option_items.splice(i,1);  
    this.option_type.splice(i,1);
  } 

  onItemRemoved(item:any) {
    for (var i = 0; i < this.resultAttribute.length; i++) {
      Object.keys(this.resultAttribute[i]).forEach((field: any) => {
      if(this.resultAttribute[i][field] == item.value){
        this.resultAttribute[i][field] = "";
      }
      })                   
    };
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
  
  onProNameChange(event: any) {
    if(!/^[a-zA-Z0-9\.\-|',&\s]*$/.test(event.target.value)) {
      this.proNameError = true;
    } else this.proNameError = false;
  }

  onInventoryChange(event: any) {
     if(this.shipping_inventory && !/^[0-9]{0,6}$/.test(this.shipping_inventory)) {
      this.inventoryError = 'Inventory must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.inventoryError = '';
    }
  }

  onLengthChange(event: any) {
    if(this.shipping_length && !/^[0-9]{0,6}$/.test(this.shipping_length)) {
      this.lengthError = 'Length must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.lengthError = '';
  }

  onWidthChange(event: any) {
    if(this.shipping_width && !/^[0-9]{0,6}$/.test(this.shipping_width)) {
      this.widthError = 'Width must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.widthError = '';
  }

  onHeightChange(event: any) {
    if(this.shipping_height && !/^[0-9]{0,6}$/.test(this.shipping_height)) {
      this.heightError = 'Height must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.heightError = '';
  }

  onWeightChange(event: any) {
    if(this.shipping_weight && !/^[0-9]{0,6}$/.test(this.shipping_weight)) {
      this.weightError = 'Weight must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.weightError = '';
  }

  onTariffCodeChange(event: any) {
    if(this.shipping_tariff_code && !/^[0-9]{0,6}$/.test(this.shipping_tariff_code)) {
      this.tariffError = 'Tariff code must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.tariffError = '';
  }

  onTestersPriceChange(event: any) {
    if(this.testers_price && !/^[0-9]{0,6}$/.test(this.testers_price)) {
      this.testersPriceError = 'Testers price must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.testersPriceError = '';
  }

  onRetailerInputChange(event: any) {
    if(this.reatailer_input_limit && !/^[0-9]{0,6}$/.test(this.reatailer_input_limit)) {
      this.reatailerInputLimitError = 'Retailer input must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.reatailerInputLimitError = '';
  }

  onRetailerAddChargeChange(event: any) {
    if(this.retailer_add_charge && !/^[0-9]{0,6}$/.test(this.retailer_add_charge)) {
      this.retailerAddChargeError = 'Retailer charge must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.retailerAddChargeError = '';
  }

  onVarInventoryChange(event: any, index: any) {
    if(event.target.value && !/^[0-9]{0,6}$/.test(event.target.value)) {
      this.resultAttribute[index].inventoryError = "Inventory must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else this.resultAttribute[index].inventoryError = "";
  }

  onVarWeightChange(event: any, index: any) {
    if(event.target.value && !/^[0-9]{0,6}$/.test(event.target.value)) {
      this.resultAttribute[index].weightError = "Weight must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else this.resultAttribute[index].weightError = "";
  }

  onVarLengthChange(event: any, index: any) {
    if(event.target.value && !/^[0-9]{0,6}$/.test(event.target.value)) {
      this.resultAttribute[index].lengthError = "Length must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else this.resultAttribute[index].lengthError = "";
  }

  onVarWidthChange(event: any, index: any) {
    if(event.target.value && !/^[0-9]{0,6}$/.test(event.target.value)) {
      this.resultAttribute[index].widthError = "Width must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else this.resultAttribute[index].widthError = "";
  }

  onVarHeightChange(event: any, index: any) {
    if(event.target.value && !/^[0-9]{0,6}$/.test(event.target.value)) {
      this.resultAttribute[index].heightError = "Height must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else this.resultAttribute[index].heightError = "";
  }

  onVarTariffCodeChange(event: any, index: any) {
    if(event.target.value && !/^[0-9]{0,6}$/.test(event.target.value)) {
      this.resultAttribute[index].tariffCodeError = "Tariff must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else this.resultAttribute[index].tariffCodeError = "";
  }

  onSkuChange(event: any) {
    if(!/^[a-zA-Z0-9]*$/.test(event.target.value)) {
      this.skuError = true;
    } else this.skuError = false;
  }

  onVarSkuChange(event: any, index:any) {
    if(!/^[a-zA-Z0-9]*$/.test(event.target.value)) {
      this.resultAttribute[index].skuError = "Invalid sku";
    } else this.resultAttribute[index].skuError = "";
  }

  onUsdWsChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].usdws = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].usdws = "";
      if(this.outside_us != '1' || this.outside_us != true) {
        this.onWSChange(index);
      }
    }
  }

  onUsdRetChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].usdret = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].usdret = "";
      if(this.outside_us != '1' || this.outside_us != true) {
        this.onRPChange(index);
      }
    }
  }

  onCadWsChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].cadws = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].cadws = "";
    }
  }

  onCadRetChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].cadret = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].cadret = "";
    }
  }

  onGbpWsChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].gbpws = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].gbpws = "";
    }
  }

  onGbpRetChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].gbpret = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].gbpret = "";
    }
  }

  onEurWsChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].eurws = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].eurws = "";
    }
  }

  onEurRetChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].eurret = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].eurret = "";
    }
  }

  onAudWsChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].audws = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].audws = "";
    }
  }

  onAudRetChange(event: any, index:any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.resultAttribute[index].audret = "This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.";
    } else {
      this.resultAttribute[index].audret = "";
    }
  }

  onCaseQtyChange(event: any) {
    if(event.target.value && !/^[0-9]{1,6}$/.test(event.target.value)) {
      this.caseQtyError = 'Case quantity must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.caseQtyError = '';
  }

  onMinOrdQtyChange(event: any) {
    if(!/^[0-9]*$/.test(event.target.value)) {
      this.minOrdQtyError = 'Min order quantity must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else this.minOrdQtyError = '';
  }

  onIntRetChange(event: any) {
    if(!/^[ A-Za-z0-9_./&+-,']*$/.test(event.target.value)) {
      // this.instRetError = true;
    } else {
      // this.instRetError = false;
    }
  }
  
  select1stOptionEvent(item:any) {
    this.option1 = item.name;
  }

  select2ndOptionEvent(item:any) {
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
    this.minOrdQtyError = '';
    this.caseQtyError = false;
    this.hideCreatePrepack = false;

  }

  showOpenSizing() {
    this.casePacks= false;
    this.prePacks= false;
    this.casePacks2= false;
    this.openSizing2= false;
    this.openSizing= true;
    this.minOrdQtyError = '';
    this.caseQtyError = false;
    this.hideCreatePrepack = false;
  }

  showPrePacks() {
    this.casePacks= false;
    this.openSizing= false;
    this.prePacks= true;
    this.minOrdQtyError = '';
    this.caseQtyError = false;
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
    for (var i = 0; i < this.resultAttribute.length; i++) {
      Object.keys(this.resultAttribute[i]).forEach((field: any) => {
      if(this.resultAttribute[i][field] == undefined){
        this.resultAttribute[i][field] = "";
      }
      })                   
    };
    this.resultAttribute[index].status = 'deleted';
    let value = this.resultAttribute[index].value1 + this.resultAttribute[index].value2 + this.resultAttribute[index].value3;
    this.prevArray = this.prevArray.filter((item: any) => item != value);
    this.duplicateVarValCheck();
  }

  duplicateVarValCheck() {
    let prevAryLocal: any = [];
    let varString = '';
    let localResultAttribute: any = [];

    this.resultAttribute.forEach((forResPrev: any) => {
      if(forResPrev.status == 'published') {
        localResultAttribute.push(forResPrev);
      }
    })

    localResultAttribute.forEach((locforResPrev: any) => {
      if(locforResPrev.status == 'published') {
        varString = '';
        this.option_type.forEach((opPrevElm: any) => {
          varString += locforResPrev[opPrevElm];
        })
      }
      prevAryLocal.push(varString);
      // prevAryLocal.forEach((prevAryLocalElm: any) => {
        // if(!prevAryLocal.includes(varString)) {
        //   prevAryLocal.push(varString);
        // } else {
        //   alert('Error');
        // }
      // })
    })

    // prevAryLocal.forEach((elm: any) => {
    //   if(elm == elm)
    // })

    let toFindDuplicates = (arry: any) => arry.filter((item: any, index: any) => arry.indexOf(item) !== index)
    let duplicateElements = toFindDuplicates(prevAryLocal);

    if(duplicateElements.length > 0) {
      this.duplicateOptionError =  true;
    } else {
      this.duplicateOptionError =  false;
    }
  }

  selectAttriImages(event: any , index: any) {
    for(let i = 0; i < event.target.files.length; i++) {
      if(event.target.files[i].type == "image/jpeg" || event.target.files[i].type == "image/png" || event.target.files[i].type == "image/jpg") {
        const reader = new FileReader();
        this.product_images.push(event.target.files[i]);
        reader.onload = (e: any) => {
          this.resultAttributeImgPreview[index].preview_images.push(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      } else {
        this.toast.error({detail:"Only jpg/jpeg and png files are allowed!",summary: "" ,duration: 4000});
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
      this.pricingListError = {usdws: '', usdret: '', cadws: '', cadret: '', gbpws: '', gbpret: '', audws: '', audret: '', eurws: '', eurret: '', };
      this.usd_wholesale_price = response.data.USD;
      this.usd_retail_price =  this.usd_wholesale_price && this.usd_wholesale_price * 2 ;
      this.cad_wholesale_price = response.data.CAD;
      this.cad_retail_price = response.data.CAD && response.data.CAD * 2;
      this.gbp_wholesale_price = response.data.GBP;
      this.gbp_retail_price = response.data.GBP && response.data.GBP * 2;
      this.aud_wholesale_price = response.data.AUD;
      this.aud_retail_price = response.data.AUD && response.data.AUD * 2;
      this.eur_wholesale_price = response.data.EUR;
      this.eur_retail_price = response.data.EUR && response.data.EUR * 2;
    })
  }

  autoRPPriceCall() {
    this.apiService.convertPrice(this.usd_retail_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.pricingListError = {usdws: '', usdret: '', cadws: '', cadret: '', gbpws: '', gbpret: '', audws: '', audret: '', eurws: '', eurret: '', };
      this.usd_wholesale_price = this.usd_retail_price && this.usd_retail_price / 2;
      this.usd_retail_price = response.data.USD;
      this.cad_wholesale_price = response.data.CAD && response.data.CAD / 2;
      this.cad_retail_price = response.data.CAD;
      this.gbp_wholesale_price = response.data.GBP && response.data.GBP / 2;
      this.gbp_retail_price = response.data.GBP ;
      this.aud_wholesale_price = response.data.AUD && response.data.AUD / 2;
      this.aud_retail_price = response.data.AUD ;
      this.eur_wholesale_price = response.data.EUR && response.data.EUR / 2;
      this.eur_retail_price = response.data.EUR;
    })
  }

  onWSChange(index: any) {
    this.apiService.convertPrice(this.resultAttribute[index].usd_wholesale_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.resultAttribute[index].usdws = "";
      this.resultAttribute[index].usdret = "";
      this.resultAttribute[index].cadws = "";
      this.resultAttribute[index].cadret = "";
      this.resultAttribute[index].gbpws = "";
      this.resultAttribute[index].gbpret = "";
      this.resultAttribute[index].eurws = "";
      this.resultAttribute[index].eurret = "";
      this.resultAttribute[index].audws = "";
      this.resultAttribute[index].audret = "";
      
      this.resultAttribute[index].usd_wholesale_price = response.data.USD;
      this.resultAttribute[index].usd_retail_price = this.resultAttribute[index].usd_wholesale_price && this.resultAttribute[index].usd_wholesale_price * 2;
      this.resultAttribute[index].cad_wholesale_price = response.data.CAD;
      this.resultAttribute[index].cad_retail_price = response.data.CAD && response.data.CAD * 2;
      this.resultAttribute[index].gbp_wholesale_price = response.data.GBP;
      this.resultAttribute[index].gbp_retail_price = response.data.GBP && response.data.GBP * 2;
      this.resultAttribute[index].aud_wholesale_price = response.data.AUD;
      this.resultAttribute[index].aud_retail_price = response.data.AUD && response.data.AUD * 2;
      this.resultAttribute[index].eur_wholesale_price = response.data.EUR;
      this.resultAttribute[index].eur_retail_price = response.data.EUR && response.data.EUR * 2;
    })
  }

  onRPChange(index: any) {
    this.apiService.convertPrice(this.resultAttribute[index].usd_retail_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.resultAttribute[index].usdws = "";
      this.resultAttribute[index].usdret = "";
      this.resultAttribute[index].cadws = "";
      this.resultAttribute[index].cadret = "";
      this.resultAttribute[index].gbpws = "";
      this.resultAttribute[index].gbpret = "";
      this.resultAttribute[index].eurws = "";
      this.resultAttribute[index].eurret = "";
      this.resultAttribute[index].audws = "";
      this.resultAttribute[index].audret = "";

      this.resultAttribute[index].usd_wholesale_price = this.resultAttribute[index].usd_retail_price && this.resultAttribute[index].usd_retail_price / 2;
      this.resultAttribute[index].usd_retail_price = this.resultAttribute[index].usd_retail_price;
      this.resultAttribute[index].cad_wholesale_price = response.data.CAD && response.data.CAD / 2;
      this.resultAttribute[index].cad_retail_price = response.data.CAD;
      this.resultAttribute[index].gbp_wholesale_price = response.data.GBP && response.data.GBP / 2;
      this.resultAttribute[index].gbp_retail_price = response.data.GBP ;
      this.resultAttribute[index].aud_wholesale_price = response.data.AUD && response.data.AUD / 2;
      this.resultAttribute[index].aud_retail_price = response.data.AUD ;
      this.resultAttribute[index].eur_wholesale_price = response.data.EUR && response.data.EUR / 2;
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
    let newClone = {active: false,status: 'published', style:style, pack_name: '', dropActive: false, size_ratio: '', size_range: [], size_range_value: '', packs_price: '', ratio_error: '', name_error: ''};
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
    this.prepackLists[index].size_range_value = '';
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

  prepackNameChange(index: any, event: any) {
    this.prepackLists[index].pack_name = event.target.value;
    if(!/[a-zA-Z]{0,255}$/.test(event.target.value)) {
      this.prepackLists[index].name_error = 'Invalid name'
      this.prePackNameError = true;
    } else {
      this.prepackLists[index].name_error = ''
      this.prePackNameError = false;
    }
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
  
  onNoUsdWsChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.usdws = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.usdws = '';
      if(this.outside_us != '1' || this.outside_us != true) {
        this.autoPriceCall();
      }
    }
  }

  onNoUsdRetChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.usdret = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.usdret = '';
      if(this.outside_us != '1' || this.outside_us != true) {
        this.autoRPPriceCall();
      }
    }
  }

  onNoCadWsChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.cadws = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.cadws = '';
    }
  }

  onNoCadRetChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.cadret = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.cadret = '';
    }
  }

  onNoGbpWsChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.gbpws = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.gbpws = '';
    }
  }

  onNoGbpRetChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.gbpret = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.gbpret = '';
    }
  }

  onNoAudWsChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.audws = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.audws = '';
    }
  }

  onNoAudRetChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.audret = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.audret = '';
    }
  }

  onNoEurWsChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.eurws = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.eurws = '';
    }
  }

  onNoEurRetChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.eurret = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.pricingListError.eurret = '';
    }
  }

}
