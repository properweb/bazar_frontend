import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-bazar-direct',
  templateUrl: './vendor-bazar-direct.component.html',
  styleUrls: ['./vendor-bazar-direct.component.css']
})
export class VendorBazarDirectComponent implements OnInit {

  user_id!:any;
  copyValue!: any;
  copied: boolean = false;
  allDetails!: any;
  direct_Link!: any;

  constructor( private storage: StorageMap , private router:Router, private apiService : ApiService, private toast: NgToastService ) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        if(user) {
          let user_session = JSON.parse(JSON.stringify(user));
          this.user_id = user_session.id;
          this.getVendorDetails(this.user_id); 
        }

       
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });
  }

  getVendorDetails(user_id:any) {
    this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.allDetails = response.data;  
      this.direct_Link = 'https://staging1.bazarcenter.ca/brand/'+ response.data.bazaar_direct_link;
      this.copyValue = this.direct_Link;
    })
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copied = true;
  }

}
