import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { UserLeftSidebarComponent } from '../user-left-sidebar/user-left-sidebar.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild(UserLeftSidebarComponent) userLeftSidebarComponent!: UserLeftSidebarComponent;

  user_id!: any;
  email !: any;
  first_name !: any;
  last_name !: any;
  password !: any;
  country !: any;
  country_code!: any;
  phone_number!: any;
  language!: any;
  sign_up_for_email!: any;
  store_type!: any;
  store_name!: any;
  website_url!: any;
  years_in_business!: any;
  annual_sales!: any;
  inst_cat!: any;
  describe_stores: any = [];
  tag_shop_page_about!: any ;
  validError!: any ;
  validErrorDesStore!: any ;
  validErrorCat!: any ;
  validErrorTag!: any ;
  btnDis!: any;
  errorMsg!: any;
  retailer_id: any = null;
  old_password!: any;
  new_password!: any;
  confirm_password!: any;

  card_number!: any;
  month_year!: any;
  cvc!: any;

  ship_name!: any;
  ship_country!: any;
  ship_address1!: any;
  ship_address2!: any;
  ship_state!: any;
  ship_city!: any;
  ship_pincode!: any;
  ship_phone_code!: any;
  ship_phone_number!: any;
  
  countriesArray:any = [];
  stateArray:any = [];
  cityArray:any = [];
  tagsToolsArray:any = [];
  proCatArray:any = [];
  chekedStoreTypeArray: any = [];

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

  storeTypeArray:any = [
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Brick and mortar",
      textPath: "I sell from my own rentail storefront"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Pop-up shop",
      textPath: "I sell from my own rentail storefront"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Online only",
      textPath: "I sell from my own rentail storefront"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "Other",
      textPath: "I sell from my own rentail storefront"
    },
    {
      imgPath: "assets/images/online-store1.png",
      HeadText: "I'm just shopping for myself",
      textPath: "I sell from my own rentail storefront"
    }
  ]
  
  customerKnownArray:any = [
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
    }
  ]

  constructor(private storage: StorageMap, private apiService: ApiService,private toast: NgToastService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}

    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getCountries(user_session.id);
        // this.getProducts(this.user_id, this.sort_key, 1, 'all', this.searchText);
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });
  }

  getCountries(user_id: any) {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
      this.getRetailerDetails(user_id);
    })
  }
  
  getRetailerDetails(user_id: any) {
    this.appComponent.showSpinner = true;
    this.apiService.getRetailerDetails(user_id).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.first_name = response.data.first_name;
        this.last_name = response.data.last_name;
        this.country = response.data.country;
        this.country_code = response.data.country_code;
        this.phone_number = response.data.phone_number;
        this.language = response.data.language;
        this.sign_up_for_email = response.data.sign_up_for_email;
        this.store_type = response.data.store_type;
        this.store_name = response.data.store_name;
        this.website_url = response.data.website_url;
        this.appComponent.showSpinner = false;
      } else {
        this.btnDis = false;
        this.errorMsg = response.msg;
        this.appComponent.showSpinner = false;
      }

    },(error) => {
      this.btnDis = false;
      this.errorMsg = '';
      this.appComponent.showSpinner = false;
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

  forPhoneCode(event: any){
    let id = event.target.value;
    let country = this.countriesArray.filter((item: any) => item.id == id);
    this.country_code = country[0].phone_code;
  }

  onCheckBoxChanged(value: any) {
    this.sign_up_for_email = value;
  }

  sendUserFormStep1(userFormStep1: any) {
    this.btnDis = true;
    this.apiService.updateRetailerDetails(userFormStep1.value).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
      this.getCountries(this.user_id);
      this.userLeftSidebarComponent.getRetailerDetails(this.user_id);
      this.btnDis = false;
      this.errorMsg = '';
      this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
    } else {
      this.btnDis = false;
      this.errorMsg = response.msg;
    }
    },(error) => {
      this.btnDis = false;
      this.errorMsg = '';
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

  sendPaymentForm(userFormStep1: any) {
    console.log(userFormStep1.value);
  }

  saveCheckOutForm(userFormStep1: any) {
    console.log(userFormStep1.value);
  }

  onChangeCountry(event: any){
    let countryId = event.target.value;
    this.ship_state = null;
    this.ship_city = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
    })
  }

  onChangeState(event: any) { 
    let stateId = event.target.value;
    this.ship_city = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.cityArray = response.data;
    })
  }


}
