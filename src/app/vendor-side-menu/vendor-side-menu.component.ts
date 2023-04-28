import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-side-menu',
  templateUrl: './vendor-side-menu.component.html',
  styleUrls: ['./vendor-side-menu.component.css']
})
export class VendorSideMenuComponent implements OnInit {

  @Input() item = '';
  @Output() newItemEvent = new EventEmitter<string>();
  routeName: any = 'hi';
  productUrlList: any = ['/products', '/inventory', '/bulk-products', '/my-shop'];
  analyticsUrlList: any = ['/analytics', '/analytics/sell-through', '/analytics/reviews', '/analytics/order-issues'];
  activeTab!: any;

  constructor( private router : Router ) { }

  ngOnInit(): void {
    if(this.productUrlList.includes(this.router.url)) {
      this.activeTab = 'products';
    } else if(this.analyticsUrlList.includes(this.router.url)) {
      this.activeTab = 'analytics';
    } else {
      this.activeTab = '';
    }
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
  
  toggleMenuShow(){
    $("body").toggleClass("body-menu");
    $(".vendor-toggler").toggleClass("menu-opened");
    $('.mask').toggleClass('showmask');
    $('.left_vendor_dasboard').toggleClass('left-menu-opened');
  }

}
