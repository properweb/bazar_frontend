import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-wordpress',
  templateUrl: './product-wordpress.component.html',
  styleUrls: ['./product-wordpress.component.css']
})
export class ProductWordpressComponent implements OnInit {

  consumer_key !: any;
  website_url !: any;
  consumer_secrect_key !: any;
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

  wordpressConnect(wordpressConnectForm:any) {
    this.spinnerShow = true;
    this.apiService.importWordpress(this.user_id, wordpressConnectForm.value.consumer_key,wordpressConnectForm.value.website_url,wordpressConnectForm.value.consumer_secrect_key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res === false) {
        this.errorMsg=response.msg;
        this.successMsg = '';
        this.spinnerShow = false;
      } else {
        let values = {
          user_id: this.user_id,
          added_product: '1'
        }
        this.apiService.updateVendorDetails(values).subscribe((responseBody) => {
        })
        this.errorMsg = '';
        this.successMsg = response.msg;
        this.spinnerShow = false;
        wordpressConnectForm.resetForm();
      }
      
    })
  }

}
