import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-header',
  templateUrl: './vendor-header.component.html',
  styleUrls: ['./vendor-header.component.css']
})
export class VendorHeaderComponent implements OnInit {

  user_id!:any;
  profile_photo!:any;

  constructor(private storage: StorageMap , private router:Router, private apiService : ApiService,  private toast: NgToastService) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getVendorDetails(this.user_id);
       
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });
  }

  isShown: boolean = false ;

  toggleShow() {
    this.isShown = ! this.isShown;
  }

  onClickedOutside(e: Event) {
    // console.log('Clicked outside:', e);
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

  getVendorDetails(user_id:any) {
    
    this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.profile_photo = response.data.profile_photo;
      
    })
    
  }
  
  logout() {
    localStorage.removeItem('local_data');

    this.storage.delete('user_session').subscribe({ 
      next: (user) => {
        /* Called if data is valid or `undefined` */
        this.toast.success({detail:"SUCCESS",summary: 'Logout successful' ,duration: 4000});
      this.router.navigate(['/localBrands']);
      },
      error: (error) => {
        /* Called if data is invalid */
        this.toast.error({detail:"ERROR",summary: 'Something went wrong Please try again!' ,duration: 4000});
        console.log(error);
      },          
    });
  }

}
