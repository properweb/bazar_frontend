import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  catSlug!: any;

  constructor( private apiService: ApiService, private storage: StorageMap, private router: Router, private activatedRoute: ActivatedRoute) { } 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.storage.get("user_session").subscribe({
        next: (user) => {
          /* Called if data is valid or `undefined` */
          let user_session = JSON.parse(JSON.stringify(user));
          // this.user_id = user_session.id;
          this.catSlug = routeParams['cat_slug'];
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        },
        error: (error) => {
          /* Called if data is invalid */
        },
      });
    })
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
