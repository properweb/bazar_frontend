import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-shopify',
  templateUrl: './product-shopify.component.html',
  styleUrls: ['./product-shopify.component.css']
})
export class ProductShopifyComponent implements OnInit {

  api_key !: any;
  api_password !: any;
  store_url !: any;
  spinnerShow: boolean = false;
  user_id!:any;
  errorMsg !: any;
  successMsg !: any;
  constructor(private storage: StorageMap , private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}

    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
      },
      error: (error) => {
        console.log(error);
      },          
    });
  }


  shopifyConnect(shopifyConnectForm:any) {
    this.spinnerShow = true;
    this.apiService.importShopify(shopifyConnectForm.value.user_id, shopifyConnectForm.value.api_key,shopifyConnectForm.value.api_password,shopifyConnectForm.value.store_url).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res === false) {
        this.errorMsg=response.msg;
        this.spinnerShow = false;
        shopifyConnectForm.resetForm();
      } else {
        let values = {
          user_id: this.user_id,
          added_product: '1'
        }
        this.apiService.updateVendorDetails(values).subscribe((responseBody) => {
        })
        this.errorMsg= '';
        this.successMsg = response.msg;
        this.spinnerShow = false;
        shopifyConnectForm.resetForm();
      }
      
    }, (error: any) => {
      this.errorMsg="Something went wrong! please try again!";
      this.spinnerShow = false;
    })
  }

}
