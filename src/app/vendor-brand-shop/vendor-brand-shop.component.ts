import { Component, ElementRef, OnInit, ViewChild, Input, DoCheck } from '@angular/core';
import { Title } from '@angular/platform-browser';  
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from "@ngx-pwa/local-storage";
import { AppComponent } from "../app.component";
import { ApiService } from "../services/api.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: "app-vendor-brand-shop",
  templateUrl: "./vendor-brand-shop.component.html",
  styleUrls: ["./vendor-brand-shop.component.css"],
})
export class VendorBrandShopComponent implements OnInit, DoCheck {
  @ViewChild('closeModal') closeModal!: ElementRef;
  @Input() currentUrl = ''
  modalReference!: NgbModalRef;
  userSignupModalReference!: NgbModalRef;
  signInModal!: NgbModalRef;

  user_id!: any;
  role!: any;
  brand_id!: any;
  sort_key: any = 1;
  vendorData!: any;
  products!: any;
  searchText !: any;
  noVendor: boolean = false;
  not_logged_in: any = true;
  log1: boolean = true;
  log2: boolean = false;
  categories: any = [];
  vendorRegForm!: FormGroup;
  userRegForm!: FormGroup;
  email!: any;
  userEmail!: any;
  submitted: boolean = false;
  validateError!: any;
  email_address!: any;
  password!: any;
  spinnerShow: boolean = false;
  onChildChange: boolean = false;
  selectedData = [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6 }];
  showLoader: any = false;

  constructor(private storage: StorageMap, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router, private appComp: AppComponent, private titleService: Title, public modalService: NgbModal, private toast: NgToastService, private appComponent: AppComponent) {
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
    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        if(user) {
          let user_session = JSON.parse(JSON.stringify(user));
          console.log(user_session);
          
          this.user_id = user_session.id;
          this.role = user_session.role;
        }
 
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },
    });

    this.brand_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getVendorDetails(this.brand_id);
    this.getProducts(this.brand_id , this.sort_key);
    this.currentUrl =this.router.url;
    this.checkedLoggedUser();
  }

  ngDoCheck(): void {
  }

  openUserLogInModal(content: any) {
    this.signInModal = this.modalService.open(content, { windowClass: 'loginModal' });
  }

  openUserSignUpModal(content: any) {
    this.userSignupModalReference = this.modalService.open(content, { windowClass: 'registerModal' });
  }

  openVendorSignUpModal(content: any) {
    this.modalReference = this.modalService.open(content, {
      windowClass: 'registerModal',
    });
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

  submitEmail(form: any) {
    this.submitted = true;
    if (this.vendorRegForm.valid) {
      let vemail = JSON.parse(JSON.stringify(this.email));
      console.log(vemail);
      this.storage.set('vendor_email', vemail).subscribe(() => {});
      this.modalReference.close();
      this.router.navigate(['vendorRegistration']);
    } else {
      return;
    }
  }

  submitUserEmail(form: any) {
    this.submitted = true;
    if (this.userRegForm.valid) {
      let uemail = JSON.parse(JSON.stringify(this.userEmail));
      console.log(uemail);
      this.storage.set('user_email', uemail).subscribe(() => {});
      this.userSignupModalReference.close();
      this.router.navigate(['userRegistration']);
    } else {
      return;
    }
  }

  sendSignInData(signInFrom: any) {
    this.spinnerShow = true;
    this.apiService.vendorSignIn(signInFrom.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      console.log(response);
      if (response.res === false) {
        this.validateError = response.msg;
        this.spinnerShow = false;
      } else {
        if(this.currentUrl) {
          this.router.navigate([this.currentUrl]).then(() => {
            window.location.reload();
          });
          this.signInModal.close();
          this.spinnerShow = false;
          this.storage
          .set('user_session', JSON.parse(JSON.stringify(response.data)))
          .subscribe(() => {});
        } else
        if(response.data.role === 'brand') {
            this.storage
          .set('user_session', JSON.parse(JSON.stringify(response.data)))
          .subscribe(() => {});
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
          this.router.navigateByUrl('/retailer-home');
          this.signInModal.close();
          this.toast.success({detail:"SUCCESS",summary: "Login successful." ,duration: 4000});
        }
   
       
      }
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
    });
  }

  checkedLoggedUser() {
    this.storage.get("user_session").subscribe({
      next: (user) => {
        if (user) {
          this.not_logged_in = false;
        }
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },
    });
  }

  notLoggedIn() {
  }

  getVendorDetails(brand_id: any) {
    this.apiService.getBrandShopDetails(brand_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.data.length == 0) {
        // window.location.href = this.appComp.base_url;
      }
      this.vendorData = response.data;
      this.titleService.setTitle(response.data.brand_name);
    },(error) => {
    });
  }

  getProducts(brand_id:any , sort_key: any) {
    this.appComponent.showSpinner = true;
    this.apiService.fetchProductsByShop(brand_id , sort_key , '').subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.products = response.data;
      this.categories =  response.data.categories 
      this.appComponent.showSpinner = false;
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: "Something went wrong! please try again." ,duration: 4000});
    })
  }

  onCatClick(slug: any) {
    this.showLoader = true;
    this.apiService.fetchProductsByShop(this.brand_id , this.sort_key , slug).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.products = response.data;
      this.showLoader = false;
    })
  }

  onSubCatClick(slug: any) {
  }

  onSortingProducts($event: any) {
    this.sort_key = $event.target.value
    this.getProducts(this.brand_id, this.sort_key);
  }
}
