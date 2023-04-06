import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  
  modalReference!: NgbModalRef;
  cancelOrderModal!: NgbModalRef;
  splitOrderModal!: NgbModalRef;

  user_id!: any;
  brand_name!: any;
  brand_country!: any;
  brand_address1!: any;
  brand_address2!: any;
  brand_town!: any;
  brand_state!: any;
  brand_post_code!: any;
  brand_phone!: any;
  can_reason!: any
  radio_value!: any
  cancelOrderError!: any
  btnDis!: any;
  ord_no!: any;
  cust_details!: any;
  allDetails!: any;
  countriesArray!: any;
  stateArray!: any;
  cityArray!: any;
  ordersArray!: any;
  product_deadline!:any;  
  ship_date!:any;  
  enableEdit: any = false;
  shipFromEdit: any = true;
  pSlipEdit: any = false;
  sInfoEdit: any = false;
  splitOrderArray:any = [];
  splitOrderError!:any ;
  totalProQty!: any;


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


  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
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

  } 

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }

  onChangeCountry(event: any){
    let countryId = event.target.value;
    this.brand_state = null;
    this.brand_town = null;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
    })
  }

  onChangeState(event: any) { 
    let stateId = event.target.value;
    this.brand_town = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.cityArray = response.data;
    })
  }

  fetchOrderDetails(ord_no: any) {

      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.cust_details = response.data.order;
        this.ordersArray = response.data.cart;
        let tQty = 0;
        response.data.cart.forEach((element: any) => {
          this.splitOrderArray[element.id] = {id: element.id, qty: 0};
          tQty += Number(element.quantity);
        });
        this.totalProQty = tQty;
        this.brand_name = response.data.order.brand_name;
        this.brand_country = response.data.order.brand_country;

        this.brand_town = response.data.order.brand_town;
        this.brand_address1 = response.data.order.brand_address1;
        this.brand_address2 = response.data.order.brand_address2;
        this.brand_post_code = response.data.order.brand_post_code;
        this.brand_phone = response.data.order.brand_phone;
        this.product_deadline = this.formatter.parse(response.data.order.shipping_date);
        this.ship_date = response.data.order.shipping_date;
        this.appComponent.showSpinner = false;
      } else {
      }
    },(error) => {
      this.appComponent.showSpinner = false;
    })
  }

  sendcheckOutForm(checkOutForm: any) {
    
    this.btnDis = true;
    this.apiService.brandShipFrom(checkOutForm.value).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.btnDis = false;
        this.toast.success({detail: "Saved successfully",summary: "" ,duration: 4000});
      } else {
        this.btnDis = false;
        this.toast.error({detail: response.msg,summary: "" ,duration: 4000});
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
    })

  }

  openCancelOrderModal(content: any) {
    this.cancelOrderModal = this.modalService.open(content, { windowClass: 'cancelOrderModal' });
  }

  openSplitOrderModal(content: any) {
    this.splitOrderModal = this.modalService.open(content, { windowClass: 'splitOrderModal' });
  }

  cancelOrder() {
    this.btnDis = true;
    if(this.can_reason == undefined) {
      this.btnDis = false;
      this.cancelOrderError = 'Please fill required field.';
    } else {
      let values = {
        order_id: this.cust_details.id,
        cancel_reason_title: this.radio_value,
        cancel_reason_desc: this.can_reason
      }
      this.apiService.cancelOrder(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.can_reason = undefined;
          this.radio_value = undefined;
          this.btnDis = false;
          this.cancelOrderModal.close();
          this.cancelOrderError = '';
          this.toast.success({detail:'Order cancelled successfully.',summary: '', duration: 4000});
        }
      },(error) => {
        this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      })

    }
  }

  onDateSelect(event: any) {
    this.ship_date = finalDate;
    let checkedItems: any = [];
    checkedItems.push(this.cust_details.id);
    let values = {
      items: checkedItems,
      ship_date: finalDate
    }
      this.apiService.changeEditShipOrder(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.enableEdit = false;

        }
      })
  }

    let no = Number(number) + 1;
    return new Array(Number(no));
  }
   
  orderQtyText(index: any) {
    return index + 1;
  }

  onNewOrderChange(event: any, item: any, itemId: any) {
    this.splitOrderArray[itemId].qty = Number(event.target.value);
  }

  onMoveAll(event: any, index: any, allQty: any, itemId: any) {
    if(event.target.checked) {
      this.splitOrderArray[itemId].qty = Number(allQty);
    } else {
      this.splitOrderArray[itemId].qty = 0;
    }
  }

  createSplitOrder() {
    this.btnDis = true;
    let exactArray: any = {};
    this.splitOrderArray.forEach((element: any) => {
      if(element.id) {
        exactArray[element.id] = element;
      }
    });
    let values = {
      order_id: this.cust_details.id,
      items: exactArray,
    }
    let prevOrdQty = 0;
    let newOrdQty = 0;
    this.ordersArray.forEach((ordElement: any, ordKey: any) => {
      prevOrdQty += Number(ordElement.quantity);
    });
    this.splitOrderArray.forEach((spElement: any, spKey: any) => {
      newOrdQty += Number(spElement.qty);
    });
    if(prevOrdQty > newOrdQty) {
      if(newOrdQty == 0 ) {
        this.splitOrderError = "Select atleast one order."
        this.btnDis = false;
      } else {
        this.apiService.splitOrder(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {

          this.btnDis = false;
        }
        }, (error) => {
          this.toast.error({detail: 'Something went wrong! Please try again.', summary: '', duration: 4000});
          this.btnDis = false;
        })
      }
    } else {
      this.splitOrderError = "You can't split all items."
      this.btnDis = false;
    }

    
  }

    
}
