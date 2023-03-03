import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-left-sidebar',
  templateUrl: './user-left-sidebar.component.html',
  styleUrls: ['./user-left-sidebar.component.css']
})
export class UserLeftSidebarComponent implements OnInit {

  user_id!: any;
  allDetails!: any;
  retailerData!: any;
  
  constructor( private router: Router, private apiService: ApiService, private storage: StorageMap, private toast: NgToastService) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getRetailerDetails(user_session.id);
      },
      error: (error) => {
      },          
    });
    // this.getReatilerData();
  }

  getReatilerData() {
    // alert(1);
    this.storage.get('retailer_data').subscribe({
      next: (user) => {
        let retailer_data = JSON.parse(JSON.stringify(user));
        this.retailerData = retailer_data;
      },
      error: (error) => {
      },          
    });
  }

  getRetailerDetails(user_id: any) {
    this.apiService.getRetailerDetails(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
      let data = {
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      };

      this.storage
      .set('retailer_data', JSON.parse(JSON.stringify(data)))
      .subscribe(() => {});
        }
      },(error) => {
      })
      this.storage.get('retailer_data').subscribe({
        next: (user) => {
          let retailer_data = JSON.parse(JSON.stringify(user));
          this.retailerData = retailer_data;
        },
        error: (error) => {
        },          
      });
  }

  logout() {
    this.apiService.logout();
    this.toast.success({ detail:"Logout successful", summary:"", duration: 4000});
    this.router.navigate(['/localBrands']);
  }

}
