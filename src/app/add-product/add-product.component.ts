import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiService } from '../services/api.service';
import '@vime/core/themes/default.css';
import '@vime/core/themes/light.css';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @ViewChild('datepicker') myRangeInput!: any;

  user_id !: any;
  product_name !: any;
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
  sizeRatioError!: any;
  csrftoken!: any;

  outside_us: any = false; 
    
  addOptionsModal: any; 
  addProductModal: any; 
  addColorModal: any;
  selectColorModal: any;
  variantsProductsModal: any;

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
  resultAttributeImgPreview : any = [];
  option_type : any = [];
  indexOfSwatch!: any;
  colorOptionItems: any = [];
  swatchName !: any;
  swatchIndex: any = 0;

  product_images: any = [];
  crop_product_images: any = [];
  categories: any = [];
  product_videos: any = [];
  previews: any[] = [];
  cropPreviews: any[] = [];
  video_url: any[] = [];
  video_modal_url: any[] = [];
  selectedFiles: any[] = [];
  selectedCropFiles: any[] = [];
  sizeItemPrePack: any[] = [];
  sizeItemPrePackShow: any[] = [];
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
  cropperImgArr : any [] = [];
  lists: any = [];
  prepackLists: any = [];
  productKeyword = 'category';


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
  optionTypeBlkErr!:any;

  constructor(public modalService: NgbModal, private apiService: ApiService, private storage: StorageMap, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private router:  Router, private toast: NgToastService) { 
    this.fromDate = null
    this.toDate = null
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    let result = confirm("Changes you made may not be saved.");
    if (result) {
      // Do more processing...
    }
    event.returnValue = false; // stay on same page
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {

    }
  }

  @HostListener('document:keydown.shift.a', ["$event"]) func() {
  }

  ngOnInit(): void {

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

    this.getCountries();
    this.getCategories();
    this.featured_image = 0;
    this.dimension_unit = 'cm';

    this.lists=[]  
    this.lists.push({"declare":""}) 
  }

  openAddColorModal(content:any) { 
    this.addColorModal = this.modalService.open(content, { windowClass: 'colorOptionsModal' });
    this.addProductModal.close();
  }

  openColorModal(content:any) { 
    this.selectColorModal = this.modalService.open(content, { windowClass: 'selectColorModal' });
    this.addColorModal.close();
  }

  closeModal() {  

      this.colorOptionItems.forEach((element1 :any) => {
        if(element1.name == element.Color) {
           if(element1.img != '') {
            element.swatch_image = element1.img;
           }              
        } 
      });
    });
  }

  clickManageOpt() {
    this.colorOptionItems = [];
    this.swatchIndex = 0;
  }

  closeOptionModal() {  
    this.addProductModal.close();
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

  onChangeSearch(val: string) {  
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }


    this.product_type = item.last_id;
  }

  onChangeSearchCat(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocusedCat(e:any){

  }

  chooseNoFunction() { 
    this.showForm3= false;
    this.showForm1= true;
    this.showForm2= true;
    this.clickNo = true;
  }

  chooseYesFunction() { 
    this.showForm2= true;
    this.showForm3= true;
    this.showForm1= false;
    this.clickNo = false;
  }

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
    this.order_case_qty = 1;
    this.order_min_case_qty = 1
    this.casePacks= false;
    this.openSizing= false;
    this.prePacks= true;
    this.casePacks2 = true;
  }
  
  showPrepackCreate(index: any) {
    this.prepackLists[index].dropActive = true;

  }

  savePrePack(index: any) {
    if(this.prepackLists[index].ratio_error != 'Invalid size ratio') {
      this.prepackLists[index].dropActive = false;
    }
  } 

