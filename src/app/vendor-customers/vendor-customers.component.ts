import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import * as _ from "lodash";
import { F } from 'chart.js/dist/chunks/helpers.core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-customers',
  templateUrl: './vendor-customers.component.html',
  styleUrls: ['./vendor-customers.component.css']
})

export class VendorCustomersComponent implements OnInit {

  user_id!: any;
  csvModal!: any;
  lists: any = [];
  store_name!: any;
  contact_name!: any; 
  email_address!: any;
  customerImfomModal!: any;
  errorMsg!: any;
  searchText!: any;
  customerList!: any;
  customerListArray!: any ;
  excelError!: any;
  upload_contact_list!: any;
  upload_contact_list_names!: any;
  btnDis: any = false;
  exportBtnDis: any = false;
  checkedItems:any = [];
  selectAll!:any;
  sort_key:any = 4;
  activeTab: any = 'all';
  currentPage: any = 1;
  customerColoumList:any = ['store name','contact name','email address','on bazar','relationship','source','amount in cart','order amount','last ordered','last order delivered','last contacted','date added','bazar direct credit expiry','order minimum type','account status','account type','invite sent','preferred language','country','email delivery'];
  selectedCustomerColoumList:any = ['store name','contact name','email address','on bazar','relationship','source','amount in cart','order amount'];

