import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {

  resetPassModal!: NgbModalRef;
  password!: any;
  confirm_password!: any;
  btnDis!: any ;
  @ViewChild('resetContent') content!: any;

  constructor( public modalService: NgbModal,private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService, private toast: NgToastService) { }

  user_id!: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      this.user_id = routeParams['id'];
    })
    // this.openUserLogInModal();
  }

  ngAfterViewInit() {
    this.openUserLogInModal();
  }

  openUserLogInModal() {
    this.resetPassModal = this.modalService.open(this.content, { windowClass: 'loginModal', centered: true });
  }

  sendResetPassData() {
    this.btnDis = true;
    console.log(this.password , this.confirm_password);
    let values = {
      token: this.user_id,
      password: this.password
    }
    this.apiService.resetPassword(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.router.navigate(['/localBrands']);
        this.toast.success({detail: 'password has been reset successfully' , summary: '', duration: 4000})
        this.btnDis = false;
        this.resetPassModal.close();
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail: 'Something wenr wrong! please try again.' , summary: '', duration: 4000})
    })
    
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
