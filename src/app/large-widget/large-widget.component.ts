import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-large-widget',
  templateUrl: './large-widget.component.html',
  styleUrls: ['./large-widget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LargeWidgetComponent implements OnInit {

  user_id!:any;
  widgetKey!:any;
  copyValue!: any;
  copied: boolean = false;
  allDetails!: any;
  widgetDetails!: any;
  direct_Link!: any;

  constructor( private storage: StorageMap , private router:Router, private apiService : ApiService, private toast: NgToastService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        if(user) {
          let user_session = JSON.parse(JSON.stringify(user));
          this.user_id = user_session.id;
          // this.getVendorDetails(this.user_id); 
        }

       
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });
    this.widgetKey = this.activatedRoute.snapshot.params['key'];
    this.fetchWidgets(this.widgetKey);

  }

  // getVendorDetails(user_id:any) {
  //   this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
  //     let response = JSON.parse(JSON.stringify(responseBody));
  //     this.allDetails = response.data;  
  //     this.direct_Link = 'https://staging1.bazarcenter.ca/brand/'+ response.data.bazaar_direct_link;
  //     this.copyValue = this.direct_Link;
  //   })
  // }

  fetchWidgets(key: any) {
    this.apiService.getOneWidgets(key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        let response = JSON.parse(JSON.stringify(responseBody));
        // this.widgetDetails = response.data.find((item: any) => item.widget_key == this.widgetKey);
        this.widgetDetails = response.data;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
    });
  }

  // fetchWidgets() {
  //   this.apiService.fetchWidgets().subscribe((responseBody) => {
  //     let response = JSON.parse(JSON.stringify(responseBody));

  //     this.widgetDetails = response.data[0];
  //   })
  // }

}
