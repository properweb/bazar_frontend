import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-my-shop-videos2',
  templateUrl: './vendor-my-shop-videos2.component.html',
  styleUrls: ['./vendor-my-shop-videos2.component.css']
})
export class VendorMyShopVideos2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  customerKnownArray:any = [
    {
      HeadText: "Brand story",
    },
    {
      HeadText: "Product close-up",
    },
    {
      HeadText: "Collection overview",
    },
    {
      HeadText: "How-to",
    },
    {
      HeadText: "General update",
    },
    {
      HeadText: "Behind the scenes",
    },
	{
      HeadText: "FAQ",
    }
  ]

}
