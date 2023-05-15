import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-promotions',
  templateUrl: './vendor-promotions.component.html',
  styleUrls: ['./vendor-promotions.component.css']
})
export class VendorPromotionsComponent implements OnInit {
  
  user_id!: any;
  promotionList!: any;

  constructor(private router: Router, private storage: StorageMap, private apiService: ApiService, private toast: NgToastService, private appComponent: AppComponent ) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.fetchPromotions(user_session.id);
      },
      error: (error) => {
      },          
    });
  }

  newPromoDropdown(){
  	$(".newPromotionLink").toggleClass("new_romotion_active");
	  $(".createPromotionsList").slideToggle();
  }

  productsDropdown(){ 
    $(".createPromotionsLink").toggleClass("add_products_active");
    $(".createPromotionsList").slideToggle();
  }

  fetchPromotions(user_id:any) {
    this.appComponent.showSpinner = true;
    this.apiService.fetchPromotions(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.promotionList = response.data;
      this.appComponent.showSpinner = false;   
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.appComponent.showSpinner = false;   
    })
  }


}
