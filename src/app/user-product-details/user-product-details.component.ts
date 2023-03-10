import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
  ord_no!: any;
  ordersArray!: any;
  allDetails!: any;
  order_details!: any;

  constructor(public modalService: NgbModal , private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService, private formatter: NgbDateParserFormatter, private appComponent: AppComponent) { }

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

  }

  fetchOrderDetails(ord_no: any) {
    this.appComponent.showSpinner = true;
    let values = {
      user_id: this.user_id,
      order_number: ord_no
    }
    this.apiService.orderDetails(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.order_details = response.data.order;
        this.ordersArray = response.data.cart;
        this.appComponent.showSpinner = false;
      } else {
      }
    },(error) => {
      this.appComponent.showSpinner = false;
    })
  }

}
