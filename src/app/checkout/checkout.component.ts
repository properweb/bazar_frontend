import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('shipEditModalCloseBtn') editClose!: ElementRef<HTMLElement>;
  @ViewChild('billEditModalCloseBtn') billClose!: ElementRef<HTMLElement>;

  user_id!: any;
  user_key!: any;
  ret_name!: any;
  retailerDetails!: any;
  brand_key!: any;
  name!: any;
  country!: any;
  address2!: any;
  address1!: any;
  town!: any;
  state!: any;
  post_code!: any;
  phone!: any;
  phone_code: any = '962';

  stateData!: any;
  orderDetails!: any;
  cartDetails!: any;

  countriesArray!: any;
  stateArray!: any;
  cityArray!: any;
  billcountriesArray!: any;
  billstateArray!: any;
  billcityArray!: any;
  shipcountriesArray!: any;
  shipstateArray!: any;
  shipcityArray!: any;
  shipAddressList!:any;
  firstShipId!:any;
  shipAddressDeatils!:any;
  shipAddId!: any;
  update_ship_name!: any;
  update_ship_country!: any;
  update_ship_address1!: any;
  update_ship_address2!: any;
  update_ship_state!: any;
  update_ship_city!: any;
  update_ship_pincode!: any;
  update_ship_phone_code: any = "962";
  update_ship_phone_number!: any;
  billing_name!: any;
  billing_country!: any;
  billing_address1!: any;
  billing_address2!: any;
  billing_state!: any;
  billing_city!: any;
  billing_pincode!: any;
  billing_phone_code: any = "962";
  billing_phone_number!: any;
  errorMsg!:any;
  step1:boolean= true;
  step2:boolean= false;
  step3:boolean= false;
  btnDis:boolean= false;
  sameAsBilling:boolean= false;
  
  constructor(private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService,private titleService: Title, private appComponent: AppComponent) { 
    const price = router.getCurrentNavigation()?.extras.state?.['price'];
    if(price != undefined) {
      this.storage
      .set('cart_to_check_data', price)
      .subscribe(() => {});
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('Checkout');
     this.storage.get('cart_to_check_data').subscribe({
      next: (data) => {
        this.stateData = data;
      },
      error: (error) => {
      },          
    });
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.user_key = user_session.user_key;
        this.getShipAddress();
        this.getRetailerDetails(user_session.user_key);
      },
      error: (error) => {
      },          
    });
    this.activatedRoute.params.subscribe((routeParams) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.brand_key = routeParams['brand_id'];
    })
    this.getCountries();
  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }

  getRetailerDetails(user_key: any) {
    this.appComponent.showSpinner = true;
    this.apiService.getRetailerDetails(user_key).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.ret_name = response.data.first_name + " " + response.data.last_name;
        this.retailerDetails = response.data;
        this.billing_country = response.data.country;
        this.billing_address1 = response.data.address1;
        this.billing_state = response.data.state;
        this.billing_city = response.data.town;
        this.billing_pincode = response.data.post_code;
        this.billing_phone_number = response.data.phone_number;
        this.apiService.getStates(response.data.country).subscribe((responseBody) => {
          let response= JSON.parse(JSON.stringify(responseBody));
          this.billstateArray = response.data;
        })
        this.apiService.getCities(response.data.state).subscribe((responseBody) => {
          let response= JSON.parse(JSON.stringify(responseBody));
          this.billcityArray = response.data;
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

  onChangeCountry(event: any){
    let countryId = event.target.value;
    let country = this.countriesArray.filter((item: any) => item.id == countryId);
    this.phone_code = country[0].phone_code;
    this.state = null;
    this.town = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
    })
  }

  onShipChangeCountry(event: any){
    let countryId = event.target.value;
    let country = this.countriesArray.filter((item: any) => item.id == countryId);
    this.update_ship_phone_code = country[0].phone_code;
    this.update_ship_state = null;
    this.update_ship_city = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.shipstateArray = response.data;
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
    this.town = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.cityArray = response.data;
    })
  }

  onShipChangeState(event: any) { 
    let stateId = event.target.value;
    this.update_ship_city = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.shipcityArray = response.data;
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
 
  getShipAddress() {
    this.apiService.getShippingAddress().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.shipAddressList = response.data;
        if(response.data.length > 0) {
          this.firstShipId = response.data[0].id;
        }
      } else{
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
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
        // this.update_ship_city = response.data.town;
        this.update_ship_phone_code = response.data.phoneCode;
        this.update_ship_pincode = response.data.zip;
        this.update_ship_phone_number = response.data.phone;

        this.apiService.getStates(response.data.country).subscribe((responseBody1) => {
          let response1= JSON.parse(JSON.stringify(responseBody1));
          this.shipstateArray = response1.data;
          this.update_ship_state = response.data.state;
        })
        this.apiService.getCities(response.data.state).subscribe((responseBody2) => {
          let response2= JSON.parse(JSON.stringify(responseBody2));
          this.shipcityArray = response2.data;
          this.update_ship_city = response.data.town;
        })
        this.appComponent.modalshowSpinner = false;
      } else{
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
        this.appComponent.modalshowSpinner = false;
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
      this.appComponent.modalshowSpinner = false;
    })
  }

  savepdateShipAddForm(updateShipAddForm: any) {
    this.btnDis = true;
    let values = {
      id: this.shipAddId,
      // user_id: this.user_id,
      name: updateShipAddForm.value.update_ship_name,
      country: updateShipAddForm.value.update_ship_country,
      street: updateShipAddForm.value.update_ship_address1,
      suite: updateShipAddForm.value.update_ship_address2,
      state: updateShipAddForm.value.update_ship_state,
      town: updateShipAddForm.value.update_ship_city,
      zip: updateShipAddForm.value.update_ship_pincode,
      phoneCode: updateShipAddForm.value.update_ship_phone_code,
      phone: updateShipAddForm.value.update_ship_phone_number,
      type: 'shipping'
    } 
    this.apiService.updateShippingAddress(values).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        let el: HTMLElement = this.editClose.nativeElement;
        el.click();
        this.getShipAddress();
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

  sendcheckOutForm(checkOutForm: any) {
    if(this.billing_country == null || this.billing_country == undefined || this.billing_address1 == null || this.billing_address1 == undefined || this.billing_state == null || this.billing_state == undefined || this.billing_city == null || this.billing_city == undefined || this.billing_pincode == null || this.billing_pincode == undefined || this.billing_phone_number == null || this.billing_phone_number == undefined) {
      this.toast.error({detail: "Please complete your billing address section.", summary: "", duration: 4000});
      return false;
    } else {
      this.btnDis = true;
      let values = {
        // user_id: this.user_id,
        name: checkOutForm.value.name,
        country: checkOutForm.value.country,
        street: checkOutForm.value.address1,
        suite: checkOutForm.value.address2,
        state: checkOutForm.value.state,
        town: checkOutForm.value.town,
        zip: checkOutForm.value.post_code,
        phoneCode: checkOutForm.value.phone_code,
        phone: checkOutForm.value.phone,
      } 
      
      this.apiService.createShippingAddress(values).subscribe((responseBody) => {
        let response= JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.btnDis = false;
          this.firstShipId = response.data.id;

          let values1 = {
            // user_id: this.user_id,
            brand_key : this.brand_key,
            shipping_id: this.firstShipId
          } 
          this.apiService.placeOrder(values1).subscribe((responseBody1) => {
            let response1 =  JSON.parse(JSON.stringify(responseBody1));
            if(response1.res == true) {
              this.btnDis = false;
              this.cartDetails = response1.data.cart_det[0];
              this.orderDetails = response1.data.order_det;
              this.toast.success({detail: response.msg, summary: "" ,duration: 4000});
              this.nextOneFunction();
            } else {
              this.btnDis = false;
              this.toast.error({detail: response1.msg,summary: "" ,duration: 4000});
            }
          },(error) => {
            this.btnDis = false;
            this.toast.error({detail:"Something went wrong. Please try again!",summary: "" ,duration: 4000});
          })
          // this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
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
      return true;
    }
  }

  placeOrder() {
    if(this.billing_country == null || this.billing_country == undefined || this.billing_address1 == null || this.billing_address1 == undefined || this.billing_state == null || this.billing_state == undefined || this.billing_city == null || this.billing_city == undefined || this.billing_pincode == null || this.billing_pincode == undefined || this.billing_phone_number == null || this.billing_phone_number == undefined) {
      this.toast.error({detail: "Please complete your billing address section.", summary: "", duration: 4000});
      return false;
    } else {
      this.btnDis = true;
      let values = {
        // user_id: this.user_id,
        brand_key : this.brand_key,
        shipping_id: this.firstShipId
      } 
      this.apiService.placeOrder(values).subscribe((responseBody) => {
        let response =  JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.btnDis = false;
          this.cartDetails = response.data.cart_det[0];
          this.orderDetails = response.data.order_det;
          this.toast.success({detail: response.msg, summary: "" ,duration: 4000});
          this.nextOneFunction();
        } else {
          this.btnDis = false;
          this.toast.error({detail: response.msg, summary: "" ,duration: 4000});
        }
      },(error) => {
        this.btnDis = false;
        this.toast.error({detail:"Something went wrong. Please try again!", summary: "" ,duration: 4000});
      })
      return true;
    }
  }

  nextOneFunction() {
    $(".step_one").addClass("complete");
    $(".step_one").removeClass("active");
    $(".step_two").addClass("active");
    this.step1= false;
    this.step2= true;
    this.step3= false;
  }

  nextFourFunction() { 
    $(".step_two").addClass("complete");
    $(".step_two").removeClass("active");
    $(".step_three").addClass("active");
    this.step1= false;
    this.step2= false;
    this.step3= true;
  }

  onChangeShipAdd(event: any) {
    this.firstShipId = event.target.value;
  }

  savepdateBillingAddForm(updateBillingAddForm: any) {
    this.btnDis = true;
    let values = {
      // user_id: this.user_id,
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
        this.getRetailerDetails(this.user_key);
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