  constructor(public modalService: NgbModal,private apiService: ApiService, private storage: StorageMap, private toast: NgToastService, private router: Router ) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}

  constructor(public modalService: NgbModal,private apiService: ApiService, private storage: StorageMap, private toast: NgToastService ) { }

  ngOnInit(): void {
    this.lists.push({"store_name": "","contact_name": "", "email_address": ""},{"store_name":"","contact_name": "", "email_address": ""},{"store_name":"","contact_name": "", "email_address": ""},{"store_name":"","contact_name": "", "email_address": ""}) 

    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.fetchCustomers(user_session.id, 1, 'all', this.searchText, this.sort_key);
      },
      error: (error) => {
      },          
    });
  }
 
  fetchCustomers(user_id: any, currPage: any, status: any, search_key: any, sort_key: any) {
    let items: any = [];
    this.apiService.fetchCustomers(user_id, currPage, status, search_key, sort_key).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.customerList = response.data;
        if(response.data.customers.length > 0) {
          response.data.customers.forEach((element: any) => {
            items.push(element);
          });
        }
        if(items.length > 0) {
          this.customerListArray = items;
        }
      }
    },(error) => {})
  }
  
  productsDropdown(){ 
   	$(".add_products_links").toggleClass("add_products_active");
   	$(".add_products_list").slideToggle();
   }
  
  openExport(content:any) {
    this.customerImfomModal = this.modalService.open(content, { windowClass: 'addCustomerInformation' });
  }
  
  openCsvExport(content:any) {
    this.csvModal = this.modalService.open(content, { windowClass: 'addCsvCustomerInformation' });
  }

  addField() {
    this.lists.push({"store_name": "","contact_name": "", "email_address": ""});
  }

  deleteField(index: any)  {
    this.lists.splice(index,1);
  }

  sendAddContactInformation() {
    this.btnDis = true;
    let values = {
      user_id: this.user_id,
      customers: this.lists
    }
    this.apiService.addCustomers(values).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.btnDis = false;
        this.errorMsg = '';
        this.customerImfomModal.close();
        this.fetchCustomers(this.user_id, 1, 'all', this.searchText, this.sort_key);
        this.lists = [];
        this.lists.push({"store_name": "","contact_name": "", "email_address": ""},{"store_name":"","contact_name": "", "email_address": ""},{"store_name":"","contact_name": "", "email_address": ""},{"store_name":"","contact_name": "", "email_address": ""}) 
        this.toast.success({detail: response.msg, summary: '', duration: 4000})
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000})
    })
  }

  onUploadContactList(event: any) {
    this.btnDis = true;
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    
    if(event.target.files && event.target.files.length > 0) {
      for (var i = 0; i < event.target.files.length; i++) { 
        if(!_.includes(af, event.target.files[i].type)){
          this.excelError = true;
          setTimeout(() => {
            this.excelError = false;
          }, 3000);
        } else {
          const formData = new FormData();
          formData.append("upload_contact_list", event.target.files[0]);
          formData.append("user_id", this.user_id);    
          this.upload_contact_list=event.target.files[0];
          this.upload_contact_list_names=event.target.files[0].name;
          this.apiService.uploadCsvCustomers(formData).subscribe((responseBody) => {
            let response= JSON.parse(JSON.stringify(responseBody));
            if(response.res == true) {
              this.toast.success({detail: response.msg, summary: '', duration: 4000});
              this.btnDis = false;
              this.csvModal.close();
              this.fetchCustomers(this.user_id, 1, 'all', this.searchText, this.sort_key);
            } else {
              this.toast.error({detail: response.msg, summary: '', duration: 4000})
            }
          },(error) => {
            this.btnDis = false;
            this.toast.error({detail: 'Something went wrong. Please try again.', summary: '', duration: 4000})
          })
        }
      }
    }
  }

  onUploadClick(event: any) {
    event.target.value = '';
  }

  showTableList() { 
    $(".table_sort_list").slideToggle();
  }

  onClickedOutside() {
    $(".table_sort_list").css('display', 'none');
  }

  onChecked(item: any, event: any){
    let {checked, value} = event.target;
    if(checked) {
      this.checkedItems.push(value);
    } else {
      let index = this.checkedItems.indexOf(value);
      if (index !== -1) this.checkedItems.splice(index, 1);
    }
  } 

  checkAll(event: any){
    let {checked} = event.target;
    if(checked) {
      this.customerList?.customers.forEach((i:any) => {
        if(this.checkedItems.indexOf(i.customer_key) == -1)  this.checkedItems.push(i.customer_key)
      });
    }else {
    this.checkedItems = [];
    }
  }

  deleteCustomer() {
    if(this.checkedItems?.length > 0) {
      this.btnDis = true;
      let values = {
        customers: this.checkedItems
      };
      this.apiService.deleteCustomer(values).subscribe((responseBody) => {
        let response= JSON.parse(JSON.stringify(responseBody));
        if(response.res === true) {
          this.customerListArray = [];
          this.fetchCustomers(this.user_id, 1, 'all', this.searchText, this.sort_key);
          this.checkedItems = [];
          this.selectAll = false;
          this.btnDis = false;
          this.toast.success({detail: 'Contact deleted succesfully.', summary: '', duration: 4000});
        }else {
          this.btnDis = false;
          this.toast.error({detail: response.msg, summary: '', duration: 4000});
        }
      },(error) => {
        this.btnDis = false;
        this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      })
    } else {
      this.toast.error({detail: "Please select one customer.", summary: '', duration: 4000});
    }
  }

  exportCustomers() {
    this.exportBtnDis = true;
    let values = {
      user_id: this.user_id,
      customers: this.checkedItems
    }
    this.apiService.exportCsvCustomers(values).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res === true) {
        this.checkedItems = [];
        this.selectAll = false;
        this.exportBtnDis = false;
        this.toast.success({detail: 'Contacts exported succesfully.', summary: '', duration: 4000});
        window.location.href = response.data;
      }else {
        this.exportBtnDis = false;
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.exportBtnDis = false;
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
    })
  }

  onSearchPress(event: any) {
    this.customerListArray = [];
    this.fetchCustomers(this.user_id, 1, this.activeTab, this.searchText, this.sort_key);
  }

  onSearchTextChange(event: any) {
    if(event.target.value == '') {
      this.customerListArray = [];
      this.fetchCustomers(this.user_id, 1, this.activeTab, this.searchText, this.sort_key);
    }
  }

  onSortChange(event: any) {
    this.customerListArray = [];
    this.sort_key = event.target.value;
    this.checkedItems = [];
    this.selectAll = false;
    this.currentPage = 1;
    this.fetchCustomers(this.user_id, this.currentPage, this.activeTab, this.searchText, this.sort_key);
  }

  onTabChnage(tab: any) {
    this.customerListArray = [];
    this.checkedItems = [];
    this.selectAll = false;
    this.activeTab = tab;
    this.currentPage = 1;
    this.fetchCustomers(this.user_id, this.currentPage, this.activeTab, this.searchText, this.sort_key);
  }

  onScroll() {
    this.currentPage ++;
    this.fetchCustomers(this.user_id, this.currentPage, this.activeTab, this.searchText, this.sort_key);
  }

  onColumnChange(event: any) {
    const {checked , value} = event.target;
    if(checked) {
      this.selectedCustomerColoumList.push(value);
    } else {
      let index = this.selectedCustomerColoumList.indexOf(value);
      if (index !== -1) this.selectedCustomerColoumList.splice(index, 1);
    }
    console.log(this.selectedCustomerColoumList);
  }



}
