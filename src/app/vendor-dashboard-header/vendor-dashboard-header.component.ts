import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-dashboard-header',
  templateUrl: './vendor-dashboard-header.component.html',
  styleUrls: ['./vendor-dashboard-header.component.css']
})
export class VendorDashboardHeaderComponent implements OnInit {

  user_id!:any;
  profile_photo!:any;

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
      this.profile_photo = response.data.profile_photo;   
    })
  }
  
  isShown: boolean = false ;

  toggleShow() {
    this.isShown = ! this.isShown;
  }

  onClickedOutside(e: Event) {
    this.isShown=false;
  }

  toggleMenuShow(){
    $("body").toggleClass("body-menu");
    $(".vendor-toggler").toggleClass("menu-opened");
    $('.mask').toggleClass('showmask');
    $('.left_vendor_dasboard').toggleClass('left-menu-opened');
  }
  
  maskMenuShow(){
    $("body").removeClass("body-menu");
    $('.vendor-toggler').toggleClass('sliding-navbar--open');
    $('.mask').removeClass('showmask');
    $('.left_vendor_dasboard').toggleClass('left-menu-opened');
  }

  logout() {
    this.apiService.logout();
    this.toast.success({detail:"Logout successful.",summary: '' ,duration: 4000});
    this.router.navigate(['/localBrands']);
  }

}
