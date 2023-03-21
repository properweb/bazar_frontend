import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ApiService } from '../services/api.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-arrangement',
  templateUrl: './product-arrangement.component.html',
  styleUrls: ['./product-arrangement.component.css']
})
export class ProductArrangementComponent implements OnInit {
  
  user_id!:any;
  products !: any;
  searchText !: any;
  selectAll!:any; 
  arrangedItemId : any = [];
  storeArrangedItemId : any = [];
  checkedItems: any = [];
  showLoader: any = false;

  constructor(private storage: StorageMap, private apiService : ApiService, private appComponent: AppComponent, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {


    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;

      
      },
      error: (error) => {
      },          
    });
  }

  arrange1:boolean = false;
  arrange2:boolean = true;

  arrangeOneFunction() {
    this.arrange1 = true;
    this.arrange2 = false;
  }

  arrangeTwoFunction() { 
    this.arrange1 = false;
    this.arrange2 = true;
  }

  onChecked(item: any, event: any){
    let {checked, value} = event.target;
    if(checked) {
      this.checkedItems.push(value);
    } else {
      let index = this.checkedItems.indexOf(value);
      if (index !== -1) this.checkedItems.splice(index, 1);
    }
  }

  checkAll(event: any){
    let {checked, value} = event.target;
    if(checked) {
      this.products.forEach((i:any) =>  this.checkedItems.push(i.id));
    }else {
    this.checkedItems = [];
    }
  }

  moveToTop() {
    this.appComponent.showSpinner = true;
    this.checkedItems.forEach((element: any) => {
      if(this.checkedItems.includes(element)) {
        let currentIndex = this.checkedItems.indexOf(element);
        this.checkedItems.splice(currentIndex, 1);
        this.checkedItems.unshift(element);
      }
    });

    this.checkedItems.forEach((element: any) => {
      if(this.storeArrangedItemId.includes(element)) {
        let currentIndex = this.storeArrangedItemId.indexOf(element);
        this.storeArrangedItemId.splice(currentIndex, 1);
        this.storeArrangedItemId.unshift(element);
      }
    });

    let values = {
      user_id : this.user_id,
      items: this.storeArrangedItemId
    }
    
    this.apiService.arrangeProducts(values).subscribe((responseBody) => {

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      this.appComponent.showSpinner = false;
      this.checkedItems = [];
      this.storeArrangedItemId = [];
      this.selectAll = false;
    })

  }

  movies = [
    {
      image: 'assets/images/product_thumb.png',
      name: 'T-shirt',
      published: 'Published',
      inventory: '-',
      availability: 'In stock',
      sku: '$11.70',
      price: '$11.70',
      size: '$11.70',
    },
    {
      image: 'assets/images/0EF592B8-5420-426A-958A-F9847691F489.jpeg',
      name: 'T-shirt2',
      published: 'Published',
      inventory: '-',
      availability: 'In stock',
      sku: '$11.70',
      price: '$11.70',
      size: '$11.70',
    },
  ];


    },(error) => {
      this.toast.error({detail: "Something went wrong. please try again later!", summary: "", duration: 4000});
      this.appComponent.showSpinner = false;
    } )
    
  }

  drop(event: CdkDragDrop<any[]>) {
    this.storeArrangedItemId = [];
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    event.container.data.map((item:any) => {
      this.arrangedItemId.push(item.id);
      this.storeArrangedItemId.push(item.id);
      
    })
    let value = {
      user_id : this.user_id,
      items: this.arrangedItemId
    }
    this.arrangedItemId = [];
    this.apiService.arrangeProducts(value).subscribe((responseBody) => {
    })

  }

}
