import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-product-details',
  templateUrl: './user-product-details.component.html',
  styleUrls: ['./user-product-details.component.css']
})
export class UserProductDetailsComponent implements OnInit {

  user_id!: any;
  btnDis: any = false;
  ord_no!: any;
  ordersArray!: any;
  returnedOrdersArray: any = [];
  allDetails!: any;
  order_details!: any;
  radio_value!: any;
  can_reason!: any;
  cancelOrderError!: any;
  currentRate!: any;
  review_text!: any;
  reviewError!: any;
  paymentError!: any;
  reasonBlankError!: any;
  cancelOrderModal!: NgbModalRef;
  custDetAlertModal!: NgbModalRef;
  returnItemModal!: NgbModalRef;
  writeReviewModal!: NgbModalRef;
  userPaymentModal!: NgbModalRef;
  reasonsReturnItemsModal!: NgbModalRef;
  shippingMethodModal!: NgbModalRef;
  submitReturnItemsModal!: NgbModalRef;
  exceededQtyError: any = null;
  feedback!: any;
  currentdate!: any;
  shippingdate!: any;
  todaydate!: any; 
  payment_method!: any; 
  paymentMethodSelected: boolean = false; 
  isShipped: any = 0;
  shippingMethod: any = 0;
  checkboxShipValue: any = null;
  selectedPolicyValues: any = [];
  cancelReasonsArray = [
    {id: 1 , value: 'The retailer asked to cancel the order'},
    {id: 2 , value: "The retailer isn't a good fit for my brand"},
    {id: 3 , value: 'The retailer wants to modify or replace the order'},
    {id: 4 , value: 'Item(s) in the order are out of stock'},
    {id: 5 , value: 'Item(s)in the order are incorrectly priced'},
    {id: 6 , value: 'The order is to small'},
    {id: 7 , value: "I don't sell to retailers in this country"},
    {id: 8 , value: "Other"},
  ];

  shippingMethodDateArray: any = [];

  // returnPolicyValuesArray: any = [
  //   {id: 'I am returning items using the designated shipping labels(s) provided by Bazar.' , value: 'I am returning items using the designated shipping labels(s) provided by Bazar.'},
  //   {id: 'I am returning items that are not opened. stained, discolored, marked, shipped, broken, or dirty.' , value: "I am returning items that are not opened. stained, discolored, marked, shipped, broken, or dirty."},
  //   {id: 'I am returning only items listed on the packing slip.' , value: 'I am returning only items listed on the packing slip.'},
  //   {id: 'I understand once items have been retuned. they cannot be sent back to me.' , value: 'I understand once items have been retuned. they cannot be sent back to me.'},
  //   {id: 'I will be charged for rerturned items that do not follow any of the above.' , value: 'I will be charged for rerturned items that do not follow any of the above.'},
  // ];

  returnPolicyValuesArray: any = [];
  returnReasonsArray: any = [];

  constructor(public modalService: NgbModal , private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService, private formatter: NgbDateParserFormatter, private appComponent: AppComponent) { }

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
    var options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    var date_month_format = new Date().toLocaleDateString("en-US", options); // Saturday, September 17, 2016
    this.currentdate = date_month_format;

    let currentdate = new Date();
    let currentdate1 = new Date();
    let upcomingTwelveDays = currentdate.setDate(currentdate.getDate() + 14);
    let upcomingDay = currentdate1.setDate(currentdate1.getDate() + 1);
    let newFormatTwelveDays = new Date(upcomingTwelveDays).toLocaleDateString();
    let newFormatUpcomingDay = new Date(upcomingDay).toLocaleDateString();
    let [m , d , y] = newFormatTwelveDays.split('/');
    let [m1 , d1 , y1] = newFormatUpcomingDay.split('/');
    var formattedDate = m + "-" + d + "-" + y;
    var formattedDate1 = m1 + "-" + d1 + "-" + y1;

