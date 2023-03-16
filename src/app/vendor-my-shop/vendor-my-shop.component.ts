import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StorageMap } from "@ngx-pwa/local-storage";
import { NgToastService } from "ng-angular-popup";
import { AppComponent } from "../app.component";
import { ApiService } from "../services/api.service";
declare var $: any;

@Component({
  selector: "app-vendor-my-shop",
  templateUrl: "./vendor-my-shop.component.html",
  styleUrls: ["./vendor-my-shop.component.css"],
})
export class VendorMyShopComponent implements OnInit {
  user_id!: any;
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
  tag_shop_page_about!: any;
  tagsToolsArray: any = [];
  profile_photo!: any;
  cover_image!: any;
  featured_image!: any;
  logo_image!: any;
  video_url!: any;
  state!: any;
  city!: any;
  publications!: any;
  previewed_shop_page !: any;
  added_product !: any;
  stateArray !: any;
  cityArray !: any;
  btnDis !: any;
  go_live!: any;
  goLiveModal!: any;
  bazaar_direct_link!: any;
  currentYear!:any;
  isGoliveTrue: any= false;
  goliveBtsDis: any= false;
  brandStoryError: any= false;
  yearError: any= false;

  constructor(
    private storage: StorageMap, private apiService: ApiService, public modalService: NgbModal, private toast: NgToastService, private appComponent: AppComponent, private router: Router ) {}

