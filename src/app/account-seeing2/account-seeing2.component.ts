import { Component, OnInit } from "@angular/core";
import { StorageMap } from "@ngx-pwa/local-storage";
import { NgToastService } from "ng-angular-popup";
import { ApiService } from "../services/api.service";
import { ApmService } from '@elastic/apm-rum-angular'

@Component({
  selector: "app-account-seeing2",
  templateUrl: "./account-seeing2.component.html",
  styleUrls: ["./account-seeing2.component.css"],
})
export class AccountSeeing2Component implements OnInit {
  user_id!: any;
  first_name!: any;
  last_name!: any;
  email!: any;
  country_code!: any;
  phone_number!: any;
  old_password!: any;
  new_password!: any;
  confirm_password!: any;
  errorMsg!: any;
  countriesArray: any = [];
  verified: any = 1;
  resendBtsDis: any = false;
  btnDis: any = false;

  constructor(private storage: StorageMap, private apiService: ApiService, private toast: NgToastService, private apmService: ApmService) {}

  ngOnInit(): void {
    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getAccountDetails(this.user_id);
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },
    });

    this.getCountries();

  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
      let apm  = this.apmService.init({
        serviceName: 'angular-app',
      serverUrl: 'http://localhost:8200'
      })
      // apm.setUserContext
    })
  }

  getAccountDetails(user_id: any) {
    this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.first_name = response.data.first_name;
      this.last_name = response.data.last_name;
      this.email = response.data.email;
      this.country_code = response.data.country_code;
      this.phone_number = response.data.phone_number;
      this.verified = response.data.verified;
    });
  }

  sendAccountUpdate(vendorAccountUpdate: any) {
    this.btnDis = true;
    this.apiService
      .userAccountUpdate(vendorAccountUpdate.value)
      .subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        // console.log(response.msg);
        this.getAccountDetails(this.user_id);
        if (response.res === false) {
          // this.errorMsg = response.msg;
          this.toast.error({detail: response.msg , summary: '', duration: 4000})
          this.btnDis = false;
        } else {
          this.errorMsg = '';
          this.toast.success({detail: response.msg , summary: '', duration: 4000});
          this.btnDis = false;
        }
       
      });
  }

  onResendEmailClick() {
    this.resendBtsDis = true;
    this.apiService.resendVerifyEmail(this.user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.toast.success({detail:"Email sended successfully.",summary: "" ,duration: 4000});
        this.resendBtsDis = false;
      }
    },(error) => {
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
      this.resendBtsDis = false;
    })
  }

  
}
