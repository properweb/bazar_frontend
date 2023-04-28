import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-vendor-invoicing',
  templateUrl: './vendor-invoicing.component.html',
  styleUrls: ['./vendor-invoicing.component.css']
})
export class VendorInvoicingComponent implements OnInit {

  invoiceList!: any;
  status: any = 'all';
  searchText!: any;

  constructor( private apiService: ApiService, private router: Router, public toast: NgToastService, private appComponent: AppComponent ) { }

  ngOnInit(): void {
    this.fetchBrandInvoice(this.status, this.searchText);
  }

  fetchBrandInvoice(status: any, search_key: any) {
    this.appComponent.showSpinner = true;
    this.apiService.fetchBrandInvoice(status, search_key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.invoiceList = response.data;
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

  onTabChange(value: any) {
    this.status = value;
    this.fetchBrandInvoice(this.status, this.searchText);
  }

  onSearchPress(event: any) {
    this.invoiceList = null;
    this.fetchBrandInvoice(this.status, this.searchText);
  }

  onSearchTextChange(event: any) {
    if(event.target.value == '') {
      this.invoiceList = null;
      this.fetchBrandInvoice(this.status, this.searchText);
    }
  }

}
