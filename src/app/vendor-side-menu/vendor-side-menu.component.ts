import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vendor-side-menu',
  templateUrl: './vendor-side-menu.component.html',
  styleUrls: ['./vendor-side-menu.component.css']
})
export class VendorSideMenuComponent implements OnInit {

  @Input() item = '';
  @Output() newItemEvent = new EventEmitter<string>();
  routeName: any = 'hi';

  constructor() { }

  ngOnInit(): void {
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    // alert(value);
  }
  
  toggleMenuShow(){
    $("body").toggleClass("body-menu");
    $(".vendor-toggler").toggleClass("menu-opened");
    $('.mask').toggleClass('showmask');
    $('.left_vendor_dasboard').toggleClass('left-menu-opened');
  }

}
