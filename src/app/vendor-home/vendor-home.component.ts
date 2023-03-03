import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.css']
})
export class VendorHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  categoryArray:any = [
    {
      titleText: "Reorder Rate | Did you know?",
	  paraText: "Any new customers you add during the current review period won't count against your reorder rate."
    },
    {
      titleText: "Reorder Rate | Did you know?",
	  paraText: "Any new customers you add during the current review period won't count against your reorder rate."
    },
    {
      titleText: "Reorder Rate | Did you know?",
	  paraText: "Any new customers you add during the current review period won't count against your reorder rate."
    },
    {
      titleText: "Reorder Rate | Did you know?",
	  paraText: "Any new customers you add during the current review period won't count against your reorder rate."
    },
    {
      titleText: "Reorder Rate | Did you know?",
	  paraText: "Any new customers you add during the current review period won't count against your reorder rate."
    },
    {
      titleText: "Reorder Rate | Did you know?",
	  paraText: "Any new customers you add during the current review period won't count against your reorder rate."
    },
    {
      titleText: "Reorder Rate | Did you know?",
	  paraText: "Any new customers you add during the current review period won't count against your reorder rate."
    },
    {
      titleText: "Reorder Rate | Did you know?",
	  paraText: "Any new customers you add during the current review period won't count against your reorder rate."
    },
  ]

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2,
        slideBy: 2
      },
      740: {
        items: 2,
        slideBy: 2
      },
      940: {
        items: 2,
        slideBy: 2
      }
    },
    nav: true
  }

}
