import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-local-brands',
  templateUrl: './local-brands.component.html',
  styleUrls: ['./local-brands.component.css']
})
export class LocalBrandsComponent implements OnInit {
  @Input() onChildChange:any
  user_id!: any;
  role!: any;
  brandList!: any;
  currentUrl!: any;
  modalReference!: NgbModalRef;
  signInModal!: NgbModalRef;
  userSignupModalReference!: NgbModalRef;
  vendorEmail!: any;
  submitted: boolean = false;
  vendorRegForm!: FormGroup;
  userRegForm!: FormGroup;
  userEmail!: any;
  email_address!: any;
  resetEmailSend: boolean = false;
  log1: boolean = true;
  log2: boolean = false;
  spinnerShow: boolean = false;
  validateError!: any;
  password!: any;
  vendorCount: any = 0;

  constructor(private router: Router,private apiService: ApiService, private storage: StorageMap, public modalService: NgbModal,  private toast: NgToastService) {
    this.vendorRegForm = new FormGroup({
      vendorEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
    });
    this.userRegForm = new FormGroup({
      userEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
    });
   }

  ngOnInit(): void {
    this.role = localStorage.getItem('local_data');
    if(localStorage.getItem('local_data') != null) {
      if(localStorage.getItem('local_data') == 'brand') {
        this.router.navigate(['/brand-portal']);
      } else if(localStorage.getItem('local_data') == 'retailer') {
        this.router.navigate(['/localBrands']);
        // this.router.navigate(['/retailer-home']);
      }
    } else {}

    this.storage.get("user_session").subscribe({
      next: (user) => {
        if(user) {
          let user_session = JSON.parse(JSON.stringify(user));
          this.user_id = user_session.id;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.fetchBrands(this.user_id);
    this.currentUrl =this.router.url;
    this.getVendorCount();
  }

  getVendorCount() {
    this.apiService.vendorCount().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.vendorCount = response.data;
    })
  }

  fetchBrands(user_id: any) {
    this.apiService.fetchBrands(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res ==  true) {
        this.brandList = response.data;
      } else {

      }
    })
  }

  openVendorSignUpModal(content: any) {
    this.modalReference = this.modalService.open(content, {
      windowClass: 'registerModal',
    });
  }
  
  openUserLogInModal(content: any) {
    this.signInModal = this.modalService.open(content, { windowClass: 'loginModal' });
  }

  openUserSignUpModal(content: any) {
    this.userSignupModalReference = this.modalService.open(content, { windowClass: 'registerModal' });
  }

  submitEmail(form: any) {
    this.submitted = true;
    // if (this.vendorRegForm.valid) {
      let vemail = JSON.parse(JSON.stringify(this.vendorEmail));
      this.storage.set('vendor_email', vemail).subscribe(() => {});
      this.modalReference.close();
      this.router.navigate(['vendorRegistration']);
    // } else {
    //   return;
    // }
  }

  submitUserEmail(form: any) {
    this.submitted = true;
    if (this.userRegForm.valid) {
      let uemail = JSON.parse(JSON.stringify(this.userEmail));
      this.storage.set('user_email', uemail).subscribe(() => {});
      this.userSignupModalReference.close();
      this.router.navigate(['userRegistration']);
    } else {
      return;
    }
  }

  resetPassword() {
    this.router.navigateByUrl("reset-password/Test");
    let values = {
      email_address: this.email_address
    }
    this.apiService.sendResetEmail(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.resetEmailSend = true;
      }
    })
  }

  backFirstFunction() {
    this.log1 = true;
    this.log2 = false;
  }

  sendSignInData(signInFrom: any) {
    let values = {
      email: signInFrom.value.email_address,
      password: signInFrom.value.password
    }
    this.spinnerShow = true;
    this.apiService.vendorSignIn(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if (response.res === false) {
        this.validateError = response.msg;
        this.spinnerShow = false;
      } else {
        if(this.currentUrl) {
          if(response.data.step_count !== 12) { 
            this.storage
            .set('user_session', JSON.parse(JSON.stringify(response.data)))
            .subscribe(() => {});
            localStorage.setItem('from_login_cred', JSON.stringify(values));
            this.router.navigate(['vendorRegistration',response.data.step_count]);
            this.signInModal.close();
            this.spinnerShow = false; 
          } else { 
            this.toast.success({detail:"Login successful.",summary: "" ,duration: 4000});
            setTimeout(() => {
              this.router.navigate([this.currentUrl]).then(() => {
                this.onChildChange = true;
                window.location.reload();
              });
            }, 500);
            this.signInModal.close();
            this.spinnerShow = false;
            this.storage
            .set('user_session', JSON.parse(JSON.stringify(response.data)))
            .subscribe(() => {});
            localStorage.setItem('local_data', response.data.role);
            localStorage.setItem('authorization_data', JSON.stringify(response.data.authorisation));
          }
        } else if(response.data.role === 'brand') {
          if(response.data.step_count !== 12) {
            this.storage
            .set('user_session', JSON.parse(JSON.stringify(response.data)))
            .subscribe(() => {});
            localStorage.setItem('from_login_cred', JSON.stringify(values));
            this.router.navigate(['vendorRegistration',response.data.step_count]);
            this.signInModal.close();
            this.spinnerShow = false;
          }
          else {
            this.storage
            .set('user_session', JSON.parse(JSON.stringify(response.data)))
            .subscribe(() => {});
            localStorage.setItem('local_data', response.data.role);
            localStorage.setItem('authorization_data', JSON.stringify(response.data.authorisation));
            this.toast.success({detail:"Login successful.",summary: "" ,duration: 4000});
            if(response.data.vendor_data.first_visit == 0) {
              this.router.navigateByUrl('/account-settings').then(() => {
                this.onChildChange = true;
              });
              this.signInModal.close();
              this.spinnerShow = false;
            } else {
              this.router.navigateByUrl('/brand-portal').then(() => {
                this.onChildChange = true;
              });
              this.signInModal.close();
              this.spinnerShow = false;
            }
          }
        } else if (response.data.role === 'retailer') {
          this.storage
          .set('user_session', JSON.parse(JSON.stringify(response.data)))
          .subscribe(() => {});
          localStorage.setItem('local_data', response.data.role);
          localStorage.setItem('authorization_data', JSON.stringify(response.data.authorisation));
          this.router.navigateByUrl('/localBrands');
          // this.router.navigateByUrl('/retailer-home').then(() => {
          //   this.onChildChange = true;
          // });
          this.signInModal.close();
          this.toast.success({detail:"Login successful.",summary: "" ,duration: 4000});
        }
      }
    }, (error) => {
      this.spinnerShow = false;
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
    });
  }

  continueFunction() {
    this.log1 = false;
    this.log2 = true;
  }
  
  send1stSignInData() {
    this.continueFunction();
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

}
