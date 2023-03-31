import { Component, ElementRef, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef;
  @Input() currentUrl = ''
  @Input() onChildChange:any
  modalReference!: NgbModalRef;
  userSignupModalReference!: NgbModalRef;
  signInModal!: NgbModalRef;
  vendorRegForm!: FormGroup;
  userRegForm!: FormGroup;
  email!: any;
  userEmail!: any;
  vendorEmail!: any;
  vendorCount: any = 0;
  log1: boolean = true;
  log2: boolean = false;
  submitted: boolean = false;
  validateError!: any;
  sameEmailError!: any;
  email_address!: any;
  password!: any;
  spinnerShow: boolean = false;
  resetEmailSend: boolean = false;


  constructor( public modalService: NgbModal, private router: Router, private api: ApiService, private storage: StorageMap, private toast: NgToastService) {
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
    this.getVendorCount();
  }

  getVendorCount() {
    this.api.vendorCount().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.vendorCount = response.data;
    })
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
    let values = {
      email: this.vendorEmail
    }
    this.api.checkEmail(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
      // if (this.vendorRegForm.valid) {
        let vemail = JSON.parse(JSON.stringify(this.vendorEmail));
        this.storage.set('vendor_email', vemail).subscribe(() => {});
        this.modalReference.close();
        this.router.navigate(['vendorRegistration']);
        this.sameEmailError = '';
      // } else {
      //   return;
      // }
      } else {
        this.sameEmailError = response.msg;
      }
    },(error) => {
      this.sameEmailError = 'Something went wrong in server. Please try again.';
    })
    
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
  
  sendSignInData(signInFrom: any) {
    let values = {
      email: signInFrom.value.email_address,
      password: signInFrom.value.password
    }
    this.spinnerShow = true;
    this.api.vendorSignIn(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if (response.res === false) {
        this.validateError = response.msg;
        this.spinnerShow = false;
      } else {
        if(this.currentUrl) {
          if(response.data.role === 'brand' && response.data.step_count !== 12) { 
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

  resetPassword() {
    this.router.navigateByUrl("reset-password/Test");
    let values = {
      email_address: this.email_address
    }
    this.api.sendResetEmail(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.resetEmailSend = true;
      }
    })
  }



}
