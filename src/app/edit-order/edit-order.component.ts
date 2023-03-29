import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  user_id!: any;
  shipping_id!: any;
  ord_no!: any;
  ship_date!: any;
  display_ship_date!: any;
  is_discount: any = 0;
  disc_amt!: any ;
  disc_amt_type: any = 'amount' ;
  ship_free: any = false ;
  btnDis: any = false ;
  editShipForm: any = false ;
  subTotal!: any;
  newSubTotal!: any;
  orderTotal!: any;
  allDetails!: any;
  cust_details!: any;
  ordersArray!: any;
  oldOrdersArray!: any;
  name!: any;
  country!: any;
  address2!: any;
  address1!: any;
  town!: any;
  state!: any;
  phone_code!: any;
  zipCode!: any;
  phone!: any;
  invoiceProduct!: any;
  discAmtError!: any;

  stateData!: any;
  orderDetails!: any;
  cartDetails!: any;
  minDate!: any;

  countriesArray!: any;
  stateArray!: any;
  cityArray!: any;
  productList!: any;

  proKeyword = 'name';
  proData: any = [];
  
  constructor(private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService, private appComponent: AppComponent, public formatter: NgbDateParserFormatter, public modalService: NgbModal) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
   }

  ngOnInit(): void { 
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.activatedRoute.params.subscribe((routeParams) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.ord_no = routeParams['id'];
          this.fetchOrderDetails(routeParams['id']);
        })
      },
      error: (error) => {
      },          
    });
    this.getCountries();
    this.getProducts();
  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }

  getProducts() {
    this.apiService.fetchProductsByShop('levis','','').subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      response?.data?.products.forEach((element: any) => {
        if(element.stock != '0' || element.stock != 0) {
          this.proData.push(element);
        }
      });
    })
  }

  onChangeCountry(event: any) {
    let countryId = event.target.value;
    this.state = null;
    this.town = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
    })

    let id = event.target.value;
    let country = this.countriesArray.filter((item: any) => item.id == id);
    this.phone_code = country[0].phone_code;
  }

  onChangeState(event: any) { 
    let stateId = event.target.value;
    this.town = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.cityArray = response.data;
    })
  }

  fetchOrderDetails(ord_no: any) {
    let totalPriceArr: any = [];
    this.appComponent.showSpinner = true;
    let values = {
      order_number: ord_no
    }
    this.apiService.orderDetails(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.cust_details = response.data.order;
        let items:any = []; 
        if(response.data.cart.length > 0 ) {
          response.data.cart.forEach((element: any) => {
              items.push(element);
          });
        }
        this.orderTotal = response.data.orderTotal;
        this.ordersArray = items;
        this.oldOrdersArray = [...response.data.cart];
        this.ship_date = response.data.order.shipping_date;
        this.display_ship_date = this.formatter.parse(response.data.order.shipping_date);
        this.shipping_id = response.data.order.shipping_id;
        this.name = response.data.order.shipping_name;
        this.country = response.data.order.shipping_country;
        this.address2 = response.data.order.shipping_suite;
        this.address1 = response.data.order.shipping_street;
        this.town = response.data.order.shipping_town;
        this.state = response.data.order.shipping_state;
        this.phone_code = response.data.order.shipping_phoneCode;
        this.zipCode = response.data.order.shipping_zip;
        this.phone = response.data.order.shipping_phone;
        this.is_discount = Number(response.data.order.has_discount);
        this.disc_amt_type = response.data.order.discount_type;
        if(response.data.order.discount != '0.00') {
          this.disc_amt = Number(response.data.order.discount);
        }
        this.ship_free = Number(response.data.order.shipping_free);
        this.apiService.getStates(response.data.order.shipping_country).subscribe((responseBody) => {
          let response= JSON.parse(JSON.stringify(responseBody));
          if(response.res == true) {
            this.stateArray = response.data;
          }
        })
        this.apiService.getCities(response.data.order.shipping_state).subscribe((responseBody) => {
          let response= JSON.parse(JSON.stringify(responseBody));
          if(response.res == true) {
            this.cityArray = response.data;
          }
        })
        this.appComponent.showSpinner = false;
        let total = 0;
        if(response.data.cart.length > 0) {
          response.data.cart.forEach((cartElement: any, cartkey: any) => {
            let total1 = Number(cartElement.product_qty) * Number(cartElement.product_price);
            total += total1;
          });
          this.subTotal = total;
        }
      } else {
      }
    },(error) => {
      this.appComponent.showSpinner = false;
    })
  }

  onQtyChange(id: any, event: any, qty:any, obj: any) {
    let updatedPrice = event.target.value * obj.product_price;
    obj.quantity = Number(event.target.value);
    obj.amount = updatedPrice;
    obj.totalPrice = updatedPrice;
    let total = 0;
    // if(this.ordersArray.length > 0) {
      this.ordersArray.forEach((cartElement: any, cartkey: any) => {
        let total1 = Number(cartElement.quantity) * Number(cartElement.product_price);
        total += total1;
      });
      this.subTotal = total;
    // }
  }

  onDateSelect(event: any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    let finalDate = year + "-" + month + "-" + day;
    this.ship_date = finalDate;
  }

  updateOrder() {
    this.btnDis = true;
    let shipFree = 0 ;
    if(this.ship_free == true) {
      shipFree = 1;
    } else {
      shipFree = 0;
    }
    let array: any = {};
    this.ordersArray.forEach((element: any) => {
      array[element.id] = {id: element.id, qty: element.quantity}
    });
    let values = {
      order_id: this.cust_details.id,
      ship_date: this.ship_date,
      items: array,
      disc_amt: this.disc_amt,
      is_discount: this.is_discount,
      ship_free: shipFree,
      disc_amt_type: this.disc_amt_type
    } 
    if(this.discAmtError) {
      this.btnDis = false;
      this.toast.error({detail: 'Invalid amount.', summary: '', duration: 4000});
    } else {
      if(this.is_discount == 1) {
        if(this.disc_amt > 0) {
          this.apiService.updateOrder(values).subscribe((responseBody) => {
            let response = JSON.parse(JSON.stringify(responseBody));
            if(response.res == true) {
              this.fetchOrderDetails(this.ord_no);
              this.btnDis = false;
              this.toast.success({detail: 'Order updated successfully.', summary: '', duration: 4000});
            } else {
              this.btnDis = false;
              this.toast.error({detail: response.msg, summary: '', duration: 4000});
            }
          },(error) => {
            this.btnDis = false;
            this.toast.error({detail: 'Something went wrong! Please try again.', summary: '', duration: 4000});
          })
        } else {
          this.toast.error({detail: 'Please enter amount.', summary: '', duration: 4000});
          this.btnDis = false;
        }
      } else {
        this.apiService.updateOrder(values).subscribe((responseBody) => {
          let response = JSON.parse(JSON.stringify(responseBody));
          if(response.res == true) {
            this.fetchOrderDetails(this.ord_no);
            this.btnDis = false;
            this.toast.success({detail: 'Order updated successfully.', summary: '', duration: 4000});
          } else {
            this.btnDis = false;
            this.toast.error({detail: response.msg, summary: '', duration: 4000});
          }
        },(error) => {
          this.btnDis = false;
          this.toast.error({detail: 'Something went wrong! Please try again.', summary: '', duration: 4000});
        })
      }
    }
    
  
  }

  discChange(event: any) {
    // console.log(event.target.value);
  }

  sendcheckOutForm(checkOutForm: any) {
    let values = {
      ord_no: this.ord_no,
      shipping_id: this.shipping_id,
      shipping_name: checkOutForm.value.name,
      shipping_phone: checkOutForm.value.phone,
      shipping_phoneCode: checkOutForm.value.phone_code,
      shipping_state: checkOutForm.value.state,
      shipping_street: checkOutForm.value.address1,
      shipping_suite: checkOutForm.value.address2,
      shipping_town: checkOutForm.value.town,
      shipping_zip: checkOutForm.value.zipCode,
      shipping_country: checkOutForm.value.country
    }
    this.btnDis = true;
    this.apiService.changeAddress(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.fetchOrderDetails(this.ord_no);
        this.btnDis = false;
        this.editShipForm = false;
        this.toast.success({detail: 'Updated successfully',summary: "" ,duration: 4000});
      } else {
        this.btnDis = false;
        this.toast.error({detail: response.msg,summary: "" ,duration: 4000});
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
    })
  }

  onFocused(e:any){
    // do something when input is focused
  }

  openInvoiceProductModal(content: any) {
    this.invoiceProduct = this.modalService.open(content, { windowClass: 'invoiceProductModal' });
  }

  select1stOptionEvent(event: any) {
    let amount = event.usd_wholesale_price * 1;
    this.ordersArray.push({id: event.id,product_image: event.featured_image,product_name: event.name, quantity: 1, product_price: event.usd_wholesale_price, amount: amount});
  }

  onDropProSelect() {
    
  }

  onItemDelete(item: any) {
    item.deleted = true;
  }

  onDiscountChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.discAmtError = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.discAmtError = '';
      if(this.disc_amt_type == "amount") {
        // this.ordersArray.forEach((element: any) => {
        //   element.newAmt = Number(element.amount) - Number(event.target.value);
        // });
        this.newSubTotal = this.orderTotal - Number(event.target.value);
      } else {
        let percentageCal = 0;
        percentageCal = this.orderTotal * ((100-Number(event.target.value)) / 100);
        this.newSubTotal = percentageCal.toFixed(2);
      }
      // console.log("this.ordersArray" , this.ordersArray);
    }
    
  }

  onNoPromotionClick() {
    delete this.ordersArray["newAmt"];
  }


}
