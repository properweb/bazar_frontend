import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-after-login-header',
  templateUrl: './after-login-header.component.html',
  styleUrls: ['./after-login-header.component.css']
})
export class AfterLoginHeaderComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef;
  modalReference!: NgbModalRef;
  signInModal!: NgbModalRef;

  user_id!: any;
  role!: any;
  allCategories!: any;
  vendorRegForm!: FormGroup;
  email!: any;
  validateError!: any;
  email_address!: any;
  password!: any;
  cartCount: any = 0;
  log1: boolean = true;
  log2: boolean = false;
  submitted: boolean = false;
  spinnerShow: boolean = false;
  searchText!: any;
  allSearchRes!: any;

  constructor(
    public modalService: NgbModal,
    private router: Router,
    private apiService: ApiService,
    private storage: StorageMap,
    private toast: NgToastService
  ) { 
    this.vendorRegForm = new FormGroup({
      vendorEmail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('searchkey') != null && localStorage.getItem('searchkey') != undefined) {
      this.searchText = localStorage.getItem('searchkey');
    }
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
    
    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));

        this.role = user_session.role;
        this.user_id = user_session.id;
        this.fetchCart();
        this.fetchMenuCategories();
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },
    });
    
  }

  isShown: boolean = false ;

  toggleShow() {
    this.isShown = ! this.isShown;
  }

  onClickedOutside(e: Event) {
    this.isShown=false;
  }

  openUserLogInModal(content: any) {
    this.signInModal = this.modalService.open(content, { windowClass: 'loginModal' });
  }

  openUserSignUpModal(content: any) {
    this.modalService.open(content, { windowClass: 'registerModal' });
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
      this.storage.set('vendor_email', vemail).subscribe(() => {});
      this.modalReference.close();
      this.router.navigate(['vendorRegistration']);
    } else {
      return;
    }
  }

  sendSignInData(signInFrom: any) {
    this.spinnerShow = true;
    this.apiService.vendorSignIn(signInFrom.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if (response.res === false) {
        this.validateError = response.msg;
        this.spinnerShow = false;
      } else {
        if(response.data.role === 'vendor') {
            this.storage
          .set('user_session', JSON.parse(JSON.stringify(response.data)))
          .subscribe(() => {});
          if(response.data.step_count !== 12) {
            this.router.navigate(['vendorRegistration',response.data.step_count]);
            // this.router.navigateByUrl('/account-settings');
            this.signInModal.close();
            this.spinnerShow = false;
          }
          else {

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
        }
   
       
      }
    });
  }

  fetchMenuCategories() {
    this.apiService.manuCategories().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allCategories =  response.data;
      }
    }, (error) => {
      this.toast.error({detail: 'Something went wrong. PLease try again.', summary: '', duration: 4000});
    })
  }

  fetchCart() {
    this.apiService.fetchCart().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.cartCount =  response.data.cart_count;
    })
  }

  logout() {
    this.apiService.logout();
    this.toast.success({ detail:"Logout successful", summary:"", duration: 4000});
    setTimeout(() => {
      this.router.navigate(['/localBrands']).then(() => {
        window.location.reload();
      });
    }, 500);
  }

  onSearchPress(event: any) {
    this.apiService.searchApi(event.target.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allSearchRes = response;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    }, (error) => {
      this.toast.error({detail: 'Something went wrong. PLease try again.', summary: '', duration: 4000});
    })
  }

  onSearchClick(value: any) {
    localStorage.setItem('searchkey', value);
  }

  onCrossClick() {
    this.searchText = null;
    localStorage.removeItem('searchkey');
  }

}
