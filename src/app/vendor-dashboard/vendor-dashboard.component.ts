import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit, AfterViewInit {

  user_id !:any;
  first_name !:any;
  products !: any;
  previewed_shop_page !: any;
  added_product !: any;
  go_live!: any;
  goLiveModal!: any;
  isGoliveTrue: any= false;
  verified: any = 1;
  resendBtsDis: any = false;
  goliveBtsDis: any = false;

  constructor(private storage: StorageMap , private apiService : ApiService, public modalService: NgbModal, private toast: NgToastService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        if(user) {
          let user_session = JSON.parse(JSON.stringify(user));
          this.user_id = user_session.id;
          this.first_name = user_session.vendor_data.first_name;
          this.getVendorDetails(this.user_id);
        }

      },
      error: (error) => {
      },          
    });
 
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {
      
    }
  } 

  ngAfterViewInit(): void {
  }


  getVendorDetails(user_id: any) {
    this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));

      this.previewed_shop_page = response.data.previewed_shop_page;
      this.added_product = response.data.added_product;
      this.go_live = response.data.go_live;
      this.verified = response.data.verified;
    }); 
  }
  
  goLiveClick() {
    this.goliveBtsDis = true;
    let values = {
      user_id: this.user_id
    }
    this.apiService.vendorGoLive(values).subscribe((responseBody) => {
      this.getVendorDetails(this.user_id);
      this.isGoliveTrue = true;
      this.goliveBtsDis = false;
      this.goLiveModal.close();
    },(error) => {
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
      this.goliveBtsDis = false;
    }); 
  }

  openGoLiveModal(content: any) {  
    this.goLiveModal = this.modalService.open(content, { windowClass: 'deleteModal' });
  }

  onResendEmailClick() {
    this.resendBtsDis = true;
    this.apiService.resendVerifyEmail(this.user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.toast.success({detail:"Email sended successfully.",summary: "" ,duration: 4000});
        this.resendBtsDis = false;
      }
    },(error) => {
      this.toast.error({detail:"ERROR",summary: "Something went wrong. Please try again!" ,duration: 4000});
      this.resendBtsDis = false;
    })
  }


}
