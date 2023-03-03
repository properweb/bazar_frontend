import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  addCustomerModal!: NgbModalRef;
  sendEmailModal!: NgbModalRef;
  deleteModal!: NgbModalRef;
  user_id!: any;
  customer_key!: any;
  custDetail!: any;
  cust_email!: any;
  cust_name!: any;
  cust_storename!: any;
  cust_type!: any;
  emailSendDate!: any;
  btnDis: any = false;
  showBcc: any = false;
  
  // For email - variable
  emailSubject!: any;
  emailCc!: any;
  emailBcc!: any;
  emaiTypeOfDate!: any;
  emailDate!: any;
  emailTime!: any;
  emailMessage!: any;
  hoursArray: any = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  minArray: any = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'];
  amPmArray: any = ['am','pm'];

  constructor(public modalService: NgbModal, private apiService: ApiService, private activatedRoute: ActivatedRoute,private storage: StorageMap, private router: Router, private toast: NgToastService ) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}

    this.activatedRoute.params.subscribe((routeParams) => {
      this.storage.get("user_session").subscribe({
        next: (user) => {
          /* Called if data is valid or `undefined` */
          let user_session = JSON.parse(JSON.stringify(user));
          this.user_id = user_session.id;
          this.getCustomerDetail(routeParams['id']);
          this.customer_key = routeParams['id'];
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        },
        error: (error) => {
          /* Called if data is invalid */
          console.log(error);
        },
      });

    })
  }

  openUserLogInModal(content: any) {
    this.addCustomerModal = this.modalService.open(content, { windowClass: 'addCustomerModal' });
  }

  openSendEmailModal(content: any) {
    this.sendEmailModal = this.modalService.open(content, { windowClass: 'addCustomerModal' });
  }

  openDeleteModal(content: any) {
    this.deleteModal = this.modalService.open(content, { windowClass: 'addCustomerModal' });
  }

  getCustomerDetail(key: any) {
    this.apiService.customerDetail(key).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res === true) {
        this.custDetail = response.data;
        this.cust_email = response.data.email;
        this.cust_name = response.data.name;
        this.cust_storename = response.data.store_name;
        this.cust_type = response.data.type;
      }
    })
  }

  sendContactForm(contactForm:any) {
    this.btnDis = true;
    contactForm.value.cust_type = this.cust_type;
    contactForm.value.customer_key = this.customer_key;
    this.apiService.updateCustomer(contactForm.value).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res === true) {
        this.getCustomerDetail(this.customer_key);
        this.btnDis = false;
        this.toast.success({detail: 'Contact updated succesfully.', summary: '', duration: 4000});
        this.addCustomerModal.close();
      } else {
        this.btnDis = false;
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
    })
  }

  onCustTypeChange(event: any) {
    this.cust_type = event.target.value;
  }

  deleteCustomer() {
    this.btnDis = true;
    let values = {
      customers: [this.customer_key]
    };
    this.apiService.deleteCustomer(values).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res === true) {
        this.btnDis = false;
        this.toast.success({detail: 'Contact deleted succesfully.', summary: '', duration: 4000});
        this.deleteModal.close();
        this.router.navigate(['/customers']);
      }else {
        this.btnDis = false;
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
    })
  }

  toggleShowBcc() {
    this.showBcc = !this.showBcc;
  }

  onTypeSendTimeChange(event: any) {
    this.emaiTypeOfDate = event.target.value;
  }

  onSendEmail() {

  }


}
