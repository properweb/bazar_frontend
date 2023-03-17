import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { count, map } from 'rxjs';
import { ApiService } from '../services/api.service';
declare var $: any;
import * as _ from 'lodash';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-vendors-registration',
  templateUrl: './vendors-registration.component.html',
  styleUrls: ['./vendors-registration.component.css'],
})
export class VendorsRegistrationComponent implements OnInit {
  
  vendorRegStep1Form!: any;
  user_id!: any;
  brand_name!: any;
  email!: any;
  website_url!: any;
  prime_cat!: any;
  country!: any;
  num_products_sell!: any;
  num_store!: any;
  about_us!: any;
  agree_terms!: any;
  update_check!: any;
  first_name!: any;
  last_name!: any;
  password!: any;
  country_code!: any;
  phone_number!: any;
  language!: any;
  established_year!: any;
  insta_handle!: any;
  headquatered!: any;
  state!: any;
  city!: any;
  product_made!: any;
  product_shipped!: any;
  num_products_addcatalog!: any;
  stored_carried!: any;
  brand_big_box_store!: any;
  release_inventory!: any;
  tools_used!: any;
  tools_used_other!: any;
  featured_image!: any;
  featured_image_hidden!: any;
  featuredImgAvailable!: any;
  profile_photo!: any;
  cover_image!: any;
  upload_wholesale_img!: any;
  upload_wholesale_xlsx: any = [];
  wholesale_xlsx_names: any = [];
  upload_wholesale_notes!: any;
  shared_brd_story!: any;
  tag_shop_page!: any;
  tag_shop_page_about!: any;
  avg_lead_time!: any;
  first_order_min: any = 1;
  re_order_min: any = 1;
  upload_zip: any = [];
  upload_zip_names: any = [];
  photo_lib_link!: any;
  photo_url!: any;
  bazaar_direct_link!: any;
  upload_contact_list!: any;
  upload_contact_list_names!: any;
  products_xlsx!: any;
  releaseInventorySelected!:any;
  btnDis!:any;
  yearError:any = false;

  featureImageUrl!:any;
  profileImageUrl!:any;
  coverImageUrl!:any;
  spinnerShow: boolean = false;
  cities:any = [];
  checkedToolsArray:any = [];
  tagsToolsArray:any = [];
  release_inventoryArray:any = [];
  stepCount !:any ;
  saveExitCount !:any ;
  errorMsg!:any;
  currentYear!:any;
  validError:any = false;
  featureimgError:boolean = true;
  featureimgModalBtn:boolean = true;
  profileimgError:boolean = true;
  profileimgModalBtn:boolean = true;
  coverimgError:boolean = true;
  coverimgModalBtn:boolean = true;
  excelError:boolean = false;
  zipError:boolean = false;
  avgLeadError:boolean = false;
  brandStoryError:boolean = false;
  firstorderError:any = '';
  reorderErrorMsg:any = '';
  monthSelectError:any = '';
  submitted :boolean = true;

  releaseInventoryCheckBox : any = [
    { value: 'January' ,name: 'January'},
    { value: 'February' ,name: 'February'},
    { value: 'March' ,name: 'March'},
    { value: 'April' ,name: 'April'},
    { value: 'May' ,name: 'May'},
    { value: 'June' ,name: 'June'},
    { value: 'July' ,name: 'July'},
    { value: 'August' ,name: 'August'},
    { value: 'September' ,name: 'September'},
    { value: 'October' ,name: 'October'},
    { value: 'November' ,name: 'November'},
    { value: 'December' ,name: 'December'},
  ]

  toolsUsed:any =[
    { name: 'Shopify', value: 'Shopify' },
    { name: 'WooCommerce', value: 'WooCommerce' },
  ];

  tagsArray:any =[
    { name: 'Eco-friendly', value: 'eco-friendly' },
    { name: 'Not on Amazon', value: 'not-on-amazon' },
    { name: 'Made in Europe', value: 'made-in-europe' },
    { name: 'Social good', value: 'social-good' },
    { name: 'Shop local', value: 'shop-local' },
    { name: 'Local brand', value: 'local-brand' },
  ];

  productTypeYouSell: any = [
    {name: 'Home & Living'},
    {name: 'Personal Care'},
    {name: 'Food & drink'},
    {name: "Women's Apparel"},
    {name: "Women's Accessories"},
    {name: "Men's Apparel"},
    {name: "Men's Accessories"},
    {name: "Jewellery"},
    {name: "Footwear"},
    {name: "Pets"},
  ]

  aboutUs: any = [
    {name: 'Social Media'},
    {name: 'Another Brand'},
    {name: 'A Retailer'},
    {name: "A Bazar employee"},
    {name: "Other"},
  ]

  productSellsArray: any = [
    {name: 'I do not currently sell wholesale product'},
    {name: '1-10'},
    {name: '11-25'},
    {name: "26-50"},
    {name: "51-100"},
    {name: "101-250"},
    {name: "251-500"},
    {name: "500-1000"},
    {name: "More than 1000"},
  ]

  storeWorkWith: any = [
    {name: 'I am new to wholesale'},
    {name: '1-10'},
    {name: '11-25'},
    {name: "26-50"},
    {name: "51-100"},
    {name: "101-250"},
    {name: "251-500"},
    {name: "500-1000"},
    {name: "More than 1000"},
  ]

  defaultLanguageArray: any = [
    {name: 'English'},
    {name: 'Français'},
    {name: 'Deutsch'},
    {name: "Italiano"},
    {name: "Español"},
    {name: "Svenska"},
    {name: "Dansk"},
    {name: "Nederlands"},
    {name: "Português"},
  ]

  primeCat1Array: any = [];

  primeCatArray: any = [
    {name: 'Apparel (Women/Men/Kids & Baby)'},
    {name: 'Accessories (Women/Men/Kids & Baby)'},
    {name: 'Footwear (Women/Men/Kids & Baby)'},
    {name: "Beauty & Wellness"},
    {name: "Home Decor"},
    {name: "Kids & Baby (Gear/Essentials/Toys)"},
    {name: "Food & Drink"},
    {name: "Paper & Novelty"},
    {name: "Pets"},
    {name: "Other"},
  ]

  countriesArray:any = [];
 

