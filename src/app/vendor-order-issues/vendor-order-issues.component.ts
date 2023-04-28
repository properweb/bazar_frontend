import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-vendor-order-issues',
  templateUrl: './vendor-order-issues.component.html',
  styleUrls: ['./vendor-order-issues.component.css']
})
export class VendorOrderIssuesComponent implements OnInit {

  allDetails!: any;
  returnActive: any = false;

  constructor( private apiService: ApiService, private router: Router, public toast: NgToastService, private appComponent: AppComponent, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['return'] == 'true') {
        this.returnActive = true;
      } else {
        this.returnActive = false;
      }
    })
    this.vendorOrderIssue();
  }

  vendorOrderIssue() {
    this.appComponent.showSpinner = true;
    this.allDetails = null;
    this.apiService.vendorOrderIssue().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.appComponent.showSpinner = false;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

  vendorOrderCancel() {
    this.appComponent.showSpinner = true;
    this.allDetails = null;
    this.apiService.vendorOrderCancel().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.appComponent.showSpinner = false;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

}
