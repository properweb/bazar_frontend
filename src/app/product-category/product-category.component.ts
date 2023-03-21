import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  topCatArray:any = [
    {
      newImgName: "assets/images/local-brands-new-bazar-img1.jpg",
      newTitleName: "Kitchen"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img2.jpg",
      newTitleName: "Living"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img3.jpg",
      newTitleName: "Dining"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img4.jpg",
      newTitleName: "Decor"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img5.jpg",
      newTitleName: "Bathroom"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img6.jpg",
      newTitleName: "Carpets"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img1.jpg",
      newTitleName: "Kitchen"
    }
  ]

  catOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  filterOptions1: OwlOptions = {
    loop: false,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoWidth: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  localBannerHeading = "Local Brands Wholesale";
  localBannerPara = "Shop other 20,000 brands, all in one place";

  catBestCatArray:any = [
    {
      newImgName: "assets/images/local-brands-new-bazar-img1.jpg",
      newTitleName: "Accessories"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img2.jpg",
      newTitleName: "Home & Garden"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img3.jpg",
      newTitleName: "Stationery"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img4.jpg",
      newTitleName: "Machinery"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img5.jpg",
      newTitleName: "Europenean Brands"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img6.jpg",
      newTitleName: "For Children"
    },
    {
      newImgName: "assets/images/local-brands-new-bazar-img1.jpg",
      newTitleName: "Accessories"
    }
  ]

  catOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

}
