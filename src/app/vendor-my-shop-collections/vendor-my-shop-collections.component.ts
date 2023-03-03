import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-my-shop-collections',
  templateUrl: './vendor-my-shop-collections.component.html',
  styleUrls: ['./vendor-my-shop-collections.component.css']
})
export class VendorMyShopCollectionsComponent implements OnInit {

  keyword = 'name';
  data = [{ id: 1, name: 'Grey plate', sku: 'AA234', img: 'assets/images/search-img.png' }];
  
  constructor() { }

  ngOnInit(): void {
  }
  
  UploadRadoBox1:boolean= true;
  UploadRadoBox2:boolean= false;
  
  showRadioBox1(){
  	this.UploadRadoBox1= true;
    this.UploadRadoBox2= false;
  }
  
  showRadioBox2(){
  	this.UploadRadoBox1= false;
    this.UploadRadoBox2= true;
  }
  
  itemQuantity: number = 1;
  
  minus() { 
  	this.itemQuantity--;
  }
   
  plus() { 
  	this.itemQuantity++;
  }

}