  cityArray:any = [];

  stateArray :any = [];

  headquateredArray: any = [
    {name: 'United States of America'},
  ]

  numProductsAddcatalogArray: any = [
    {name: 'Weekly'},
    {name: 'Monthly'},
    {name: 'Quarterly'},
    {name: "Bi-yearly"},
    {name: "Yearly"},
    {name: "Other"},
  ]

  constructor( public modalService: NgbModal, private storage: StorageMap, private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private location:Location, private toast: NgToastService) {}

  ngOnInit(): void {
    $(".featureclassnoImg").css("display", "block");
    $(".featureclassImg").css("display", "none");
    $(".profileclassnoImg").css("display", "block");
    $(".profileclassImg").css("display", "none");
    $(".coverclassnoImg").css("display", "block");
    $(".coverclassImg").css("display", "none");
    const d = new Date();
    let year = d.getFullYear();
    this.currentYear = year;
    this.activatedRoute.params.subscribe((params:any) => {
         this.stepCount = parseInt(params['step_count']);
      });
   
    this.storage.get('vendor_email').subscribe({
      next: (user) => {
        let vEmail = JSON.parse(JSON.stringify(user));
        this.email = vEmail;    
      },
      error: (error) => {
      },
    });

    if(this.stepCount !== 0){
      this.storage.get('user_session').subscribe({
        next: (user) => {
          if(user) {
            let user_session = JSON.parse(JSON.stringify(user));
            this.user_id = user_session.id;
          }
        },
        error: (error) => {
        },          
      });
    } else {
      this.storage.get('vendor_details').subscribe({
        next: (user) => {
          let vendorDetails = JSON.parse(JSON.stringify(user));
          this.user_id = vendorDetails.data['vendor_id'];
        },
        error: (error) => {
        },
      });
    }
    switch (this.stepCount) {
      case 2:
        this.nextFourFunction();
        break;
      case 3:
        this.nextFiveFunction(); 
        break;
      case 4:
        this.nextSixFunction();
        break;
      case 5:
        this.nextEigtFunction();
        break;
      case 6:
        this.nextTenFunction();
        break;
      case 7:
        this.nextTwelveFunction();
        break;
      case 8:
        this.nextfourteenFunction();
        break;
      case 9:
        this.nextSixeenFunction();
        break;
      case 10:
        this.nextSeveneenFunction();
        break;
      case 11:
        this.nextEighteenFunction();
        break;
      case 12:
        this.nextEighteenFunction();
        break;
    
      default:
        break;
    }

    this.getCountries();
    this.getParentCategories();
  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }

  getParentCategories() {
    this.apiService.getParentCategories().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.primeCat1Array = response.data;
      
    })
  }

  forPhoneCode(event: any){
    let id = event.target.value;
    let country = this.countriesArray.filter((item: any) => item.id == id);
    this.country_code = country[0].phone_code;
  }

  onChangeCountry(event: any){
    let countryId = event.target.value;
    this.state = null;
    this.city = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
    })
  }

  onChangeState(event: any) { 
    let stateId = event.target.value;
    this.city = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.cityArray = response.data;
    })
  }

  getVendorDetails(user_id:any) {
    
    this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.brand_name = response.data.brand_name;
      this.website_url = response.data.website_url;
      this.insta_handle = response.data.insta_handle;
      this.established_year = response.data.established_year;
      this.stored_carried = response.data.stored_carried;
      this.first_order_min = response.data.first_order_min;
      this.re_order_min = response.data.re_order_min;
      this.avg_lead_time = response.data.avg_lead_time;
      this.shared_brd_story = response.data.shared_brd_story;
      this.product_made = response.data.product_made;
      this.headquatered = response.data.headquatered;
      this.tag_shop_page = response.data.tag_shop_page;
      this.upload_contact_list = response.data.upload_contact_list;
      this.profile_photo = response.data.profile_photo;
      this.tagsToolsArray = response.data.tag_shop_page;
      this.bazaar_direct_link = response.data.bazaar_direct_link
    })
    
  }
  
  onCheckboxChange(e:any , index:any) { 
    if (e.target.checked) {
      this.release_inventoryArray.push(e.target.value);
    } else {
      this.release_inventoryArray = this.release_inventoryArray.filter((item:any) => item !== e.target.value);
    }
  }

  onQuaterlyCheckboxChange(e:any , index:any) { 
    this.release_inventoryArray = [];
    if (e.target.checked) {
      if(e.target.value == 'January') {
        this.release_inventoryArray.push('January','April','July','October');
      } else if(e.target.value == 'February') {
        this.release_inventoryArray.push('February','May','August','November');
      } else if(e.target.value == 'March') {
        this.release_inventoryArray.push('March','June','September','December');
      } else if(e.target.value == 'April') {
        this.release_inventoryArray.push('January','April','July','October');
      } else if(e.target.value == 'May') {
        this.release_inventoryArray.push('February','May','August','November');
      } else if(e.target.value == 'June') {
        this.release_inventoryArray.push('March','June','September','December');
      } else if(e.target.value == 'July') {
        this.release_inventoryArray.push('January','April','July','October');
      } else if(e.target.value == 'August') {
        this.release_inventoryArray.push('February','May','August','November');
      } else if(e.target.value == 'September') {
        this.release_inventoryArray.push('March','June','September','December');
      } else if(e.target.value == 'October') {
        this.release_inventoryArray.push('January','April','July','October');
      } else if(e.target.value == 'November') {
        this.release_inventoryArray.push('February','May','August','November');
      } else if(e.target.value == 'December') {
        this.release_inventoryArray.push('March','June','September','December');
      } else {}
    } else {
      this.release_inventoryArray = this.release_inventoryArray.filter((item:any) => item !== e.target.value);
    }
  }

  onBiQuaterlyCheckboxChange(e:any , index:any) { 
    this.release_inventoryArray = [];
    if (e.target.checked) {
      if(e.target.value == 'January') {
        this.release_inventoryArray.push('January','July');
      } else if(e.target.value == 'February') {
        this.release_inventoryArray.push('February','August');
      } else if(e.target.value == 'March') {
        this.release_inventoryArray.push('March','September');
      } else if(e.target.value == 'April') {
        this.release_inventoryArray.push('April','October');
      } else if(e.target.value == 'May') {
        this.release_inventoryArray.push('May','November');
      } else if(e.target.value == 'June') {
        this.release_inventoryArray.push('June','December');
      } else if(e.target.value == 'July') {
        this.release_inventoryArray.push('January','July');
      } else if(e.target.value == 'August') {
        this.release_inventoryArray.push('February','August');
      } else if(e.target.value == 'September') {
        this.release_inventoryArray.push('March','September');
      } else if(e.target.value == 'October') {
        this.release_inventoryArray.push('April','October');
      } else if(e.target.value == 'November') {
        this.release_inventoryArray.push('May','November');
      } else if(e.target.value == 'December') {
        this.release_inventoryArray.push('June','December');
      }
    } else {
      this.release_inventoryArray = this.release_inventoryArray.filter((item:any) => item !== e.target.value);
    }
  }

  toolsCheckboxChange(e: any) {
    if (e.target.checked) {
      this.checkedToolsArray.push(e.target.value);
    } else {
      this.checkedToolsArray = this.checkedToolsArray.filter((item:any) => item !== e.target.value);
    }
  }

  tagsCheckboxChange(e: any) {
    if (e.target.checked) {
      this.tagsToolsArray.push(e.target.value);
    } else {
      this.tagsToolsArray = this.tagsToolsArray.filter((item:any) => item !== e.target.value);
    } 
  }

  getWholeSaleCat(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    for (var i = 0; i < event.target.files.length; i++) { 

      if(!_.includes(af, event.target.files[i].type)){
        this.excelError = true;
        setTimeout(() => {
          this.excelError = false;
        }, 3000);
      } else {

        this.upload_wholesale_xlsx.push(event.target.files[i]);
        this.wholesale_xlsx_names.push(event.target.files[i].name);
      }

    }
  }

  getAnotherWholeSaleCat(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    for (var i = 0; i < event.target.files.length; i++) { 
      if(!_.includes(af, event.target.files[i].type)){
        this.excelError = true;
        setTimeout(() => {
          this.excelError = false;
        }, 3000);
      } else {

        this.upload_wholesale_xlsx.push(event.target.files[i]);
        this.wholesale_xlsx_names.push(event.target.files[i].name);
      }
  }
  }

  wholesaleCatDelete(index: any) {
    this.wholesale_xlsx_names.forEach((item:any , i:any)=>{
      if(i==index){ this.wholesale_xlsx_names.splice(i,1); this.upload_wholesale_xlsx.splice(i,1)};
  });
  }

  getProductZip(event: any) {
    let af = ['.zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed'];
    for (var i = 0; i < event.target.files.length; i++) { 
      if(event.target.files[i].name.endsWith('.zip')){
        this.upload_zip.push(event.target.files[i]);
        this.upload_zip_names.push(event.target.files[i].name);  
      } else {       
        this.zipError=true;
        setTimeout(() => {
          this.zipError = false;
        }, 3000);
      }
    }
  }

  onZipDelete(){
    this.upload_zip = [];
    this.upload_zip_names = [];
  }

  onUploadContactList(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    
    if(event.target.files && event.target.files.length > 0) {
      for (var i = 0; i < event.target.files.length; i++) { 
        if(!_.includes(af, event.target.files[i].type)){
          this.excelError = true;
          setTimeout(() => {
            this.excelError = false;
          }, 3000);
        } else {
          this.upload_contact_list=event.target.files[0];
          this.upload_contact_list_names=event.target.files[0].name;
        }
      }
    }

  }

  onContactListDelete() {
    this.upload_contact_list = '';
    this.upload_contact_list_names = '';
  }

  getFeaturedImg(event: any) {
    let fileName = event.target.files[0].name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      this.featured_image = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        this.featureimgError = false;
        this.featureimgModalBtn = false;
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        
        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.featureImageUrl = event.target.result;
        }
      }
      $(".error-msg-feature").text("");
    } else{
      $(".error-msg-feature").text("Only jpg/jpeg and png files are allowed!");
      window.setTimeout(
        (function () {
          return function () {
            return $(".error-msg-feature").text("");
          };
        })(),
        3e3
      );
    } 
  }

  getProfileImg(event: any) {
    let fileName = event.target.files[0].name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        this.profileimgError = false;
        this.profileimgModalBtn = false;
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.profileImageUrl = event.target.result;
        }
      }
      $(".error-msg-profile").text("");
    } else {
      $(".error-msg-profile").text("Only jpg/jpeg and png files are allowed!");
      window.setTimeout(
        (function () {
          return function () {
            return $(".error-msg-profile").text("");
          };
        })(),
        3e3
      );
    }

  } 

  getCoverImg(event: any) {
    let fileName = event.target.files[0].name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      this.cover_image = event.target.files[0];
      this.coverimgModalBtn = false;
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        this.coverimgError = false;
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.coverImageUrl = event.target.result;
        }
      }
      $(".error-msg-cover").text("");
    } else {
      $(".error-msg-cover").text("Only jpg/jpeg and png files are allowed!");
      window.setTimeout(
        (function () {
          return function () {
            return $(".error-msg-cover").text("");
          };
        })(),
        3e3
      );
    }
   
  }

  saveAndExit() {
    let arrayTransform = this.tagsToolsArray.join(',');
    let fullForm = {
      step_count: this.saveExitCount,
      user_id : this.user_id,
      brand_name: this.brand_name,
      email: this.email,
      website_url: this.website_url,
      prime_cat: this.prime_cat,
      country: this.country,
      num_products_sell: this.num_products_sell,
      num_store: this.num_store,
      about_us: this.about_us,
      agree_terms:this.agree_terms,
      update_check: this.update_check,
      first_name:this.first_name,
      last_name:this.last_name,
      password:this.password,
      country_code:this.country_code,
      phone_number: this.phone_number,
      language:this.language,
      established_year:this.established_year,
      insta_handle:this.insta_handle,
      headquatered:this.headquatered,
      state:this.state,
      city:this.city,
      product_made:this.product_made,
      product_shipped: this.product_shipped,
      num_products_addcatalog: this.num_products_addcatalog,
      stored_carried: this.stored_carried,
      brand_big_box_store: this.brand_big_box_store,
      release_inventory:this.release_inventory,
      tools_used: this.tools_used,
      tools_used_other: this.tools_used_other,
      featured_image: this.featured_image,
      profile_photo: this.profile_photo,
      cover_image: this.cover_image,
      upload_wholesale_img: this.upload_wholesale_img,
      upload_wholesale_xlsx: this.upload_wholesale_xlsx,
      upload_wholesale_notes: this.upload_wholesale_notes,
      shared_brd_story: this.shared_brd_story,
      tag_shop_page : arrayTransform,
      tag_shop_page_about: this.tag_shop_page_about,
      avg_lead_time: this.avg_lead_time,
      first_order_min: this.first_order_min,
      re_order_min: this.re_order_min,
      upload_zip: this.upload_zip,
      photo_lib_link: this.photo_lib_link,
      photo_url: this.photo_url,
      bazaar_direct_link: this.bazaar_direct_link,
      upload_contact_list: this.upload_contact_list,
      products_xlsx: this.products_xlsx, 
      releaseInventorySelected: this.releaseInventorySelected
    }
    
      this.apiService.vendorRegistrationStep1(fullForm).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if (response['res'] === true) {
        this.router.navigateByUrl('/localBrands');
      }
    })
    this.router.navigateByUrl('/localBrands');
  }

  sendVendorFormStep1(vendorRegStep1: any) {
    this.checkValidStep1();
  }

  checkValidStep1() {
   this.nextTwoFunction();
  }

  sendVendorFormStep2(vendorFormStep2: any) {
    this.saveExitCount = 2;
    this.spinnerShow = true;
    localStorage.setItem('reg_user', JSON.stringify(vendorFormStep2.value));
    this.apiService.sendVendorEmail(vendorFormStep2.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if( response.res === false) {
        this.errorMsg = response.msg;
        this.spinnerShow = false;
      } else {
        let vendorDetail = JSON.parse(JSON.stringify(responseBody));
      
        this.storage
        .set('vendor_details', vendorDetail)
        .subscribe(() => {});

        this.storage.get('vendor_details').subscribe({
          next: (user) => {
            /* Called if data is valid or `undefined` */
            let vendorDetails = JSON.parse(JSON.stringify(user));
            this.user_id = vendorDetails.data['user_id'];
          },
          error: (error) => {
            /* Called if data is invalid */
            this.spinnerShow = false;
            this.errorMsg = "something went wrong in server.";
          },          
        });
        this.errorMsg = "";
        this.spinnerShow = false;
        this.nextThreeFunction();

      }
    
    }, (error:any) => {
      this.spinnerShow = false;
      this.errorMsg = "something went wrong in server! please try again.";
    })
  }

  sendVendorFormStep3(vendorFormStep3: any) {
    this.btnDis = true;
    this.saveExitCount =3;

    this.apiService.vendorRegistrationStep1(vendorFormStep3.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
        if( response.res === false) {
          this.errorMsg = response.msg;
          this.spinnerShow = false;
          this.btnDis = false;
        } else {
          this.nextFiveFunction();
          this.errorMsg = "";
          this.btnDis = false;
        }
    }, (error:any) => {
      this.spinnerShow = false;
      this.btnDis = false;
      this.toast.error({detail: "something went wrong in server! please try again.", summary: "", duration: 4000})
      this.errorMsg = "";
    })
  }

  sendVendorFormStep4(vendorFormStep4: any) {
    this.saveExitCount=4;
    this.apiService.vendorRegistrationStep1(vendorFormStep4.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if( response.res === false) {
        this.errorMsg = response.msg;
        this.spinnerShow = false;
        this.btnDis = false;
      } else {
        this.nextSixFunction();
        this.errorMsg = "";
        this.btnDis = false;
      }
    }, (error:any) => {
      this.spinnerShow = false;
      this.btnDis = false;
      this.toast.error({detail: "something went wrong in server! please try again.", summary: "", duration: 4000})
      this.errorMsg = "";
    })
  }

  sendVendorFormStep5(vendorFormStep5: any) {
    if(this.num_products_addcatalog !== undefined && this.num_products_addcatalog == 'Quarterly') {
      if(this.release_inventoryArray.length == 0) {
        this.monthSelectError = 'Please select months.';
      } else {
        this.monthSelectError = '';
      }
    } else if(this.num_products_addcatalog !== undefined && this.num_products_addcatalog == 'Bi-yearly') {
      if(this.release_inventoryArray.length == 0) {
        this.monthSelectError = 'Please select months.';
      } else {
        this.monthSelectError = '';
      }
    } else if(this.num_products_addcatalog !== undefined && this.num_products_addcatalog == 'Yearly') {
      if(this.release_inventoryArray.length == 0) {
        this.monthSelectError = 'Please select a month.';
      } else if(this.release_inventoryArray.length > 1) {
        this.monthSelectError = 'You can choose only one month.';
      } else {
        this.monthSelectError = '';
      }
    } else if(this.num_products_addcatalog !== undefined && this.num_products_addcatalog == 'Other') {
      if(this.release_inventoryArray.length == 0) {
        this.monthSelectError = 'Please select a month.';
      } else {
        this.monthSelectError = '';
      }
    } else {}
    if(this.monthSelectError == '') {
      this.saveExitCount=5;
      this.nextEigtFunction();
      let arrayTransform = this.release_inventoryArray.join(',');
      let data = {
        step_count: 5,
        user_id : this.user_id,
        num_products_sell: this.num_products_sell,
        num_products_addcatalog: this.num_products_addcatalog,
        release_inventory: arrayTransform,
        stored_carried: this.stored_carried,
        brand_big_box_store: this.brand_big_box_store
      }
      this.apiService.vendorRegistrationStep1(data).subscribe((responseBody) => {
      })
    }

  }

  sendVendorFormStep7(vendorFormStep7: any) {
    this.nextNineFunction();
    this.saveExitCount=6;
    let arrayTransform = this.checkedToolsArray.join(',');
    let tools = {
      step_count: 6,
      user_id : this.user_id,
      tools_used : arrayTransform,
      tools_used_other : this.tools_used_other
    }
    this.apiService.vendorRegistrationStep1(tools).subscribe((responseBody) => {
    })
  }

  sendVendorFormStep9(vendorFormStep9: any , imgVal:any) {
    let value = $('input#purbayan').val();
    if(value){
      this.saveExitCount=7;
      let values = {
        step_count: 7,
        user_id : this.user_id,
        featured_image : value
      }
      this.nextTwelveFunction();
      this.errorMsg = "";
      this.apiService.vendorRegistrationStep1(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
        } else{

        }
      }, (error) => {
      this.errorMsg = "Something went wrong. Please try again.";
      this.btnDis = false;
    })
    } else {
      this.errorMsg = "Please select image to continue.";
      this.btnDis = false;
    }
  }

  sendVendorFormStep10(vendorFormStep10: any , ProimgVal:any) {  
    let value = $('input#profile_img').val();
    this.saveExitCount=8;
    let values = {
      step_count: 8,
      user_id : this.user_id,
      profile_photo : value
    }
    this.apiService.vendorRegistrationStep1(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {

      }
    })
  }

  sendVendorFormStepCover(vendorFormStepCover: any , coverImgVal:any) { 
    let value = $('input#cover_img').val();
    this.saveExitCount=9;
    let values = {
      step_count: 9,
      user_id : this.user_id,
      cover_image : value
    }
    this.apiService.vendorRegistrationStep1(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
      }
    })
  }

  sendVendorFormStep11(vendorFormStep11: any) {
    this.nextSeveneenFunction();
    this.saveExitCount=10;
    this.validError = false;
    this.apiService.vendorRegistrationStep1(vendorFormStep11.value).subscribe((responseBody) => {
    })
  }

  sendVendorFormStep12(vendorFormStep12: any) {
    this.nextEighteenFunction();
    this.saveExitCount=11;
    let arrayTransform = this.tagsToolsArray.join(',');
    let tools = {
      step_count: 11,
      user_id : this.user_id,
      tag_shop_page : arrayTransform,
      tag_shop_page_about : this.tag_shop_page_about
    }
    this.apiService.vendorRegistrationStep1(tools).subscribe((responseBody) => {
    })
  }

  sendVendorFormStep13(vendorFormStep13: any) {
    this.btnDis = true;
    this.saveExitCount=12;
    this.apiService.vendorRegistrationStep1(vendorFormStep13.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.getVendorDetails(this.user_id);
        this.nextNineteenFunction();
        this.errorMsg = "";
        this.btnDis = false;
      } else {
        this.errorMsg = response.msg;
        this.btnDis = false;
      }
   
    }, (error) => {
      this.errorMsg = "Something went wrong. Please try again.";
      this.btnDis = false;
    })
  }

  sendVendorFormStep14(vendorFormStep14: any) {
    const formData = new FormData();
    for (var i = 0; i < this.upload_wholesale_xlsx.length; i++) { 
      formData.append("upload_wholesale_xlsx[]", this.upload_wholesale_xlsx[i]);
    }
    formData.append("user_id", this.user_id);
    formData.append("upload_wholesale_notes", this.upload_wholesale_notes);

    this.apiService.vendorRegistrationStep1(formData).subscribe((responseBody) => {
      this.nextTwentyOneFunction();
    })
  }

  sendVendorFormStep15(vendorFormStep15: any) {
    this.apiService.vendorRegistrationStep1(vendorFormStep15.value).subscribe((responseBody) => {
    })
  }

  sendVendorFormStep16(vendorFormStep16: any) {
    const formData = new FormData();
    let values = {
      upload_zip: this.upload_zip,
      photo_lib_link: this.photo_lib_link,
      photo_url: this.photo_url
    }

    for (var i = 0; i < this.upload_zip.length; i++) { 
      formData.append("upload_zip", this.upload_zip[i]);
    }
    formData.append("user_id", this.user_id);
    if(this.photo_lib_link){
      formData.append("photo_lib_link", this.photo_lib_link);
    }
    if(this.photo_url){
      formData.append("photo_url", this.photo_url);
    }
   

    this.apiService.vendorRegistrationStep1(formData).subscribe((responseBody) => {
      this.nextTwentyTwoFunction();
    })
    this.nextTwentyTwoFunction();
  }

  sendVendorFormStep17(vendorFormStep17: any) {
    this.apiService.vendorRegistrationStep1(vendorFormStep17.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.nextTwentyFiveFunction();
      } else {
        this.toast.error({detail:response.msg,summary: '' ,duration: 4000});
      }
    }, (error) => {
      this.toast.error({detail: "Something went wrong. PLease try again.",summary: '' ,duration: 4000});
    })
  }

  sendVendorFormStep18(vendorFormStep18: any) {

    const formData = new FormData();
    if( this.upload_contact_list && this.upload_contact_list.length > 0 ) {
      for (var i = 0; i < this.upload_contact_list.length; i++) { 
        formData.append("upload_contact_list", this.upload_contact_list);
      }
    }
    formData.append("user_id", this.user_id);    

    this.apiService.vendorRegistrationStep1(formData).subscribe((responseBody) => {
    })
  }

  sendVendorFinalStep(vendorFinalStep: any) {
    this.btnDis = true;
    var my_object;
    if(JSON.parse(JSON.stringify(localStorage.getItem('from_login_cred')))) {
      my_object = JSON.parse(localStorage.getItem('from_login_cred') || '{}');
    } else {
      my_object = JSON.parse(localStorage.getItem('reg_user') || '{}');
    }
    let values = {
      email: my_object.email,
      password: my_object.password
    }
    this.apiService.vendorRegistrationStep1(vendorFinalStep.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.apiService.vendorSignIn(values).subscribe((responseBody1) => {
          let response1 = JSON.parse(JSON.stringify(responseBody1));
          if (response1.res === false) {
          } else {
            this.storage
            .set('user_session', JSON.parse(JSON.stringify(response1.data)))
            .subscribe(() => {});
            localStorage.setItem('local_data', response1.data.role);
            localStorage.setItem('authorization_data', JSON.stringify(response1.data.authorisation));
            this.toast.success({detail:"Login successful.",summary: "" ,duration: 4000});
            if(response1.data.vendor_data.first_visit == 0) {
              this.router.navigateByUrl('/account-settings').then(() => {
              });
              this.spinnerShow = false;
            } else {
              this.router.navigateByUrl('/brand-portal').then(() => {
              });
              this.spinnerShow = false;
            }
            this.btnDis = false;
            localStorage.removeItem('from_login_cred');
            localStorage.removeItem('reg_user');
          }
        }, (error) => {
          this.spinnerShow = false;
          this.btnDis = false;
          this.toast.error({detail:"Something went wrong. Please try again!",summary: "" ,duration: 4000});
        });
      } else {
        this.toast.error({detail:response.msg,summary: '' ,duration: 4000});
      }
    }, (error) => {
      this.spinnerShow = false;
      this.btnDis = false;
      this.toast.error({detail:"Something went wrong. Please try again!",summary: "" ,duration: 4000});
    });
 
  }

  openUploadFeatureModal(content: any) {
    this.modalService.open(content, { windowClass: 'featureImgModal' });
    this.featureimgModalBtn = true;
    $(".featureImgModalBtn").prop("disabled", true);
    $(function () {
      $('.image-editor').cropit({
        exportZoom: 1,
        width: 500,
        height: 500,
        imageBackground: true,
        imageBackgroundBorderWidth: 30,
        onImageError: function () {
          let value = $('input#purbayan').val();
          if(value) {
            $(".featureclassnoImg").css("display", "none");
            $(".featureclassImg").css("display", "block");
            $(".featureImgModalBtn").removeAttr('disabled');
            $(".featureImgSubBtn").removeAttr('disabled');
          } else {
            $(".featureclassnoImg").css("display", "block");
            $(".featureclassImg").css("display", "none");
            $(".featureImgModalBtn").prop("disabled", true);
            $(".featureImgSubBtn").prop("disabled", true);
          }
          $(".error-msg-feature").text(
            "Please use an image that's at least " +
              500 +
              "px in width and " +
              500 +
              "px in height."
          ),
          window.setTimeout(
            (function () {
              return function () {
                return $(".error-msg-feature").text("");
              };
            })(),
            3e3
          );
          $(".cropit-image-preview").addClass("has-error");
        },
      });
    });

    $('.export').click(function() {
      var imageData = $('.image-editor').cropit('export', {
          type: 'image/jpeg',
          quality: 0.75,
          originalSize: true,
      });
      if(imageData) {
        $("#hidden_base64").attr('src',imageData);
        $("#purbayan").val(imageData);
        $(".featureclassnoImg").css("display", "none");
        $(".featureclassImg").css("display", "block");
        $(".featureImgModalBtn").removeAttr('disabled');
        $(".featureImgSubBtn").removeAttr('disabled');
      }
      $(".error-msg-feature").text("");
    });
  }

  openUploadProfileModal(content: any) {
    this.modalService.open(content, { windowClass: 'UploadProfileModal' });
    this.profileimgModalBtn = true;
    $(".profileImgModalBtn").prop("disabled", true);
    $(function () { 
      $('.image-editor2').cropit({
        exportZoom: 1,
        width: 500,
        height: 500,
        imageBackground: true,
        imageBackgroundBorderWidth: 30,
        onImageError: function () {
          let value = $('input#profile_img').val();

          if(value) {
            $(".profileclassnoImg").css("display", "none");
            $(".profileclassImg").css("display", "block");
            $(".profileImgModalBtn").removeAttr('disabled');
            $(".profileImgSubBtn").removeAttr('disabled');
          } else {
            $(".profileclassnoImg").css("display", "block");
            $(".profileclassImg").css("display", "none");
            $(".profileImgModalBtn").prop("disabled", true);
            $(".profileImgSubBtn").prop("disabled", true);
          }
          $(".error-msg-profile").text(
            "Please use an image that's at least " +
              500 +
              "px in width and " +
              500 +
              "px in height."
          ),   
          window.setTimeout(
            (function () {
              return function () {
                return $(".error-msg-profile").text("");
              };
            })(),
            3e3
          );
          $(".cropit-image-preview").addClass("has-error")
        },
      });
    });

    $('.export').click(function() {
      var imageData = $('.image-editor2').cropit('export', {
          type: 'image/jpeg',
          quality: 0.75,
          originalSize: true,
      });
      if(imageData) {
        //Set value of hidden input to base64
        $("#profile_img_show").attr('src',imageData);
        $("#profile_img_show1").attr('src',imageData);
        $("#profile_img").val(imageData);
        $(".profileclassnoImg").css("display", "none");
        $(".profileclassImg").css("display", "block");
        $(".profileImgModalBtn").removeAttr('disabled');
        $(".profileImgSubBtn").removeAttr('disabled');
      }
      $(".error-msg-profile").text("");
    });
  }

  openUploadCoverModal(content: any) {
    this.modalService.open(content, { windowClass: 'UploadCoverModal' });
    this.coverimgModalBtn = true;
    $(".coverImgModalBtn").prop("disabled", true);
    $(function () {
      $('.image-editor3').cropit({
        exportZoom: 1,
        width: 1111,
        height: 252,
        imageBackground: true,
        imageBackgroundBorderWidth: 30,
        onImageError: function () {
          let value = $('input#cover_img').val();
          if(value) {
            $(".coverclassnoImg").css("display", "none");
            $(".coverclassImg").css("display", "block");
            $(".coverImgModalBtn").removeAttr('disabled');
            $(".coverImgSubBtn").removeAttr('disabled');
          } else {
            $(".coverclassnoImg").css("display", "block");
            $(".coverclassImg").css("display", "none");
            $(".coverImgModalBtn").prop("disabled", true);
            $(".coverImgSubBtn").prop("disabled", true);
          }
          $(".error-msg-cover").text(
            "Please use an image that's at least " +
              1111 +
              "px in width and " +
              252 +
              "px in height."
          ),   
          window.setTimeout(
            (function () {
              return function () {
                return $(".error-msg-cover").text("");
              };
            })(),
            3e3
          );
          $(".cropit-image-preview").addClass("has-error")
        }
      });
    });

    $('.export').click(function() {
      var imageData = $('.image-editor3').cropit('export', {
          type: 'image/jpeg',
          quality: 0.75,
          originalSize: true,
      });
      if(imageData) {
        //Set value of hidden input to base64
        $("#cover_img_show").attr('src',imageData);
        $("#cover_img").val(imageData);
        $(".coverclassnoImg").css("display", "none");
        $(".coverclassImg").css("display", "block");
        $(".coverImgModalBtn").removeAttr('disabled');
        $(".coverImgSubBtn").removeAttr('disabled');
      }
      $(".error-msg-cover").text("");
    });
  }

  validateYear(event:any) {
    if(Number(event.target.value) > Number(this.currentYear) || Number(event.target.value) <= 1899 ) {
      this.yearError = true;
    } else this.yearError = false;
  }

  websiteValidate(event: any) {
    if(/^(ftp|http|https):\/\/[^ "]+$/.test(event.target.value)) {
    } else {
    }
  }

  onAvgLeadChange(event: any) {
    if(Number(event.target.value) <= 0 || Number(event.target.value) > 180 && Number(event.target.value)) {
      this.avgLeadError = true;
    } else {
      this.avgLeadError = false;
    }
  }

  onBrandStoryChange(event: any) {
    if(!/^[ A-Za-z0-9_./&+-,']*$/.test(event.target.value)) {
      this.brandStoryError = true;
    } else {
      this.brandStoryError = false;
    }
  }

    on1stOrdChange(event: any) {
    if(event.target.value < 1) {
      this.firstorderError='First minimum order must be greater than or equal 1.';
    } else if(event.target.value > 99999) {
      this.firstorderError='First minimum order must be less than 99999.';
    } else {
      this.firstorderError='';
    }
  }

  onReOrdChange(event: any) {
    if(event.target.value < 1) {
      this.reorderErrorMsg='Re-order minumum must be greater than or equal 1.';
    } else if(event.target.value > 99999) {
      this.reorderErrorMsg='Re-order minumum must be less than 99999.';
    } else {
      this.reorderErrorMsg='';
    }
  }

  onMothTypeChange() {
    this.release_inventoryArray = [];
  }

  onMonthSelect() {
    if(this.num_products_addcatalog == 'Yearly') {
      if(this.release_inventoryArray.length > 1) {
        this.monthSelectError = 'You can choose only one month.';
      } else {
        this.monthSelectError = '';
      }
    } else if(this.num_products_addcatalog == 'Other') {
      if(this.release_inventoryArray.length == 0) {
        this.monthSelectError = 'Please selct a month.';
      } else {
        this.monthSelectError = '';
      }
    }
  }

  vendorHeader: boolean = false;
  vendorStepProgress: boolean = false;
  vendorStepA: boolean = false;
  vendorStepB: boolean = false;
  vendorStepC: boolean = false;
  vendorStepD: boolean = false;
  vendorStepE: boolean = false;
  vendorStepF: boolean = false;
  vendorStepG: boolean = false;
  vendorStepH: boolean = false;
  vendorStepI: boolean = false;
  vendorStepJ: boolean = false;
  vendorStepK: boolean = false;
  vendorStepL: boolean = false;
  vendorStepM: boolean = false;
  vendorStepN: boolean = false;
  vendorStepO: boolean = false;
  vendorStepOneMain: boolean = true;
  vendorStep1: boolean = true;
  vendorStep2: boolean = false;
  vendorStep3: boolean = false;
  vendorStep4: boolean = false;
  vendorStepTwoMain: boolean = false;
  vendorStep5: boolean = false;
  vendorStep6: boolean = false;
  vendorStep7: boolean = false;
  vendorStep8: boolean = false;
  vendorStep9: boolean = false;
  vendorStep10: boolean = false;
  vendorStep11: boolean = false;
  vendorStep12: boolean = false;
  vendorStep13: boolean = false;
  vendorStep14: boolean = false;
  vendorStep15: boolean = false;
  vendorStep16: boolean = false;
  vendorStep17: boolean = false;
  vendorStep18: boolean = false;
  vendorStep19: boolean = false;
  vendorStep20: boolean = false;
  vendorStep21: boolean = false;
  vendorStep22: boolean = false;
  vendorStep23: boolean = false;
  vendorStep24: boolean = false;
  vendorStep25: boolean = false;
  vendorStep26: boolean = false;
  vendorStep27: boolean = false;
  vendorStep28: boolean = false;

  nextTwoFunction() {
    this.vendorHeader = false;
    this.vendorStepProgress = false;
    this.vendorStepA = false;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = false;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = false;
    this.vendorStepN = false;
    this.vendorStepO = false;
    this.vendorStepOneMain = true;
    this.vendorStep1 = false;
    this.vendorStep2 = true;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = false;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backOneFunction() {
    this.vendorHeader = false;
    this.vendorStepProgress = false;
    this.vendorStepA = false;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = false;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = false;
    this.vendorStepN = false;
    this.vendorStepO = false;
    this.vendorStepOneMain = true;
    this.vendorStep1 = true;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = false;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextThreeFunction() {
    this.vendorHeader = false;
    this.vendorStepProgress = false;
    this.vendorStepA = false;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = false;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = false;
    this.vendorStepN = false;
    this.vendorStepO = false;
    this.vendorStepOneMain = true;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = true;
    this.vendorStepTwoMain = false;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextFourFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = true;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextFiveFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = true;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }



  backFourFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = true;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextSixFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').addClass('active');
    $('.one_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = true;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backFiveFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').addClass('active');
    $('.one_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = true;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;

    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextSevenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').addClass('active');
    $('.one_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = true;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backSixFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').addClass('active');
    $('.one_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = true;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextEigtFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').addClass('active');
    $('.one_C').addClass('active');
    $('.one_D').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = true;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backSevenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').addClass('active');
    $('.one_B').addClass('active');
    $('.one_D').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = true;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextNineFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.one_B').addClass('active');
    $('.one_C').addClass('active');
    $('.one_D').addClass('active');
    $('.step_two').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = true;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backEightFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.one_B').addClass('active');
    $('.one_C').addClass('active');
    $('.one_D').addClass('active');
    $('.step_two').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = true;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.two_A').addClass('active');
    this.vendorStepJ = true;
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = true;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backNineFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = true;
    this.vendorStepC = true;
    this.vendorStepD = true;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.one_B').addClass('active');
    $('.one_C').addClass('active');
    $('.one_D').addClass('active');
    $('.step_two').addClass('active');
    $('.two_A').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = true;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextElevenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = true;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = true;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTen2Function() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = true;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwelveFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = true;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backElevenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;

    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = true;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTwelveFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = true;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTwelveAFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = true;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextThirteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = true;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextfourteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = true;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backThirteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = true;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backFourteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = true;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backFourteenAFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = true;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextFifteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = true;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextSixeenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = true;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backFifteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = true;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextSeveneenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = true;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backSixteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = true;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextEighteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = true;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backSeveenteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = true;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextNineteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = true;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backEightteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = true;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentyFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = true;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backNineteenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = true;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentyOneFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').addClass('active');
    $('.two_H').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = true;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTwentyFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').addClass('active');
    $('.two_H').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = true;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentyTwoFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').addClass('active');
    $('.two_H').addClass('active');
    $('.step_three').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = true;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTwentyOneFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').addClass('active');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').addClass('active');
    $('.two_H').addClass('active');
    $('.step_three').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = true;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentyThreeFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = true;
    this.vendorStepO = true;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').addClass('active');
    $('.three_A').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = true;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTwentyTwoFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = true;
    this.vendorStepG = true;
    this.vendorStepH = true;
    this.vendorStepI = true;
    this.vendorStepJ = true;
    this.vendorStepK = true;
    this.vendorStepL = true;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').addClass('active');
    $('.two_B').addClass('active');
    $('.two_C').addClass('active');
    $('.two_D').addClass('active');
    $('.two_E').addClass('active');
    $('.two_F').addClass('active');
    $('.two_G').addClass('active');
    $('.two_H').addClass('active');
    $('.step_three').addClass('active');
    $('.three_A').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = true;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentyFourFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = true;
    this.vendorStepO = true;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').addClass('active');
    $('.three_A').addClass('active');
    $('.three_B').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = true;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;

  }

  backTwentyThreeFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = true;
    this.vendorStepO = true;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').addClass('active');
    $('.three_A').addClass('active');
    $('.three_B').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = true;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentyFiveFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = true;
    this.vendorStepO = true;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').addClass('active');
    $('.three_A').addClass('active');
    $('.three_B').addClass('active');
    $('.three_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = true;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTwentyFourFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = true;
    this.vendorStepO = true;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').addClass('active');
    $('.three_A').addClass('active');
    $('.three_B').addClass('active');
    $('.three_C').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = true;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentySixFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = true;
    this.vendorStepO = true;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').addClass('active');
    $('.three_A').addClass('active');
    $('.three_B').addClass('active');
    $('.three_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = true;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  backTwentyFiveFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = true;
    this.vendorStepO = true;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').addClass('active');
    $('.three_A').addClass('active');
    $('.three_B').addClass('active');
    $('.three_C').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = true;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentySevenFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = false;
    this.vendorStepO = false;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').removeClass('active');
    $('.step_three').addClass('complete');
    $('.three_A').addClass('active');
    $('.three_B').removeClass('active');
    $('.three_C').removeClass('active');
    $('.step_four').addClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = true;
    this.vendorStep28 = false;
  }

  backTwentysixFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = false;
    this.vendorStepProgress = true;
    this.vendorStepA = true;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = true;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = true;
    this.vendorStepN = true;
    this.vendorStepO = true;
    $('.step_one').removeClass('active');
    $('.step_one').addClass('complete');
    $('.step_two').removeClass('active');
    $('.step_two').addClass('complete');
    $('.two_A').removeClass('active');
    $('.two_B').removeClass('active');
    $('.two_C').removeClass('active');
    $('.two_D').removeClass('active');
    $('.two_E').removeClass('active');
    $('.two_F').removeClass('active');
    $('.two_G').removeClass('active');
    $('.two_H').removeClass('active');
    $('.step_three').addClass('active');
    $('.three_A').addClass('active');
    $('.three_B').addClass('active');
    $('.three_C').addClass('active');
    $('.step_four').removeClass('active');
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = true;
    this.vendorStep27 = false;
    this.vendorStep28 = false;
  }

  nextTwentyEightFunction() {
    this.vendorHeader = true;
    this.vendorStepProgress = false;
    this.vendorStepA = false;
    this.vendorStepB = false;
    this.vendorStepC = false;
    this.vendorStepD = false;
    this.vendorStepE = false;
    this.vendorStepF = false;
    this.vendorStepG = false;
    this.vendorStepH = false;
    this.vendorStepI = false;
    this.vendorStepJ = false;
    this.vendorStepK = false;
    this.vendorStepL = false;
    this.vendorStepM = false;
    this.vendorStepN = false;
    this.vendorStepO = false;
    this.vendorStepOneMain = false;
    this.vendorStep1 = false;
    this.vendorStep2 = false;
    this.vendorStep3 = false;
    this.vendorStepTwoMain = true;
    this.vendorStep4 = false;
    this.vendorStep5 = false;
    this.vendorStep6 = false;
    this.vendorStep7 = false;
    this.vendorStep8 = false;
    this.vendorStep9 = false;
    this.vendorStep10 = false;
    this.vendorStep11 = false;
    this.vendorStep12 = false;
    this.vendorStep13 = false;
    this.vendorStep14 = false;
    this.vendorStep15 = false;
    this.vendorStep16 = false;
    this.vendorStep17 = false;
    this.vendorStep18 = false;
    this.vendorStep19 = false;
    this.vendorStep20 = false;
    this.vendorStep21 = false;
    this.vendorStep22 = false;
    this.vendorStep23 = false;
    this.vendorStep24 = false;
    this.vendorStep25 = false;
    this.vendorStep26 = false;
    this.vendorStep27 = false;
    this.vendorStep28 = true;
  }

  showRadionContent1: boolean = true;
  showRadionContent2: boolean = false;
  showRadionContent3: boolean = false;

  showRadioOneFunction() {
    this.showRadionContent1 = true;
    this.showRadionContent2 = false;
    this.showRadionContent3 = false;
  }
  showRadioTwoFunction() {
    this.showRadionContent1 = false;
    this.showRadionContent2 = true;
    this.showRadionContent3 = false;
  }
  showRadioThreeFunction() {
    this.showRadionContent1 = false;
    this.showRadionContent2 = false;
    this.showRadionContent3 = true;
  }
}