t

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

  hideProductOptions1() { 
    this.productOptions1= false;
    this.moreProductOptions2= false;
    this.moreProductOptions1= true;


      return !namesToDeleteSet.has(name);
    });

    let attribute:any = {
      option_type: this.option_type,
      option_item: this.option_items
    }

   }  

  addPrepackRow(i: any) {
    let item = this.prepackLists[i];
    let style = item.style;


    this.prepackLists.splice(i+1, 0, newClone);
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
      this.prepackLists[index].ratio_error = '';

    } else if (re.test(event.target.value) && splitVal.length == 2 && !remainder) { 

      this.prepackLists[index].size_range = [];
      this.prepackLists[index].packs_price = '';
      this.prepackLists[index].size_range = this.sizeItemPrePack;
      this.prepackLists[index].ratio_error = '';
      this.prepackLists[index].size_ratio = event.target.value;
    } else {
      this.prepackLists[index].size_range = [];
      this.prepackLists[index].packs_price = '';
      this.prepackLists[index].ratio_error ='Invalid size ratio';
    }
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

        }
      });
      resultArray[valElm]=tempArray;
      let average = resultArray[valElm].reduce((a: any, b: any) => a + b, 0) / resultArray[valElm].length;
      sizeCal += splitValRatio[key] * average;
    });

    this.data.push(this.option_type[i]); 
    this.lists.splice(i, 1);
    this.option_items.splice(i,1);  
    this.option_type.splice(i,1);
  }  

  delPrepackRow(i: any) {
    this.prepackLists.splice(i, 1);
  }
  }

  hideProductOptions2() { 
    this.productOptions2= false;
    this.moreProductOptions2= true;
    this.option2 = '';
    this.option_items2 = '';
    delete this.selectedAttribute.option2;
    this.data.push(this.option2);
  }

  hideProductOptions3() { 
    this.productOptions3= false;
    this.moreProductOptions3= true;
  }

  showProductOptions1() { 
    this.moreProductOptions1= false;
    this.productOptions1= true;
    this.moreProductOptions2= true;
  }

  showProductOptions2() {    
    this.moreProductOptions1= false;
    this.moreProductOptions2= false;
    this.productOptions2= true;
    this.moreProductOptions3= true;

    let option1_value1 = this.option_items.map((item:any) => item.value);
    this.selectedAttribute.option1 = {
      key: this.option1,
      values: option1_value1
    };

    let values = Object.keys(this.selectedAttribute).map(key => this.selectedAttribute[key]);
    let childValues = values.map((item:any) => item.key);
  }

  showProductOptions3() { 
    this.moreProductOptions2= false;
    this.moreProductOptions3= false;
    this.productOptions3= true;

    let option1_value2 = this.option_items2.map((item:any) => item.value);
    this.selectedAttribute.option2 = {
      key: this.option2,
      values: option1_value2
    };

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
    })
  }

  openAddProductModal(content:any) {

      this.imageChangedEvent = event;
      this.selectedCropFiles = event.target.files;

      for (var i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();

        this.imageProcess(event, event.target.files[i]);
        this.product_images.push(event.target.files[i]);

        reader.onload = (e: any) => {

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

  cropImage(imgId: any) {

    var event = {
      target: {
        files: [imgObj.imgFile]
      }
    };
    this.imageChangedEvent = event;

  }

  onCropperImgChange(index:any) {
  }

  imageCropped(event: ImageCroppedEvent) {

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
 
  // upload image
  selectFiles(event: any) {

          const reader = new FileReader();
          this.product_images.push(this.selectedFiles[i]);
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);


    if(this.selectedFiles.length < 13){
      this.imgCountArr.splice(0 , this.selectedFiles.length);
    }


    for(let i = 0; i < event.target.files.length; i++) {
      if(event.target.files[i].type == "image/jpeg" || event.target.files[i].type == "image/png" || event.target.files[i].type == "image/jpg" || event.target.files[i].type == "image/gif") {
        const reader = new FileReader();
        this.resultAttribute[index].images.push(event.target.files[i]);
        this.resultAttributeImgPreview[index].images.push(event.target.files[i]);
        this.product_images.push(event.target.files[i]);
        reader.onload = (e: any) => {
          this.resultAttributeImgPreview[index].preview_images.push(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      } else {
        this.toast.error({detail:"ERROR",summary: 'Image type not valid!' ,duration: 4000});
      }
    }
  }

  onFeatureImgSelect(index:any) {
    this.featured_image = index;

  }

  deleteImage(index:any) {
    this.previews = this.previews.filter((item:any , i:any) => i !== index);
    this.product_images = this.product_images.filter((item:any , i:any) => i !== index);
  }

  deleteVideo(index:any) {
    this.video_url = this.video_url.filter((item:any , i:any) => i !== index);
    this.product_videos = this.product_videos.filter((item:any , i:any) => i !== index);
  }

  onSelectVideoFile(event:any) {
  }
  
  openVideoModal(content:any , index:any) { 
    this.videoModalShow = this.modalService.open(content, { windowClass: 'videoModal' });
    this.video_index = index;
    this.video_modal_url =  this.video_url.filter((item:any , i:any) => i == index);
  }

  addAttribute() {
    this.resultAttribute = [];
    this.resultAttributeImgPreview = [];
    
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

    if(attributes.length > 0 && this.lists.length == attributes.length && optionNotBlank == true && optionValueNotBlank == true) {
      if(attributes.length == 1) {
        this.option_items[0].forEach((element :any , key :any) => {
          this.resultAttribute.push({ 'option1': attributes[0], 'option2': '','option3': '', 'value1': element.value, 'value2': '','value3': '',  [attributes[0]]:element.value , 'images': [],'preview_images': [], 'image_index': '', 'swatch_image': '', 'sku' : '' , 'wholesale_price': 0 , 'retail_price': 0 , 'cad_wholesale_price': 0, 'cad_retail_price': 0, 'gbp_wholesale_price': 0, 'gbp_retail_price': 0, 'eur_wholesale_price': 0, 'eur_retail_price': 0, 'aud_wholesale_price': 0, 'aud_retail_price': 0, 'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});
          this.resultAttributeImgPreview.push({ 'option1': attributes[0], 'option2': '','option3': '', 'value1': element.value, 'value2': '','value3': '',  [attributes[0]]:element.value , 'images': [],'preview_images': [], 'image_index': '', 'sku' : '' , 'wholesale_price': 0 , 'retail_price': 0 , 'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});
        });
      }
      if(attributes.length == 2) {
        this.option_items[1].forEach((element1 :any) => {
          this.option_items[0].forEach((element0 :any , key: any) => {
            this.resultAttribute.push({ 'option1': attributes[0], 'option2': attributes[1],'option3': '', 'value1': element0.value, 'value2': element1.value,'value3': '',  [attributes[0]]:element0.value,[attributes[1]]:element1.value, 'images': [],'preview_images': [], 'image_index': '', 'swatch_image': '', 'sku' : '' , 'wholesale_price': 0 , 'retail_price': 0, 'cad_wholesale_price': 0, 'cad_retail_price': 0, 'gbp_wholesale_price': 0, 'gbp_retail_price': 0, 'eur_wholesale_price': 0, 'eur_retail_price': 0, 'aud_wholesale_price': 0, 'aud_retail_price': 0,'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});
            this.resultAttributeImgPreview.push({ 'option1': attributes[0], 'option2': attributes[1],'option3': '', 'value1': element0.value, 'value2': element1.value,'value3': '',  [attributes[0]]:element0.value,[attributes[1]]:element1.value, 'images': [],'preview_images': [], 'image_index': '', 'sku' : '' , 'wholesale_price': 0 , 'retail_price': 0, 'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});

          });
        });
      }
      if(attributes.length == 3) {
        this.option_items[2].forEach((element2 :any) => {
          this.option_items[1].forEach((element1 :any) => {
            this.option_items[0].forEach((element0 :any) => {
            this.resultAttribute.push({ 'option1': attributes[0], 'option2': attributes[1],'option3': attributes[2], 'value1': element0.value, 'value2': element1.value,'value3': element2.value, [attributes[0]]:element0.value, [attributes[1]]:element1.value,[attributes[2]]:element2.value, 'images': [],'preview_images': [], 'image_index': '', 'swatch_image': '', 'sku' : '' , 'wholesale_price': 0 , 'retail_price': 0,'cad_wholesale_price': 0, 'cad_retail_price': 0, 'gbp_wholesale_price': 0, 'gbp_retail_price': 0, 'eur_wholesale_price': 0, 'eur_retail_price': 0, 'aud_wholesale_price': 0, 'aud_retail_price': 0, 'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});
            this.resultAttributeImgPreview.push({ 'option1': attributes[0], 'option2': attributes[1],'option3': attributes[2], 'value1': element0.value, 'value2': element1.value,'value3': element2.value, [attributes[0]]:element0.value, [attributes[1]]:element1.value,[attributes[2]]:element2.value, 'images': [],'preview_images': [], 'image_index': '', 'sku' : '' , 'wholesale_price': 0 , 'retail_price': 0, 'inventory': 0, 'weight': 0 , 'length': 0 , 'length_unit': '' ,'width_unit': '', 'height_unit': '', 'width': 0, 'height': 0 , 'dimension_unit': '' , 'weight_unit': '' , 'tariff_code': 0});

          });
          });
        });
      }
      this.optionTypeBlkErr = '';
      this.closeOptionModal();
    } else {
      this.optionTypeBlkErr = 'Option Type and Values Can not be blank'
    }

    //For Color
    if(this.option_type.includes('Color')){
      let index = this.option_type.indexOf('Color');
      let item = this.option_items[index];
      item.forEach((element: any) => {
        this.colorOptionItems.push({ 'name': element.value , 'img': ''});
      });      
    }

    //For prepack
    if(this.option_type.includes('Size')) {
      let prepackOptionType = [...this.option_type];
      let prepackOptionItems = [...this.option_items];
      if(prepackOptionType.includes('Size')) {
        let index = prepackOptionType.indexOf('Size');
        prepackOptionType.splice(index,1);

      }
  
      if(prepackOptionType.length > 0) {
        this.prepackLists = [];
        if(prepackOptionType.length == 1) {
          prepackOptionItems[0].forEach((element :any , key :any) => {

          });
        }
        if(prepackOptionType.length == 2) {
          prepackOptionItems[1].forEach((element1 :any) => {
            prepackOptionItems[0].forEach((element0 :any , key: any) => {

            });
          });
        }
      } else {
        this.prepackLists = [];
        this.prepackLists.push({active: false,style:this.product_name,pack_name: '',dropActive: false,size_ratio: '',size_range: [],size_range_value: '', packs_price: ''})
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


  onOpenSwatchModal(color: any) {
    this.colorOptionItems.forEach((element: any , index: any) => {
        if(element.name == color) {
          this.changeSwatchName(index);
          this.imageChangedEvent = '';
        }
    });
  }

  changeSwatchName(index:any) {
    let name = this.colorOptionItems.find((element :any , i:any) => i == index);
    this.swatchName = name.name;
    this.swatchIndex = index;
  }

  clickEditSwatch(index:any) {
    this.indexOfSwatch = index;
  }

  onSubmitSwatches() {
    this.resultAttribute[this.indexOfSwatch].swatch_image = 'working';
  }

  proDelete(index :any) {
    this.resultAttribute.splice(index , 1);
    this.resultAttributeImgPreview.splice(index , 1);
  }
 
  onSubmitAddProduct(addProductForm: any) { 
    this.publistBtnDisabled = true;
    if(this.clickNo == true) {
      this.publistBtnDisabled = true;
      const formData = new FormData();
      for (var i = 0; i < this.product_images.length; i++) { 
        formData.append("product_images[]", this.product_images[i]);
      }
      formData.append("country_price", JSON.stringify(this.pricingCountryArray));
      for (var k = 0; k < this.product_videos.length; k++) { 
        formData.append("video_url[]", this.product_videos[k]);
      }
      formData.append("user_id", this.user_id);
      formData.append("product_name", this.product_name);
      formData.append("product_type", this.product_type);

  
      let pricingError = 0;
        if((this.usd_wholesale_price != undefined && this.usd_retail_price != undefined) || (this.cad_wholesale_price != undefined && this.cad_retail_price != undefined) || (this.gbp_wholesale_price != undefined && this.gbp_retail_price != undefined) || (this.eur_wholesale_price != undefined && this.eur_retail_price != undefined) || (this.aud_wholesale_price != undefined && this.aud_retail_price != undefined)) {
          pricingError = 1;
        }
  

        this.toast.error({detail:"Product made field is required.",summary: '' ,duration: 4000});
        return false;
      }else if(this.product_images.length == 0) {
          this.publistBtnDisabled = false;
          this.notValidError = true;
          this.toast.error({detail:"Please add atleast one image.",summary: '' ,duration: 4000});
          return false;

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
          } else if(this.prepackLists.length > 0 && this.hideCreatePrepack == true && this.prePackNameError && prepackError == 0) {
            this.publistBtnDisabled = false;
            this.notValidError = true;
            this.toast.error({detail:"Prepack name is invalid.",summary: '' ,duration: 4000});
            return false;
          } else if(this.instructionsRetailers == true && ( this.reatailers_inst  == 'null' || this.reatailers_inst == null || this.reatailers_inst == '' || this.reatailers_inst == 'undefined' || this.reatailers_inst == undefined || this.reatailers_inst == '0' || this.reatailers_inst == 0 || this.reatailer_input_limit  == 'null' || this.reatailer_input_limit == null || this.reatailer_input_limit == '' || this.reatailer_input_limit == 'undefined' || this.reatailer_input_limit == undefined || this.reatailer_input_limit == '0' || this.reatailer_input_limit == 0 || this.retailer_min_qty  == 'null' || this.retailer_min_qty == null || this.retailer_min_qty == '' || this.retailer_min_qty == 'undefined' || this.retailer_min_qty == undefined || this.retailer_min_qty == '0' || this.retailer_min_qty == 0  )) {
            this.publistBtnDisabled = false;
            this.notValidError = true;
            this.toast.error({detail:"Retailers customize section can't be blank.",summary: '' ,duration: 4000});
            return false;
          } else if (this.retailersPreOrderDate == true && ( this.fromDate == null || this.toDate == null )) {

          } else if(this.instRetError) {
            this.publistBtnDisabled = false;
            this.notValidError = true;
            this.toast.error({detail:"Instructions for retailers is not valid.",summary: '' ,duration: 4000});
            return false;
          } else { 
            this.apiService.createProduct(formData).subscribe((responseBody) => {
              let response = JSON.parse(JSON.stringify(responseBody));
              if(response.res == true) {
                this.toast.success({detail:"Product Added successfully.",summary: '' ,duration: 4000});
                this.notValidError = false;
                this.publistBtnDisabled = false;
                this.notValidErrorMsg = '';
                let values = {
                  user_id: this.user_id,
                  added_product: '1'
                }
                this.apiService.updateVendorDetails(values).subscribe((responseBody) => {
                })
                this.router.navigate(['products']);
              } else {
                this.notValidError = true;
                this.publistBtnDisabled = false;
                this.notValidErrorMsg = response.msg;
              }
            }, (error:any) => {
              this.publistBtnDisabled = false;
              this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
            })
          return true;
        } 
      }
   
  }

  onItemRemoved(item:any) {
  }

  onItemAdded(item:any) {
  }
  
  //date-range
  onDateSelection(date: NgbDate) {
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
  

  openVariantsProductsModal(content:any) { 
    this.variantsProductsModal = this.modalService.open(content, { windowClass: 'variantsProductsModal' });
    this.addColorModal.close();
  }
  
  selectVarImage(index: any) {
    this.previews.forEach((element , prevIndex) => {
      let image = this.previews.find((x , i) => i == index);
      this.resultAttributeImgPreview[this.varImageIndex].preview_images = image;
      this.resultAttributeImgPreview[this.varImageIndex].image_index = index;
      this.resultAttribute[this.varImageIndex].image_index = index;
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

  varAutoPriceCall(index:any) {
  }

  onWSChange(index: any) {

    this.apiService.convertPrice(this.resultAttribute[index].wholesale_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.resultAttribute[index].wholesale_price = response.data.USD;
      this.resultAttribute[index].retail_price = this.resultAttribute[index].wholesale_price * 2;
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
    this.apiService.convertPrice(this.resultAttribute[index].retail_price).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.resultAttribute[index].wholesale_price = this.resultAttribute[index].retail_price / 2;
      this.resultAttribute[index].retail_price = this.resultAttribute[index].retail_price;
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

  optionTypeBlank() {
    this.option_type.forEach((element: any) => {
    });
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

  onIntRetChange(event: any) {
    if(!/^[ A-Za-z0-9_./&+-,']*$/.test(event.target.value)) {
      this.instRetError = true;
    } else {
      this.instRetError = false;
    }
  }

}
