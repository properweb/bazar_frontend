import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  @Input() currentUrl = '';
  userSignupModalReference!: NgbModalRef;
  signInModal!: NgbModalRef;
  catSlug!: any;
  allDetails!: any;
  not_logged_in: any = true;
  log1: boolean = true;
  log2: boolean = false;
  email_address!: any;
  password!: any;
  spinnerShow: boolean = false;
  validateError!: any;
  onChildChange: boolean = false;
  submitted: boolean = false;
  userRegForm!: FormGroup;
  userEmail!: any;
  filterModal!: NgbModalRef;
  SortModal!: NgbModalRef;
  filterClickedValue!: any;
  showFilterDropdown: boolean = false;
  clickedApplyBtn: boolean = false;
  filterBrandSelectedArray: any = [];
  filterBrandSelectedChecked: any = [];
  searchBrandText!: any;
  filterLeadTimeSelectedValue!: any;
  leadSelected: boolean = false;
  filterMinOrderSelectedValue!: any;
  minOrderSelected: boolean = false;
  filterValuesSelectedArray: any = [];
  filterValuesSelectedChecked: any = [];
  valuesSelected: boolean = false
  filterKeys: any = [];
  sort_key: any = 'featured';
  sortDropDownOpen: boolean = false;
  vendorCount!: any;
  sortValues!: any;
  filterLocationSelectedArray: any = [];
  filterLocationSelectedChecked: any = [];
  searchLocationText!: any;
  filterPromotionSelectedArray: any = [];
  filterPromotionSelectedChecked: any = [];
  filterCount: any = 0;

  leadTimeFilterValues:any = [{value:'3', display: '3 days or less'}, {value:'6', display: '6 days or less'}, {value:'9', display: '9 days or less'}, {value:'14', display: '14 days or less'}];
  minOrderFilterValues:any = [{value:'0', display: 'No minimum'}, {value:'100', display: '$100 or less'}, {value:'200', display: '$200 or less'}, {value:'300', display: '$300 or less'}];
  tagsArray:any =['Eco-friendly', 'Not on Amazon', 'Made in Europe', 'Social good', 'Shop local', 'Local brand'];
  promotionsArray:any =[{value:'free_shipping', display: 'Free shipping'}, {value:'40', display: '40% off & up'}, {value:'30', display: '30% off & up'}, {value:'20', display: '20% off & up'}, {value:'15', display: '15% off & up'}, {value:'10', display: '10% off & up'}, {value:'less_than_10', display: 'Less than 10% off'}, {value:'amount_off', display: 'Amount off'}];

  constructor( private apiService: ApiService, private storage: StorageMap, private router: Router, private activatedRoute: ActivatedRoute, private toast: NgToastService, public modalService: NgbModal) { 
    this.userRegForm = new FormGroup({
      userEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
    });
  } 

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.activatedRoute.params.subscribe((routeParams) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.storage.get("user_session").subscribe({
        next: (user) => {
          /* Called if data is valid or `undefined` */
          if(user) {
            let user_session = JSON.parse(JSON.stringify(user));
            // this.user_id = user_session.id;
          }
        },
        error: (error) => {
          /* Called if data is invalid */
        },
      });
      this.catSlug = routeParams['cat_slug'];
      this.getProductsByCategory(routeParams['cat_slug']);
      this.fetchProductFilterValues(routeParams['cat_slug']);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    })
    this.currentUrl = decodeURIComponent(this.router.url);
    this.checkedLoggedUser();
    this.getVendorCount();
  }

  getVendorCount() {
    this.apiService.vendorCount().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.vendorCount = response.data;
    })
  }

  checkedLoggedUser() {
    if(localStorage.getItem('local_data')) {
      this.not_logged_in = false;
    }
  }

  openUserLogInModal(content: any) {
    this.signInModal = this.modalService.open(content, { windowClass: 'loginModal' });
  } 

  continueFunction() {
    this.log1 = false;
    this.log2 = true;
  }

  backFirstFunction() {
    this.log1 = true;
    this.log2 = false;
  }

  send1stSignInData() {
    this.continueFunction();
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
        } else
        if(response.data.role === 'brand') {
            this.storage
          .set('user_session', JSON.parse(JSON.stringify(response.data)))
          .subscribe(() => {});
          localStorage.setItem('local_data', response.data.role);
          localStorage.setItem('authorization_data', JSON.stringify(response.data.authorisation));
          if(response.data.step_count !== 12) {
            this.router.navigate(['vendorRegistration',response.data.step_count]);
            this.signInModal.close();
            this.spinnerShow = false;
          }
          else {
            this.toast.success({detail:"SUCCESS",summary: "Login successful." ,duration: 4000});
            if(response.data.vendor_data.first_visit == 0) {
              this.router.navigateByUrl('/account-settings');
              this.signInModal.close();
              this.spinnerShow = false;
         
            } else {
              this.router.navigateByUrl('/brand-portal');
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
          this.router.navigateByUrl('/retailer-home');
          this.signInModal.close();
          this.toast.success({detail:"SUCCESS",summary: "Login successful." ,duration: 4000});
        }
   
       
      }
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
    });
  }

  openUserSignUpModal(content: any) {
    this.userSignupModalReference = this.modalService.open(content, { windowClass: 'registerModal' });
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

  getProductsByCategory(category: any) {
    let values = {
      main_category: category,
      category: '',
      sub_category: '',
      brandSort: this.filterBrandSelectedArray,
      leadTimeSort: this.filterLeadTimeSelectedValue,
      minOrderSort: this.filterMinOrderSelectedValue,
      valuesSort: this.filterValuesSelectedArray,
      locationSort: this.filterLocationSelectedArray,
      promotionSort: this.filterPromotionSelectedArray,
      sortKey: this.sort_key
    }
    this.apiService.fetchProductsByCategory(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
      } else {
        this.toast.error({detail: response.data, summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: 'Something went wrong. PLease try again.', summary: '', duration: 4000});
    })
  }

  fetchProductFilterValues(category: any) {
    let values = {
      main_category: category,
      category: '',
      sub_category: '',
    }
    this.apiService.fetchProductFilterValues(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.sortValues = response.data;
      } else {
        this.toast.error({detail: response.data, summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: 'Something went wrong. PLease try again.', summary: '', duration: 4000});
    })
  }

  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }
  
  onFilterChange(filterValue: any, event: any) {
    if(filterValue === 'brand') {
      let { value , checked } = event.target;
      if(checked) {
        this.filterBrandSelectedArray.push(value);
      } else {
        let index = this.filterBrandSelectedArray.indexOf(value);
        this.filterBrandSelectedArray.splice(index, 1);
      }
    } else if(filterValue === 'LeadTime') {
      let { value , checked } = event.target;
      this.filterLeadTimeSelectedValue = value;
    } else if(filterValue === 'minOrder') {
      let { value , checked } = event.target;
      this.filterMinOrderSelectedValue = value;
    } else if(filterValue === 'values') {
      let { value , checked } = event.target;
      if(checked) {
        this.filterValuesSelectedArray.push(value);
      } else {
        let index = this.filterValuesSelectedArray.indexOf(value);
        this.filterValuesSelectedArray.splice(index, 1);
      }
      this.valuesSelected = false;
    } else if(filterValue === 'location') {
      let { value , checked } = event.target;
      if(checked) {
        this.filterLocationSelectedArray.push(value);
      } else {
        let index = this.filterLocationSelectedArray.indexOf(value);
        this.filterLocationSelectedArray.splice(index, 1);
      }
    } else if(filterValue === 'promotion') {
      let { value , checked } = event.target;
      if(checked) {
        this.filterPromotionSelectedArray.push(value);
      } else {
        let index = this.filterPromotionSelectedArray.indexOf(value);
        this.filterPromotionSelectedArray.splice(index, 1);
      }
    }
  }

  clearFilterValue(filterValue: any) {
    if(filterValue === 'brand') {
      this.filterBrandSelectedArray = [];
      this.filterBrandSelectedChecked = [];
    } else if(filterValue === 'LeadTime') {
      this.filterLeadTimeSelectedValue = '';
    } else if(filterValue === 'minOrder') {
      this.filterMinOrderSelectedValue = '';
    } else if(filterValue === 'values') {
      this.filterValuesSelectedArray = [];
      this.filterValuesSelectedChecked = [];
    } else if(filterValue === 'location') {
      this.filterLocationSelectedArray = [];
      this.filterLocationSelectedChecked = [];
    } else if(filterValue === 'promotion') {
      this.filterPromotionSelectedArray = [];
      this.filterPromotionSelectedChecked = [];
    } else {}
    this.allFilterCount();
    this.getProductsByCategory(this.catSlug);
  }

  modalClearAll() {
    this.filterBrandSelectedArray = [];
    this.filterBrandSelectedChecked = [];
    this.filterLeadTimeSelectedValue = '';
    this.filterMinOrderSelectedValue = '';
    this.filterValuesSelectedArray = [];
    this.filterValuesSelectedChecked = [];
    this.filterLocationSelectedArray = [];
    this.filterLocationSelectedChecked = [];
    this.filterPromotionSelectedArray = [];
    this.filterPromotionSelectedChecked = [];
    this.allFilterCount();
    this.getProductsByCategory(this.catSlug);
  }

  onFilterApplyClick() {
    let filter_keys: any = [];
    this.clickedApplyBtn = true;
    this.filterClickedValue = '';
    this.showFilterDropdown = false;
    this.filterKeys = filter_keys;
    this.allFilterCount();
    this.getProductsByCategory(this.catSlug);
  }

  allFilterCount() {
    let count = 0;
    count = (this.filterBrandSelectedArray ? this.filterBrandSelectedArray.length : 0) + (this.filterLeadTimeSelectedValue ? 1 : 0) + (this.filterMinOrderSelectedValue ? 1 : 0) + (this.filterValuesSelectedArray ? this.filterValuesSelectedArray.length : 0) + (this.filterLocationSelectedArray ? this.filterLocationSelectedArray.length : 0) + (this.filterPromotionSelectedArray ? this.filterPromotionSelectedArray.length : 0);
    this.filterCount = count > 0 ? count : '' ;
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
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
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

  openFilterModal(content: any) {
    this.filterModal = this.modalService.open(content, { windowClass: 'filterModal' });
  }

  openSortModal(content: any) {
    this.SortModal = this.modalService.open(content, { windowClass: 'filterModal' });
  }

  filterOptions1: OwlOptions = {
    loop: false,
    margin: 10,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
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
