import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-vendor-performance',
  templateUrl: './vendor-performance.component.html',
  styleUrls: ['./vendor-performance.component.css']
})
export class VendorPerformanceComponent implements OnInit {

  reviewDetails!: any;
  from_date!: any;
  from_dateDisplay!: any;
  to_date!: any;
  to_dateDisplay!: any;
  totalSellList!: any;
  trafficList!: any;
  totalSellListDate!: any;
  sellThroughList!: any;
  allTime: any = false;
  dynamicData: any = [];
  dynamicData1: any = [];
  dynamicData2: any = [];
  // dynamicDateData: any = ['04/19', '03/29'];
  // lineChartLabels: any = [];

  constructor( private apiService: ApiService, private router: Router, public toast: NgToastService, private appComponent: AppComponent) { }
  lineChartLabels: Array<any> = [];
  lineChartLabels1: Array<any> = [];
  lineChartLabels2: Array<any> = [];
  
  ngOnInit() {
    // inline plugin
    this.textPlugin = [{
      id: 'textPlugin',
      beforeDraw(chart: any): any {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        //const text = 'Text Plugin';
        //const textX = Math.round((width - ctx.measureText(text).width) / 2);
        //const textY = height / 2;
        //ctx.fillText(text, textX, textY);
        ctx.save();
      }
    }];

    this.inlinePlugin = this.textPlugin;

    let currentdate = new Date();
    let last3months = new Date(currentdate.setMonth(currentdate.getMonth()-3));
    // console.log(last3months);
    this.from_dateDisplay = this.get_date_format(this.formatInYMD(last3months));
    this.from_date = this.formatInYMD(last3months);
    this.to_dateDisplay = this.get_date_format(this.formatInYMD(new Date()));
    this.to_date = this.formatInYMD(new Date());
    this.vendorTotalSales(this.from_date, this.to_date);
    this.vendorTotalTraffic(this.from_date, this.to_date);
    this.vendorTotalSalesDate(this.from_date, this.to_date);
    this.vendorTraffice(this.from_date, this.to_date);
    this.vendorSellThrough(this.from_date, this.to_date);
    this.brandOrderReview('new');
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

  brandOrderReview(sort_key: any) {
    this.apiService.brandOrderReview(sort_key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.reviewDetails = response.data;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
    })
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
    this.vendorTotalSales(this.from_date, this.to_date);
    this.vendorTotalTraffic(this.from_date, this.to_date);
    this.vendorTotalSalesDate(this.from_date, this.to_date);
    this.vendorTraffice(this.from_date, this.to_date);
    // if(event.target.value == '1') {
    //   this.from_dateDisplay = this.get_date_format(this.formatInYMD(new Date(new Date().setMonth(new Date().getMonth()-1))));
    //   this.to_dateDisplay = this.get_date_format(this.formatInYMD(new Date()));
    // } else 
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

  vendorTotalSales(from_date: any, to_date: any) {
    this.appComponent.showSpinner = true;
    this.totalSellList = null;
    let values = {
      from_date: from_date,
      to_date: to_date
    }
    this.apiService.vendorTotalSales(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.totalSellList = response.data[0];
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

  vendorTotalTraffic(from_date: any, to_date: any) {
    this.appComponent.showSpinner = true;
    this.totalSellList = null;
    let values = {
      from_date: from_date,
      to_date: to_date
    }
    this.apiService.vendorTotalTraffic(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.trafficList = response.data[0];
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

  vendorTraffice(from_date: any, to_date: any) {
    this.appComponent.showSpinner = true;
    this.totalSellList = null;
    let values = {
      from_date: from_date,
      to_date: to_date
    }
    this.apiService.vendorTraffice(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        response.data.forEach((element: any) => {
          this.lineChartLabels1.push(element.date);
          this.lineChartLabels2.push(element.date);
        });
        response.data.forEach((element: any) => {
          this.dynamicData1.push(element.totalVisit);
        });
        response.data.forEach((element: any) => {
          this.dynamicData2.push(Number(element.totalSales));
        });
        this.appComponent.showSpinner = false;
         this.lineChartData1  = [
            {
              label: 'Page visits',
              fill: false,  
              tension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.dynamicData1,
            },
            {
              label: 'orders',
              fill: false,  
              tension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.dynamicData2,
            },
          ];
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

  vendorTotalSalesDate(from_date: any, to_date: any) {
    this.appComponent.showSpinner = true;
    this.totalSellListDate = null;
    let values = {
      from_date: from_date,
      to_date: to_date
    }
    this.apiService.vendorTotalSalesDate(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.totalSellListDate = response.data;
        response.data.forEach((element: any) => {
          this.lineChartLabels.push(element.date);
        });
        response.data.forEach((element: any) => {
          this.dynamicData.push(element.totalAmount);
        });
        // console.log(this.lineChartLabels, this.dynamicData);
        this.appComponent.showSpinner = false;

        this.lineChartData =[
          {
            label: 'Total sales',
            fill: false,  
            tension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.dynamicData,
          },
        ];
  
        this.inlinePlugin = this.textPlugin;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

  lineChartData: Chart.ChartDataset[] = [
    {
      label: 'Total sales',
      fill: false,  
      tension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: this.dynamicData,
    },
  ];

  lineChartData1: Chart.ChartDataset[] = [
    {
      label: 'Page visits',
      fill: false,  
      tension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: this.dynamicData1,
    },
    {
      label: 'orders',
      fill: false,  
      tension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: this.dynamicData2,
    },
  ];
 
  lineChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        // min: 0,
        // suggestedMax: 1000,
        ticks: {
          stepSize: 100
        }
      },
    }
  };

  lineChartOptions1: any = {
    responsive: true,
    scales: {
      y: {
        // min: 0,
        // suggestedMax: 1000,
        ticks: {
          stepSize: 100
        }
      },
    }
  };

  lineChartLegend = false;
  lineChartType:any = 'line';
  inlinePlugin: any;
  textPlugin: any;

}
