import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-sub-category',
  templateUrl: './product-sub-category.component.html',
  styleUrls: ['./product-sub-category.component.css']
})
export class ProductSubCategoryComponent implements OnInit {
  @Input() currentUrl = ''
  userSignupModalReference!: NgbModalRef;
  signInModal!: NgbModalRef;
  catSlug!: any;
  subCatSlug!: any;
  subSubCatSlug!: any;
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
          let user_session = JSON.parse(JSON.stringify(user));
          // this.user_id = user_session.id;
        },
        error: (error) => {
          /* Called if data is invalid */
        },
      });
      this.catSlug = routeParams['cat_slug'];
      this.subCatSlug = routeParams['subcat_slug'];
      this.subSubCatSlug = routeParams['subsubcat_slug'];
      this.getProductsByCategory(routeParams['cat_slug'], routeParams['subcat_slug'], routeParams['subsubcat_slug']);
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    })
    this.currentUrl = decodeURIComponent(this.router.url);
    this.checkedLoggedUser();
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
          console.log(decodeURIComponent(this.currentUrl));
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

  getProductsByCategory(category: any, subCat: any, subSubCat: any) {
    let values = {
      main_category: category,
      category: subCat,
      sub_category: subSubCat ? subSubCat : ''
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

  constructor() { }

  ngOnInit(): void {
  }
  
  model = 'middle';

}
