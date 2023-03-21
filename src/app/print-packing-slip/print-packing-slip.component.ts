import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-print-packing-slip',
  templateUrl: './print-packing-slip.component.html',
  styleUrls: ['./print-packing-slip.component.css']
})
export class PrintPackingSlipComponent implements OnInit {

  @ViewChild('printBtn') printBtn!: ElementRef;

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
  
  constructor(public modalService: NgbModal , private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.printBtn.nativeElement.click();
    //   }, 200);
    // this.printBtn.nativeElement.click();
    this.activatedRoute.params.subscribe((routeParams) => {
      this.fetchOrderDetails(routeParams['id']);
    })
  }

  fetchOrderDetails(ord_no: any) {
    this.appComponent.showSpinner = true;
    this.apiService.orderDetails(ord_no).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.cust_details = response.data.order;
        this.ordersArray = response.data.cart;

        this.brand_name = response.data.order.brand_name;
        this.brand_country = response.data.order.brand_country;
        this.brand_address1 = response.data.order.brand_address1;
        this.brand_address2 = response.data.order.brand_address2;
        this.brand_town = response.data.order.brand_town;
        this.brand_state = response.data.order.brand_state;
        this.brand_post_code = response.data.order.brand_post_code;
        this.brand_phone = response.data.order.brand_phone;
        this.apiService.getStates(response.data.order.brand_country).subscribe((responseBody) => {
          let response= JSON.parse(JSON.stringify(responseBody));
          this.stateArray = response.data;
        })
        this.apiService.getCities(response.data.order.brand_state).subscribe((responseBody) => {
          let response= JSON.parse(JSON.stringify(responseBody));
          this.cityArray = response.data;
        })
        this.appComponent.showSpinner = false;
      } else {
      }
    },(error) => {
      this.appComponent.showSpinner = false;
    })
  }

}
