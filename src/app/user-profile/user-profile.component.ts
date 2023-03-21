import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('shipModalCloseBtn') myDiv!: ElementRef<HTMLElement>;
  @ViewChild('shipEditModalCloseBtn') editClose!: ElementRef<HTMLElement>;
  @ViewChild('billEditModalCloseBtn') billClose!: ElementRef<HTMLElement>;
  user_id!: any;
  email !: any;
  retailerDetails !: any;
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
  ship_phone_code: any = "962";
  ship_phone_number!: any;
  update_ship_name!: any;
  update_ship_country!: any;
  update_ship_address1!: any;
  update_ship_address2!: any;
  update_ship_state!: any;
  update_ship_city!: any;
  update_ship_pincode!: any;
  update_ship_phone_code: any = "962";
  update_ship_phone_number!: any;
  shipAddId!: any;
  billing_name!: any;
  billing_country!: any;
  billing_address1!: any;
  billing_address2!: any;
  billing_state!: any;
  billing_city!: any;
  billing_pincode!: any;
  billing_phone_code: any = "962";
  billing_phone_number!: any;
  
  shipAddressList!:any;
  shipAddressDeatils!:any;
  countriesArray:any = [];
  stateArray:any = [];
  cityArray:any = [];
  billcountriesArray:any = [];
  billstateArray:any = [];
  billcityArray:any = [];
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
        this.getShipAddress(user_session.id);
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

  getShipAddress(user_id: any) {
    this.apiService.getShippingAddress(user_id).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.shipAddressList = response.data;
      } else{
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }
  
  getRetailerDetails(user_id: any) {
    this.appComponent.showSpinner = true;
    this.apiService.getRetailerDetails(user_id).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.retailerDetails = response.data;
        this.first_name = response.data.first_name;
        this.email = response.data.email;
        this.last_name = response.data.last_name;
        this.country = response.data.country;
        this.country_code = response.data.country_code;
        this.phone_number = response.data.phone_number;
        this.language = response.data.language;
        this.sign_up_for_email = response.data.sign_up_for_email;
        this.store_type = response.data.store_type;
        this.store_name = response.data.store_name;
        this.website_url = response.data.website_url;

        // For billing
        this.billing_country = response.data.country;
        this.billing_address1 = response.data.address1;
        this.billing_state = response.data.state;
        this.billing_city = response.data.town;
        this.billing_pincode = response.data.post_code;
        this.billing_phone_number = response.data.phone_number;
        this.apiService.getStates(response.data.country).subscribe((responseBody1) => {
          let response1= JSON.parse(JSON.stringify(responseBody1));
          this.billstateArray = response1.data;
        })
        this.apiService.getCities(response.data.state).subscribe((responseBody2) => {
          let response2= JSON.parse(JSON.stringify(responseBody2));
          this.billcityArray = response2.data;
        })

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

  saveShipAddForm(userFormStep1: any) {
    this.btnDis = true;
    let values = {
      user_id: this.user_id,
      name: userFormStep1.value.ship_name,
      country: userFormStep1.value.ship_country,
      street: userFormStep1.value.ship_address1,
      suite: userFormStep1.value.ship_address2,
      state: userFormStep1.value.ship_state,
      town: userFormStep1.value.ship_city,
      zip: userFormStep1.value.ship_pincode,
      phoneCode: userFormStep1.value.ship_phone_code,
      phone: userFormStep1.value.ship_phone_number,
    } 
    this.apiService.createShippingAddress(values).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        let el: HTMLElement = this.myDiv.nativeElement;
        el.click();
        this.getShipAddress(this.user_id);
        this.btnDis = false;
        // this.getCountries(this.user_id);
        // this.userLeftSidebarComponent.getRetailerDetails(this.user_id);
        // this.btnDis = false;
        // this.errorMsg = '';
      this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      } else {
        this.btnDis = false;
        this.errorMsg = response.msg;
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
      },(error) => {
        this.btnDis = false;
        this.errorMsg = '';
        this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
      })
  }

  onChangeCountry(event: any){
    let id = event.target.value;
    let country = this.countriesArray.filter((item: any) => item.id == id);
    this.ship_phone_code = country[0].phone_code;
    let countryId = event.target.value;
    this.ship_state = null;
    this.ship_city = null;
    this.update_ship_state = null;
    this.update_ship_city = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
    })
  }
  
  onBillChangeCountry(event: any){
    let countryId = event.target.value;
    this.billing_state = null;
    this.billing_city = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.billstateArray = response.data;
    })
  }

  onChangeState(event: any) { 
    let stateId = event.target.value;
    this.ship_city = null;
    this.update_ship_city = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.cityArray = response.data;
    })
  }

  onBillChangeState(event: any) { 
    let stateId = event.target.value;
    this.billing_city = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.billcityArray = response.data;
    })
  }

  getShipDetails(id: any) { 
    this.update_ship_state = null;
    this.update_ship_city = null;
    this.appComponent.modalshowSpinner = true;
    this.shipAddId = id;
    this.apiService.getShippingAddressDeatils(id).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.shipAddressDeatils = response.data;
        this.update_ship_name = response.data.name;
        this.update_ship_country = response.data.country;
        this.update_ship_address1 = response.data.street;
        this.update_ship_address2 = response.data.suite;
        // this.update_ship_state = response.data.state;
        // this.update_ship_city = response.data.town;
        this.update_ship_phone_code = response.data.phoneCode;
        this.update_ship_pincode = response.data.zip;
        this.update_ship_phone_number = response.data.phone;

        this.apiService.getStates(response.data.country).subscribe((responseBody1) => {
          let response1= JSON.parse(JSON.stringify(responseBody1));
          this.stateArray = response1.data;
          this.update_ship_state = response.data.state;
        })
        this.apiService.getCities(response.data.state).subscribe((responseBody2) => {
          let response2= JSON.parse(JSON.stringify(responseBody2));
          this.cityArray = response2.data;
          this.update_ship_city = response.data.town;
        })
        this.appComponent.modalshowSpinner = false;
      } else{
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
      this.appComponent.modalshowSpinner = false;
    })
  }

  savepdateShipAddForm(updateShipAddForm: any) {
    // console.log(updateShipAddForm.value);
    this.btnDis = true;
    let values = {
      id: this.shipAddId,
      user_id: this.user_id,
      name: updateShipAddForm.value.update_ship_name,
      country: updateShipAddForm.value.update_ship_country,
      street: updateShipAddForm.value.update_ship_address1,
      suite: updateShipAddForm.value.update_ship_address2,
      state: updateShipAddForm.value.update_ship_state,
      town: updateShipAddForm.value.update_ship_city,
      zip: updateShipAddForm.value.update_ship_pincode,
      phoneCode: updateShipAddForm.value.update_ship_phone_code,
      phone: updateShipAddForm.value.update_ship_phone_number,
    } 
    this.apiService.updateShippingAddress(values).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        let el: HTMLElement = this.editClose.nativeElement;
        el.click();
        this.getShipAddress(this.user_id);
        this.btnDis = false;
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      } else {
        this.btnDis = false;
        this.errorMsg = response.msg;
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
      },(error) => {
        this.btnDis = false;
        this.errorMsg = '';
        this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
      })
  }

  deleteShipAddress(id:any) {
    let values = {
      id: id,
      user_id: this.user_id,
    } 
    this.apiService.deleteShippingAddress(values).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.getShipAddress(this.user_id);
        this.btnDis = false;
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      } else {
        this.btnDis = false;
        this.errorMsg = response.msg;
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
      },(error) => {
        this.btnDis = false;
        this.errorMsg = '';
        this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
      })
  }

  savepdateBillingAddForm(updateBillingAddForm: any) {
    this.btnDis = true;
    let values = {
      user_id: this.user_id,
      country: updateBillingAddForm.value.billing_country,
      address1: updateBillingAddForm.value.billing_address1,
      state: updateBillingAddForm.value.billing_state,
      town: updateBillingAddForm.value.billing_city,
      zip: updateBillingAddForm.value.billing_pincode,
      phone: updateBillingAddForm.value.billing_phone_number,
    } 
    this.apiService.updateBillingAddress(values).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.getRetailerDetails(this.user_id);
        let el: HTMLElement = this.billClose.nativeElement;
        el.click();
        this.btnDis = false;
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      } else {
        this.btnDis = false;
        this.errorMsg = response.msg;
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
      },(error) => {
        this.btnDis = false;
        this.errorMsg = '';
        this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
      })
  }


}