    this.getBusinessDays(formattedDate1 , formattedDate);
    this.fetchReturnReasons();
    this.fetchReturnPolicies();
  }

  getBusinessDays (startDate: any, endDate: any) {
    var options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date(startDate);
    const dates = [];
    while (current <= end) {
      if (current.getDay() !== 6 && current.getDay() !== 0) {
        dates.push(new Date(current).toLocaleDateString("en-US", options));
      }
      current.setDate(current.getDate() + 1);
    }
    this.shippingMethodDateArray = dates;
  }
  
  fetchReturnReasons() {
    this.apiService.fetchReturnReasons().subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.returnReasonsArray = response.data;
      } else {
      }
    },(error) => {
    })
  }
  
  fetchReturnPolicies() {
    this.apiService.fetchReturnPolicies().subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.returnPolicyValuesArray = response.data;
      } else {
      }
    },(error) => {
    })
  }
  
  fetchOrderDetails(ord_no: any) {
    this.appComponent.showSpinner = true;
    let values = {
      // user_id: this.user_id,
      order_number: ord_no
    }
    this.apiService.orderDetails(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.order_details = response.data.order;
        this.ordersArray = response.data.cart;
        this.appComponent.showSpinner = false;
        this.payment_method = this.order_details?.payment_method;
        if(this.order_details?.payment_method) {
          this.paymentMethodSelected = true;
        } else this.paymentMethodSelected = false;
        this.shippingdate = new Date(this.order_details.shipping_date);
        this.todaydate = new Date();

        this.isShipped = this.todaydate >= this.shippingdate?1:0
        
      } else {
        this.appComponent.showSpinner = false;
        this.toast.error({detail: response.msg,summary: '', duration: 4000});
      }
    },(error) => {
      this.appComponent.showSpinner = false;
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
    })
  }

  openCancelOrderModal(content: any) {
    this.cancelOrderModal = this.modalService.open(content, { windowClass: 'cancelOrderModal' });
  }

  cancelOrder() {
    this.btnDis = true;
    if(this.can_reason == undefined) {
      this.btnDis = false;
      this.cancelOrderError = 'Please fill required field.';
    } else {
      let values = {
        // order_id: this.cust_details.id,
        cancel_reason_title: this.radio_value,
        cancel_reason_desc: this.can_reason
      }
      // this.apiService.cancelOrder(values).subscribe((responseBody) => {
      //   let response = JSON.parse(JSON.stringify(responseBody));
      //   if(response.res == true) {
      //     this.can_reason = undefined;
      //     this.radio_value = undefined;
      //     this.btnDis = false;
      //     this.cancelOrderModal.close();
      //     this.cancelOrderError = '';
      //     this.toast.success({detail:'Order cancelled successfully.',summary: '', duration: 4000});
      //   }
      // },(error) => {
      //   this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      // })

    }
  }

  submitReview() {
    this.btnDis = true;
    let values = {
      order_number: this.ord_no,
      rate: this.currentRate,
      review: this.review_text
    }
    if(!this.currentRate || this.currentRate == 0) {
      this.reviewError = "Please select rating.";
      this.btnDis = false;
    } else if (this.review_text == undefined || this.review_text == '') {
      this.reviewError = "Please write review.";
      this.btnDis = false;
    } else {
        this.apiService.reviewSubmit(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.btnDis = false;
          this.reviewError = '';
          this.writeReviewModal.close();
          this.fetchOrderDetails(this.ord_no);
          this.toast.success({detail:response.msg ,summary: '', duration: 4000});
        } else {
          this.toast.error({detail:response.msg ,summary: '', duration: 4000});
          this.btnDis = false;
        }
      },(error) => {
        this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
        this.btnDis = false;
      })
    }
  }

  openCustDetAlertModal(content: any) {
    this.custDetAlertModal = this.modalService.open(content, { windowClass: 'custDetAlertModal' });
  }
 
  openwriteReviewModal(content: any) {
    this.writeReviewModal = this.modalService.open(content, { windowClass: 'writeReviewModal' });
  }
 
  openUserPaymentModal(content: any) {
    this.userPaymentModal = this.modalService.open(content, { windowClass: 'userPaymentModal' });
  }

  openReturnItemModal(content: any) {
    this.returnItemModal = this.modalService.open(content, { windowClass: 'returnItemModal' });
  }

  openReasonsReturnItemsModal(content: any) {
    this.returnItemModal.close();
    this.reasonsReturnItemsModal = this.modalService.open(content, { windowClass: 'reasonsReturnItemsModal' });
  }

  openShippingMethodModal(content: any) {
    this.reasonsReturnItemsModal.close();
    this.shippingMethodModal = this.modalService.open(content, { windowClass: 'shippingMethodModal' });
  }

  openSubmitReturnItemsModal(content: any) {
    this.shippingMethodModal.close();
    this.submitReturnItemsModal = this.modalService.open(content, { windowClass: 'submitReturnItemsModal' });
  }

  backReturnItemModal(content: any) {
    this.reasonsReturnItemsModal.close();
    this.returnItemModal = this.modalService.open(content, { windowClass: 'returnItemModal' });
  }
  
  backReasonsReturnItemsModal(content: any) {
    this.shippingMethodModal.close();
    this.reasonsReturnItemsModal = this.modalService.open(content, { windowClass: 'reasonsReturnItemsModal' });
  }

  backShippingMethodModal(content: any) {
    this.submitReturnItemsModal.close();
    this.shippingMethodModal = this.modalService.open(content, { windowClass: 'shippingMethodModal' });
  }

  cancelOrderReq() {
    this.btnDis = true;
    let values = {
      order_number: this.ord_no,
    }
      this.apiService.cancelOrderRequest(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.btnDis = false;
        this.reviewError = '';
        this.modalService.dismissAll();
        this.fetchOrderDetails(this.ord_no);
        this.toast.success({detail:response.msg ,summary: '', duration: 4000});
      } else {
        this.toast.error({detail:response.msg ,summary: '', duration: 4000});
        this.btnDis = false;
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      this.btnDis = false;
    })
    
  }

  onReturnCancel() {
    this.modalService.dismissAll();
  }

  onQtyChange(event: any, index: any, item: any) {
    item.returned_qty = Number(event.target.value);
    console.log(this.ordersArray);
    this.checkReturnItemCount();
  }

  onReasonChange(event: any, index: any, item: any) {
    item.returned_reason = event.target.value;
    console.log(this.ordersArray);
  }

  checkReturnItemCount() {
    this.returnedOrdersArray = [];
    let error = 0;
    let notItemSelectError = 0;
    this.ordersArray.forEach((element: any) => {
      element.returned_reason = 'null';
      if(element.returned_qty > element.quantity) {
        error = 1; 
      } else if(element.returned_qty > 0) {
        // let index = this.returnedOrdersArray.findIndex((item: any) => item.id == element.id);
        // if(index == -1) {
          this.returnedOrdersArray.push(element);
        // }
      } else {notItemSelectError = 1}
    });
    if(error == 1) {
      this.exceededQtyError = "Return quantity item exceeded.";
    } else if(this.returnedOrdersArray.length == 0) {
      this.exceededQtyError = "Please select atleast on item.";
    } else this.exceededQtyError = null;
  }

  onSaveReturnItems(content: any) {
    if(this.exceededQtyError) {
      // this.exceededQtyError = "Return quantity item exceeded.";
    } else if(this.returnedOrdersArray?.length == 0) {
      this.exceededQtyError = "Please select atleast on item.";
    } else {
      this.returnItemModal.close();
      this.reasonsReturnItemsModal = this.modalService.open(content, { windowClass: 'reasonsReturnItemsModal' });
      this.exceededQtyError = null;
    }
  }

  checkReturnReasonBlank() {
    let error = 0;
    this.returnedOrdersArray.forEach((element: any) => {
      if(element.returned_reason == 'null') {
        error = 1; 
      } else {error = 0}
    });
    if(error == 1) {
      this.reasonBlankError = "Reason is required for all items.";
    } else this.reasonBlankError = null;
  }
  
  onSaveReturnReasons(content: any) {
    this.checkReturnReasonBlank();
    if(this.reasonBlankError) {
      this.reasonBlankError = "Reason is required for all items.";
    } else {
      this.reasonsReturnItemsModal.close();
      this.shippingMethodModal = this.modalService.open(content, { windowClass: 'shippingMethodModal' });
      this.reasonBlankError = null;
    }
  }

  onCheckboxChange(event: any) {
    if(event.target.checked) {
      this.selectedPolicyValues.push(event.target.value);
    } else {
      let index = this.selectedPolicyValues.findIndex((item: any) => item === event.target.value);
      this.selectedPolicyValues.splice(index,  1);
    }
  }

  changeSelection(event: any, index: any) {
    this.checkboxShipValue = event.target.value;
  }

  onSubmitReturn() {
    this.btnDis = true;
    let values = {
      order_number: this.ord_no,
      products: this.returnedOrdersArray,
      feedback: this.feedback,
      shipping_time: this.checkboxShipValue ? this.checkboxShipValue : this.currentdate,
      policy_values: this.selectedPolicyValues
    }
    this.apiService.returnOrder(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.btnDis = false;
        this.modalService.dismissAll();
        this.fetchOrderDetails(this.ord_no);
        this.toast.success({detail:response.msg ,summary: '', duration: 4000});
      } else {
        this.toast.error({detail:response.msg ,summary: '', duration: 4000});
        this.btnDis = false;
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      this.btnDis = false;
    })
  }

  onSubmitReceived() {
    // this.btnDis = true;
    let values = {
      order_number: this.ord_no,
    }
    this.apiService.receiveOrder(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        //this.btnDis = false;
        this.fetchOrderDetails(this.ord_no);
        this.toast.success({detail:response.msg ,summary: '', duration: 4000});
      } else {
        this.toast.error({detail:response.msg ,summary: '', duration: 4000});
        //this.btnDis = false;
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      //this.btnDis = false;
    })
  }

  submitPayment() {
    if(!this.payment_method) {
      this.paymentError = 'Please select a method.'
      this.paymentMethodSelected = false;
    } else {
      this.paymentError = '';
      this.paymentMethodSelected = true;
      this.modalService.dismissAll();
    }
  }

  confirmOrder() {
    let values = {
      order_number: this.ord_no,
      payment_method: this.payment_method
    }
    this.apiService.confirmOrder(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.fetchOrderDetails(this.ord_no);
        this.toast.success({detail:response.msg ,summary: '', duration: 4000});
      } else {
        this.toast.error({detail:response.msg ,summary: '', duration: 4000});
        //this.btnDis = false;
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      //this.btnDis = false;
    })
  }

  declineOrder() {
    let values = {
      order_number: this.ord_no,
    }
    this.apiService.declineOrder(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.fetchOrderDetails(this.ord_no);
        this.toast.success({detail:response.msg ,summary: '', duration: 4000});
      } else {
        this.toast.error({detail:response.msg ,summary: '', duration: 4000});
        //this.btnDis = false;
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      //this.btnDis = false;
    })
  }

}
