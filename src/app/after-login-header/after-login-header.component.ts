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

  constructor(
    public modalService: NgbModal,
    private router: Router,
    private api: ApiService,
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
    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));

        this.role = user_session.role;
        this.user_id = user_session.id;
        this.fetchCart(user_session.id);
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
      console.log(vemail);
      this.storage.set('vendor_email', vemail).subscribe(() => {});
      this.modalReference.close();
      this.router.navigate(['vendorRegistration']);
    } else {
      return;
    }
  }

  sendSignInData(signInFrom: any) {
    console.log(signInFrom.value);
    this.spinnerShow = true;
    this.api.vendorSignIn(signInFrom.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      console.log(response);
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

  fetchCart(user_id: any) {
    this.api.fetchCart(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.cartCount =  response.data.cart_count;
    })
  }

  logout() {
    localStorage.removeItem('local_data');
    this.storage.delete('user_session').subscribe({ 
      next: (user) => {
        /* Called if data is valid or `undefined` */
        this.toast.success({detail:"SUCCESS",summary: 'Logout successful' ,duration: 4000});
      this.router.navigate(['/localBrands']);
      },
      error: (error) => {
        /* Called if data is invalid */
        this.toast.error({detail:"ERROR",summary: 'Something went wrong Please try again!' ,duration: 4000});
        console.log(error);
      },          
    });
  }

}
