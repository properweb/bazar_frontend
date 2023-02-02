import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user_id!: any;
  brand_key!: any;
  name!: any;
  country!: any;
  address2!: any;
  address1!: any;
  town!: any;
  state!: any;
  post_code!: any;
  phone!: any;

  stateData!: any;
  orderDetails!: any;
  cartDetails!: any;

  countriesArray!: any;
  stateArray!: any;
  cityArray!: any;

  step1:boolean= true;
  step2:boolean= false;
  step3:boolean= false;
  btnDis:boolean= false;
  
  constructor(private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService,private titleService: Title) { 
    const price = router.getCurrentNavigation()?.extras.state?.['price'];
    if(price != undefined) {
      this.storage
      .set('cart_to_check_data', price)
      .subscribe(() => {});
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
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

  onChangeCountry(event: any){
    let countryId = event.target.value;
    this.state = null;
    this.town = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
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

  sendcheckOutForm(checkOutForm: any) {
    this.btnDis = true;
    this.apiService.placeOrder(checkOutForm.value).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.btnDis = false;
        this.cartDetails = response.data.cart_det[0];
        this.orderDetails = response.data.order_det;
        this.nextOneFunction();
      } else {
        this.btnDis = false;
        this.toast.error({detail: response.msg,summary: "" ,duration: 4000});
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
    })

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

}
