import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-campaigns',
  templateUrl: './vendor-campaigns.component.html',
  styleUrls: ['./vendor-campaigns.component.css']
})
export class VendorCampaignsComponent implements OnInit {

  user_id!: any;
  camp_name!: any;
  campaignList!: any;
  errorMsg!: any;
  errorMsg1!: any;
  createCampaignsModal!: any;
  campDeleteAlertModal!: any;
  campaign_key!: any;
  btnDis: any = false;

  constructor(public modalService: NgbModal, private apiService: ApiService, private storage: StorageMap, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getCampaigns(user_session.id, 'all');
      },
      error: (error) => {
        /* Called if data is invalid */
      },
    });
    this.apiService.createAuthorizationHeader();
  }

  getCampaigns(user_id: any, status:any) {
    this.apiService.fetchCampaigns(user_id, status).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.campaignList = response.data;
      } else {
        this.errorMsg = "";
        this.errorMsg1 = response.msg;
        this.btnDis = false;
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000});
      this.btnDis = false;
    })
  }

  onTabChange(value:any) {
    this.campaignList = [];
    this.getCampaigns(this.user_id, value);
  }
  
  openCreateCampaigns(content:any) {
    this.createCampaignsModal = this.modalService.open(content, { windowClass: 'createCampaignsModal' });
  }

  createCampaign() {
    this.btnDis = true;
    let values= {
      user_id: this.user_id,
      title: this.camp_name
    }
    if(this.camp_name == undefined || this.camp_name == null || this.camp_name == '') {
      this.errorMsg = "Please enter name";
    } else {
      this.apiService.addCampaigns(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.toast.success({detail: 'Added Successfully', summary: '', duration: 4000});
          this.btnDis = false;
          this.getCampaigns(this.user_id, 'all');
          this.createCampaignsModal.close();
          this.errorMsg = "";
          this.errorMsg1 = "";
          this.camp_name = undefined;
        } else {
          this.errorMsg = "";
          this.errorMsg1 = response.msg;
          this.btnDis = false;
        }
      },(error) => {
        this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000});
        this.btnDis = false;
      })

    }
  }

  deleteCampaign() {
    this.apiService.deleteCampaigns(this.campaign_key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.toast.success({detail: 'Deleted Successfully', summary: '', duration: 4000});
        this.getCampaigns(this.user_id, 'all');
      } else {
        this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000});
      this.btnDis = false;
    })
  }

  openCustDetAlertModal(content: any, camp_key: any) {
    this.campaign_key = camp_key;
    this.campDeleteAlertModal = this.modalService.open(content, { windowClass: 'custDetAlertModal' });
  }
  
}
