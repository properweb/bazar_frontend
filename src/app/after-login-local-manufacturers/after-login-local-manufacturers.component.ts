import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-after-login-local-manufacturers',
  templateUrl: './after-login-local-manufacturers.component.html',
  styleUrls: ['./after-login-local-manufacturers.component.css']
})
export class AfterLoginLocalManufacturersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  localBannerHeading = "Local Manufacturers";
  localBannerPara = "Something we want to highlight";

  localMiddleArray:any = [
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/local-brands-new-bazar-img4.jpg",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/local-brands-new-bazar-img5.jpg",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
  ]

  topCustomOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    margin: 20,
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
