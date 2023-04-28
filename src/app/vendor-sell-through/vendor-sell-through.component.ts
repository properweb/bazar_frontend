import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-vendor-sell-through',
  templateUrl: './vendor-sell-through.component.html',
  styleUrls: ['./vendor-sell-through.component.css']
})
export class VendorSellThroughComponent implements OnInit {

  topSellingList!: any;
  sellThroughList!: any;
  from_date!: any;
  from_dateDisplay!: any;
  to_date!: any;
  to_dateDisplay!: any;
  allTime: any = false;
  grayDivShow: any = true;

  constructor( private apiService: ApiService, private router: Router, public toast: NgToastService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    let currentdate = new Date();
    let last3months = new Date(currentdate.setMonth(currentdate.getMonth()-3));
    // console.log(last3months);
    this.from_dateDisplay = this.get_date_format(this.formatInYMD(last3months));
    this.from_date = this.formatInYMD(last3months);
    this.to_dateDisplay = this.get_date_format(this.formatInYMD(new Date()));
    this.to_date = this.formatInYMD(new Date());
    this.vendorSellThrough(this.from_date, this.to_date);
    this.vendorSellTopSelling(this.from_date, this.to_date);
  }

  formatInYMD(date: any) {
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }

  get_date_format = (dt: any) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var created_date = dt;
    var date = created_date?.slice(0,10);
    var created_date: any  = new Date(date);
    var date_month_format = created_date.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
    return date_month_format;
  }

  onSortChange(event: any) {
    switch (event.target.value) {
      case '1':
        this.from_date = this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-1)));
        this.to_date = this.formatInYMD(new Date());
        this.from_dateDisplay = this.get_date_format(this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-1))));
        this.to_dateDisplay = this.get_date_format(this.formatInYMD(new Date()));
        this.allTime = false;
        break;
      case '3':
        this.from_date = this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-3)));
        this.to_date = this.formatInYMD(new Date());
        this.from_dateDisplay = this.get_date_format(this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-3))));
        this.to_dateDisplay = this.get_date_format(this.formatInYMD(new Date()));
        this.allTime = false;
        break;
      case '6':
        this.from_date = this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-6)));
        this.to_date = this.formatInYMD(new Date());
        this.from_dateDisplay = this.get_date_format(this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-6))));
        this.to_dateDisplay = this.get_date_format(this.formatInYMD(new Date()));
        this.allTime = false;
        break;
      case '12':
        this.from_date = this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-12)));
        this.to_date = this.formatInYMD(new Date());
        this.from_dateDisplay = this.get_date_format(this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-12))));
        this.to_dateDisplay = this.get_date_format(this.formatInYMD(new Date()));
        this.allTime = false;
        break;
      case '13':
        this.from_date = this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-1000)));
        this.to_date = this.formatInYMD(new Date());
        this.from_dateDisplay = this.get_date_format(this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-1000))));
        this.to_dateDisplay = this.get_date_format(this.formatInYMD(new Date()));
        this.allTime = true;
        break;
      default:
        break;
    }
    this.vendorSellThrough(this.from_date, this.to_date);
    this.vendorSellTopSelling(this.from_date, this.to_date);
  }

  vendorSellTopSelling(from_date: any, to_date: any) {
    let values = {
      from_date: from_date,
      to_date: to_date
    }
    this.appComponent.showSpinner = true;
    this.topSellingList = null;
    this.apiService.vendorSellTopSelling(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.topSellingList = response.data;
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

  vendorSellThrough(from_date: any, to_date: any) {
    let values = {
      from_date: from_date,
      to_date: to_date
    }
    this.appComponent.showSpinner = true;
    this.sellThroughList = null;
    this.apiService.vendorSellThrough(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.sellThroughList = response.data;
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
