import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
declare var $: any;

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  countries:any = [];
  user_id!:any;
  brand_name!: any;
  website_url!: any;
  insta_handle!: any;
  established_year!: any;
  stored_carried!: any;
  first_order_min!: any;
  re_order_min!: any;
  avg_lead_time!: any;
  shared_brd_story!: any;
  product_made!: any;
  headquatered!: any;
  tag_shop_page: any = [];
  upload_contact_list!: any;
  tagsToolsArray:any = [];
  profile_photo!:any;

  ]
  countriesArray:any = [
    { code: 'JO', code3: 'JOR', name: 'Jordan', number: '400' },  
    { code: 'IN', code3: 'IND', name: 'India', number: '356' },
    { code: 'GB', code3: 'GBR', name: 'United Kingdom', number: '826' },
    { code: 'US', code3: 'USA', name: 'United States of America', number: '840' },
  ]

  tagsArray:any =[
    { name: 'Eco-friendly', value: 'eco-friendly' },
    { name: 'Not on Amazon', value: 'not-on-amazon' },
    { name: 'Made in Europe', value: 'made-in-europe' },
    { name: 'Social good', value: 'social-good' },
    { name: 'Shop local', value: 'shop-local' },
    { name: 'Local brand', value: 'local-brand' },
  ];

  constructor( private storage: StorageMap , private apiService : ApiService, public modalService: NgbModal , private router : Router, private toast: NgToastService) { }

  ngOnInit(): void {

    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getVendorDetails(this.user_id);
       
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });

    this.getCountries();
  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.countries = response.data;

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
      this.verified = response.data.verified;

    })
    
  }

  sendAccountUpdate(vendorAccountUpdate:any , imgVal :any) {

    let arrayTransform = this.tagsToolsArray.join(',');
    let values = {
      user_id: this.user_id,
      brand_name:this.brand_name,
      website_url: this.website_url,
      insta_handle: this.insta_handle ,
      established_year: this.established_year,
      stored_carried: this.stored_carried ,
      first_order_min: this.first_order_min ,
      re_order_min: this.re_order_min ,
      avg_lead_time: this.avg_lead_time ,
      shared_brd_story: this.shared_brd_story,
      product_made: this.product_made  ,
      headquatered: this.headquatered  ,
      tag_shop_page: arrayTransform,
      upload_contact_list: this.upload_contact_list,
      profile_photo: imgVal
    }
    this.apiService.updateVendorDetails(values).subscribe((responseBody) => {
    if (e.target.checked) {
      this.tagsToolsArray.push(e.target.value);
    } else {
      this.tagsToolsArray = this.tagsToolsArray.filter((item:any) => item !== e.target.value);
    }

  }

  openUploadProfileModal(content: any) {
    this.modalService.open(content, { windowClass: 'UploadProfileModal' });
    $(function () {
      $('.image-editor2').cropit({
        exportZoom: 1.25,
        imageBackground: true,
        imageBackgroundBorderWidth: 30,
        imageState: {
          src: 'http://lorempixel.com/500/400/',
        },
      });
    });

    $('.export').click(function() {
      var imageData = $('.image-editor2').cropit('export', {
          type: 'image/jpeg',
          quality: 0.33,
          originalSize: true,
      });
  
      //Set value of hidden input to base64
      $("#profile_img_show").attr('src',imageData);
      $("#profile_img").val(imageData);
     
  });
  }

  onResendEmailClick() {
    this.resendBtsDis = true;
    this.apiService.resendVerifyEmail(this.user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.toast.success({detail:"Email sended successfully.",summary: "" ,duration: 4000});
        this.resendBtsDis = false;
      }
    },(error) => {
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
      this.resendBtsDis = false;
    })
  }



}
