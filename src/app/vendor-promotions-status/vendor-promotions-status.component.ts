import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-promotions-status',
  templateUrl: './vendor-promotions-status.component.html',
  styleUrls: ['./vendor-promotions-status.component.css']
})
export class VendorPromotionsStatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  newPromoDropdown(){
  	$(".newPromotionLink").toggleClass("new_romotion_active");
	$(".createPromotionsList").slideToggle();
  }

}