  ngOnInit(): void {
    const d = new Date();
    let year = d.getFullYear();
    this.currentYear = year;

    this.storage.get("user_session").subscribe({
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

  customerKnownArray: any = [
    {
      HeadText: "Eco-friendly",
    },
    {
      HeadText: "Not on Amazon",
    },
    {
      HeadText: "Made in Europe",
    },
    {
      HeadText: "Social good",
    },
    {
      HeadText: "Shop local",
    },
    {
      HeadText: "Local brand",
    },
  ];
  countriesArray: any = [
  ];
  headquateredArray: any = [
    { name: "United States of America" },
  ];
  tagsArray: any = [
    { name: "Eco-friendly", value: "eco-friendly" },
    { name: "Not on Amazon", value: "not-on-amazon" },
    { name: "Made in Europe", value: "made-in-europe" },
    { name: "Social good", value: "social-good" },
    { name: "Shop local", value: "shop-local" },
    { name: "Local brand", value: "local-brand" },
  ];
  publicationsArray: any = [
    { name: "Allure", value: "allure" },
    { name: "Architectural Digest", value: "architectural-digest" },
    { name: "Babylist", value: "babylist" },
    { name: "Better Homes", value: "better-homes" },
    { name: "Bon Appetit", value: "bon-appetit" },
    { name: "Brides", value: "brides" },
    { name: "Brit And Co", value: "brit-and-co" },
    { name: "Business Insider", value: "business-insider" },
    { name: "Bust", value: "bust" },
    { name: "Buzz Feed", value: "buzz-feed" },
    { name: "Cnbc", value: "cnbc" },
    { name: "Cosmo", value: "cosmo" },
    { name: "Country Living", value: "country-living" },
    { name: "Daily Mail", value: "daily-mail" },
    { name: "Darling", value: "darling" },
    { name: "Domino", value: "domino" },
    { name: "Domus", value: "domus" },
    { name: "Elle", value: "elle" },
    { name: "Essence", value: "essence" },
    { name: "Food And Wine", value: "food-and-wine" },
    { name: "Food Network", value: "food-network" },
    { name: "Forbes", value: "forbes" },
    { name: "Garden And Gun", value: "garden-and-gun" },
    { name: "Gear Patrol", value: "gear-patrol" },
    { name: "Gift Shop Magazine", value: "gift-shop-magazine" },
    { name: "Glamour", value: "glamour" },
    { name: "Goop", value: "goop" },
    { name: "Gq", value: "gq" },
    { name: "Hand Eye Magazine", value: "hand-eye-magazine" },
    { name: "Health", value: "Health" },
  ];

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }

  onChangeCountry(event: any) {
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

  getVendorDetails(user_id: any) {
    this.appComponent.showSpinner = true;
    this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.apiService.getStates(response.data.headquatered).subscribe((responseBody) => {
        let response= JSON.parse(JSON.stringify(responseBody));
        this.stateArray = response.data;
      })
      this.apiService.getCities(response.data.state).subscribe((responseBody) => {
        let response= JSON.parse(JSON.stringify(responseBody));
        this.cityArray = response.data;
      })
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
      this.tag_shop_page_about = response.data.tag_shop_page_about;
      this.profile_photo = response.data.profile_photo;
      this.cover_image = response.data.cover_image;
      this.featured_image = response.data.featured_image;
      this.logo_image = response.data.logo_image;
      this.video_url = response.data.video_url;
      this.state = response.data.state;
      this.city = response.data.city;
      this.publications = response.data.publications;
      this.previewed_shop_page = response.data.previewed_shop_page;
      this.added_product = response.data.added_product;
      this.go_live = response.data.go_live;
      this.bazaar_direct_link = response.data.bazaar_direct_link;

      this.tagsToolsArray = response.data.tag_shop_page;
      this.appComponent.showSpinner = false;
    });
  }

  tagsCheckboxChange(e: any) {
    if (e.target.checked) {
      this.tagsToolsArray.push(e.target.value);
    } else {
      this.tagsToolsArray = this.tagsToolsArray.filter(
        (item: any) => item !== e.target.value
      );
    }
  }
 
  openUploadProfileModal(content: any) {
    this.modalService.open(content, { windowClass: "UploadProfileModal" });
    $(function () {
      $(".image-editor2").cropit({
        exportZoom: 1,
        width: 500,
        height: 500,
        imageBackground: true,
        imageBackgroundBorderWidth: 30,
        onImageError: function () {
          $(".error-msg").text(
            "Please use an image that's at least " +
              500 +
              "px in width and " +
              500 +
              "px in height."
          ),
            $(".cropit-image-preview").addClass("has-error"),
            window.setTimeout(
              (function () {
                return function () {
                  return $(".cropit-image-preview").removeClass("has-error");
                };
              })(),
              3e3
            );
        },
      });
    });

    $(".export").click(function () {
      var imageData = $(".image-editor2").cropit("export", {
        type: "image/jpeg",
        quality: 0.75,
        originalSize: true,
      });

      $("#profile_img_show").attr("src", imageData);
      $("#profile_img").val(imageData);
    });
  }

  openUploadCoverModal(content: any) {
    this.modalService.open(content, { windowClass: "UploadCoverModal" });
    $(function () {
      $(".image-editor3").cropit({
        exportZoom: 1,
        width: 1111,
        height: 252,
        imageBackground: true,
        imageBackgroundBorderWidth: 30,
        onImageError: function () {
          $(".error-msg").text(
            "Please use an image that's at least " +
              1111 +
              "px in width and " +
              252 +
              "px in height."
          ),
            $(".cropit-image-preview").addClass("has-error"),
            window.setTimeout(
              (function () {
                return function () {
                  return $(".cropit-image-preview").removeClass("has-error");
                };
              })(),
              3e3
            );
        },
      });
    });

    $(".export").click(function () {
      var imageData = $(".image-editor3").cropit("export", {
        type: "image/jpeg",
        quality: 0.75,
        originalSize: true,
      });

      //Set value of hidden input to base64
      $("#cover_img_show").css("background-image", "url(" + imageData + ")");
      $("#cover_img").val(imageData);
    });
  }

  openUploadFeatureModal(content: any) {
    this.modalService.open(content, { windowClass: "featureImgModal" });
    $(function () {
      $(".image-editor").cropit({
        exportZoom: 1,
        width: 500,
        height: 500,
        imageBackground: true,
        imageBackgroundBorderWidth: 30,
        onImageError: function () {
          $(".error-msg").text(
            "Please use an image that's at least " +
              500 +
              "px in width and " +
              500 +
              "px in height."
          ),
            $(".cropit-image-preview").addClass("has-error"),
            window.setTimeout(
              (function () {
                return function () {
                  return $(".cropit-image-preview").removeClass("has-error");
                };
              })(),
              3e3
            );
        },
      });
    });

    $(".export").click(function () {
      var imageData = $(".image-editor").cropit("export", {
        type: "image/jpeg",
        quality: 0.75,
        originalSize: true,
      });

      //Set value of hidden input to base64

      $("#hidden_base64").attr("src", imageData);
      $("#purbayan").val(imageData);
    });
  }

  openUploadLogoModal(content: any) {
    this.modalService.open(content, { windowClass: "LogoModal" });
    $(function () {
      $(".image-editor4").cropit({
        exportZoom: 1,
        width: 200,
        height: 200,
        imageBackground: true,
        imageBackgroundBorderWidth: 30,
        onImageError: function () {
          $(".error-msg").text(
            "Please use an image that's at least " +
              200 +
              "px in width and " +
              200 +
              "px in height."
          ),
            $(".cropit-image-preview").addClass("has-error"),
            window.setTimeout(
              (function () {
                return function () {
                  return $(".cropit-image-preview").removeClass("has-error");
                };
              })(),
              3e3
            );
        },
      });
    });

    $(".export").click(function () {
      var imageData = $(".image-editor4").cropit("export", {
        type: "image/jpeg",
        quality: 0.75,
        originalSize: true,
      });

      //Set value of hidden input to base64

      $("#logo_img_show").attr("src", imageData);
      $("#logo_img").val(imageData);
    });
  }

  updateMyShop(coverImgVal: any, profileImgVal:any, featureImgVal:any, logoImgVal:any) {
    this.btnDis = true;
    let arrayTransform = this.tagsToolsArray.join(',');
    let values = {
      user_id: this.user_id,
      cover_image: coverImgVal,
      profile_photo: profileImgVal,
      featured_image: featureImgVal,
      logo_image: logoImgVal,
      shared_brd_story: this.shared_brd_story,
      video_url: this.video_url,
      established_year: this.established_year,
      product_made: this.product_made,
      headquatered: this.headquatered,
      state: this.state,
      city: this.city,
      insta_handle: this.insta_handle,
      tag_shop_page: arrayTransform,
      tag_shop_page_about: this.tag_shop_page_about,
      publications: this.publications,
      previewed_shop_page: '1'
    }

    this.apiService.updateVendorDetails(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.btnDis = false;
        this.toast.success({detail:"'Changes Saved.'",summary: '' ,duration: 4000});
        this.previewed_shop_page = '1';
      } else {
        this.btnDis = false;
        this.toast.error({detail:"Something went wrong. Please try again!",summary: '' ,duration: 4000});
      }
    },(error) => {
      this.btnDis = false;
       this.toast.error({detail:"Something went wrong. Please try again!",summary: '' ,duration: 4000});
    })
    
  }

  goLiveClick() {
    this.goliveBtsDis = true;
    let values = {
      user_id: this.user_id
    }
    this.apiService.vendorGoLive(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.isGoliveTrue = true;
        this.goliveBtsDis = false;
        this.go_live = '1';
        this.goLiveModal.close();
        this.toast.success({detail: response.msg, summary: '', duration: 4000});
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.goliveBtsDis = false;
      }
    },(error) => {
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
      this.goliveBtsDis = false;
    }); 
  }

  openGoLiveModal(content: any) {  
    this.goLiveModal = this.modalService.open(content, { windowClass: 'deleteModal' });
  }

  getProfileImg(event: any) {
    let fileName = event.target.files[0].name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      this.profile_photo = event.target.files[0];

      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => { // called once readAsDataURL is completed
        }
      }
    } else {
      this.toast.error({detail:"Only jpg/jpeg and png files are allowed!",summary: "" ,duration: 4000});
    }
  } 

  getCoverImg(event: any) {
    let fileName = event.target.files[0].name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      this.cover_image = event.target.files[0];

      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => { // called once readAsDataURL is completed
        }
      }
    } else {
      this.toast.error({detail:"Only jpg/jpeg and png files are allowed!",summary: "" ,duration: 4000});
    }
   
  }

  getFeaturedImg(event: any) {
    let fileName = event.target.files[0].name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      this.featured_image = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => { // called once readAsDataURL is completed
        }
      }
    }else{
      this.toast.error({detail:"Only jpg/jpeg and png files are allowed!",summary: "" ,duration: 4000});
    } 

  }

  getLogoImg(event: any) {
    let fileName = event.target.files[0].name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      // this.featured_image = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => { // called once readAsDataURL is completed
        }
      }
    }else{
      this.toast.error({detail:"Only jpg/jpeg and png files are allowed!",summary: "" ,duration: 4000});
    } 

  }

  onBrandStoryChange(event: any) {
    if(!/^[ A-Za-z0-9_./&+-,']*$/.test(event.target.value)) {
      this.brandStoryError = true;
    } else {
      this.brandStoryError = false;
    }
  }

  validateYear(event:any) {
    if(Number(event.target.value) > Number(this.currentYear) || Number(event.target.value) <= 1899 ) {
      this.yearError = true;
    } else this.yearError = false;
  }

}
