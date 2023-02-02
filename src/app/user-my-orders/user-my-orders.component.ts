import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-my-orders',
  templateUrl: './user-my-orders.component.html',
  styleUrls: ['./user-my-orders.component.css']
})
export class UserMyOrdersComponent implements OnInit {

  user_id !:any;
  sort_key !:any;
  proStatus !:any;
  currentPage :any =1;
  allDetails !:any;
  orders :any = [];

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
		if(user_session.id) {
			this.getOrders(user_session.id, 1, 'all');
		}
	},
	error: (error) => {
		/* Called if data is invalid */
		console.log(error);
	},          
	});
  }
  
  showAllOrder:boolean= true;
  showOpenOrder:boolean= false;
  showProgressOrder:boolean= false;
  showCompletedOrder:boolean= false;
  showCancelledOrder:boolean= false;
  showBidsOrder:boolean= false;
  
  getOrders(user_id:any, currPage: any, proStatus: any) {
    // this.appComponent.showSpinner = true;
    this.apiService.retailerOrders(user_id, currPage, proStatus).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
	  this.allDetails = response.data;
      if(response.data.orders.length > 0) {
        response.data.orders.forEach((element: any) => {
        this.orders.push(element);
      });

      }
      this.appComponent.showSpinner = false;
    })
    
  }

  onScroll() {
	this.currentPage ++;
    this.getOrders(this.user_id,this.currentPage, this.proStatus);
  }

  showOpenordersFunction(){
  	this.showAllOrder= false;
  	this.showOpenOrder= true;
  	this.showProgressOrder= false;
  	this.showCompletedOrder= false;
  	this.showCancelledOrder= false;
  	this.showBidsOrder= false;
	$(".commonOrderTab").removeClass("active");
	$(".showOpenOrdersTab").addClass("active");
  }
  
  showProgressFunction(){
  	this.showAllOrder= false;
  	this.showOpenOrder= false;
  	this.showProgressOrder= true;
  	this.showCompletedOrder= false;
  	this.showCancelledOrder= false;
  	this.showBidsOrder= false;
	$(".commonOrderTab").removeClass("active");
	$(".showProgressOrdersTab").addClass("active");
  }
  
  showCompletedFunction(){
  	this.showAllOrder= false;
  	this.showOpenOrder= false;
  	this.showProgressOrder= false;
  	this.showCompletedOrder= true;
  	this.showCancelledOrder= false;
  	this.showBidsOrder= false;
	$(".commonOrderTab").removeClass("active");
	$(".showCompletedOrdersTab").addClass("active");
  }
  
  showCancelledFunction(){
  	this.showAllOrder= false;
  	this.showOpenOrder= false;
  	this.showProgressOrder= false;
  	this.showCompletedOrder= false;
  	this.showCancelledOrder= true;
  	this.showBidsOrder= false;
	$(".commonOrderTab").removeClass("active");
	$(".showCancelledOrdersTab").addClass("active");
  }
  
  showBidsFunction(){
  	this.showAllOrder= false;
  	this.showOpenOrder= false;
  	this.showProgressOrder= false;
  	this.showCompletedOrder= false;
  	this.showCancelledOrder= false;
  	this.showBidsOrder= true;
	$(".commonOrderTab").removeClass("active");
	$(".showBidsOrdersTab").addClass("active");
  }

  onTabChange(value: any) {
	this.orders = [];
    this.currentPage = 1;
    this.proStatus = value;
    this.getOrders(this.user_id,this.currentPage, this.proStatus);
  }

}
