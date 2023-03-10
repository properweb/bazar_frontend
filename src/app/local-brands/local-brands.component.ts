import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-local-brands',
  templateUrl: './local-brands.component.html',
  styleUrls: ['./local-brands.component.css']
})
export class LocalBrandsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') != null) {
      if(localStorage.getItem('local_data') == 'brand') {
        this.router.navigate(['/brand-portal']);
      } else if(localStorage.getItem('local_data') == 'retailer') {
        this.router.navigate(['/retailer-home']);
      }
    } else {
      
    }
  }
  
  localBannerHeading = "Local Brands Wholesale";
  localBannerPara = "Shop other 20,000 brands, all in one place";

  localCommonHeading = "Are you ready for";
  localCommonSubHeading = "wholesale business";
  commonArray:any = [
    {
      imgPath: "assets/images/home_footer_palm-img.png",
      textPath: "Buy new products for resale in your store, and pay 60 days later."
    },
    {
      imgPath: "assets/images/home_footer_palm-img.png",
      textPath: "The more you shop our wholesale website, the better recommendations you'll get."
    }
  ]

  categoryArray:any = [
    {
      imgName: "assets/images/explore-categories-img1.jpg",
      titleName: "Shop Greeting Cards"
    },
    {
      imgName: "assets/images/explore-categories-img2.jpg",
      titleName: "Shop Accessories"
    },
    {
      imgName: "assets/images/explore-categories-img3.jpg",
      titleName: "Shop Candles"
    },
    {
      imgName: "assets/images/explore-categories-img4.jpg",
      titleName: "Shop Women's clothes"
    },
    {
      imgName: "assets/images/explore-categories-img1.jpg",
      titleName: "Shop Greeting Cards"
    },
    {
      imgName: "assets/images/explore-categories-img2.jpg",
      titleName: "Shop Accessories"
    },
    {
      imgName: "assets/images/explore-categories-img3.jpg",
      titleName: "Shop Candles"
    },
    {
      imgName: "assets/images/explore-categories-img4.jpg",
      titleName: "Shop Women's clothes"
    },
  ]

  customOptions: OwlOptions = {
    loop: true,
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
        items: 3,
        slideBy: 3
      },
      940: {
        items: 4,
        slideBy: 4
      }
    },
    nav: true
  }
  
  newCatArray:any = [
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
  ]

  customOptions4: OwlOptions = {
    loop: true,
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
        items: 3,
        slideBy: 3
      },
      940: {
        items: 5,
        slideBy: 5
      }
    },
    nav: true
  }

  clientsImg = "assets/images/client-img.png";

  trendingArray:any = [
    {
      trendingImg: "assets/images/trending-img1.jpg",
      trendingText: "Hand-made"
    },
    {
      trendingImg: "assets/images/trending-img2.jpg",
      trendingText: "Kitchen"
    },
    {
      trendingImg: "assets/images/trending-img3.jpg",
      trendingText: "Stationery"
    },
    {
      trendingImg: "assets/images/trending-img4.jpg",
      trendingText: "Watches"
    },
    {
      trendingImg: "assets/images/trending-img5.jpg",
      trendingText: "Hand-made cosmetics"
    },
    {
      trendingImg: "assets/images/trending-img6.jpg",
      trendingText: "Machenery"
    }
  ]

  bazarListArray:any = [
    {
      textContent: "<strong>Eco-sustainable:</strong> All recyclable materials, 0% CO2 emissions"
    },
    {
      textContent: "<strong>Hyphoallergenic:</strong> 100% natural, human friendly ingredients"
    },
    {
      textContent: "<strong>Handmade:</strong> All candles are craftly made with love."
    },
    {
      textContent: "<strong>Long burning:</strong> No more waste. Created for last long."
    }
  ]

  localCategoryArray2:any = [
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
  ]

  localcarousel2: OwlOptions = {
    loop: true,
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
        items: 3,
        slideBy: 3
      },
      940: {
        items: 5,
        slideBy: 5
      }
    },
    nav: true
  }

}
