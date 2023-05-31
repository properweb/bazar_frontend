import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import * as _ from 'lodash';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-vendor-upload-catalog',
  templateUrl: './vendor-upload-catalog.component.html',
  styleUrls: ['./vendor-upload-catalog.component.css']
})
export class VendorUploadCatalogComponent implements OnInit {

  user_id !:any;
  excelError !: any;
  upload_bulk_xlsx !: any ;
  bulk_xlsx_names !: any ;
  img_names: any = [] ;
  existCatalog !: any;
  disBtn !: any;
  product_images: any = [];
  previews: any[] = [];
  selectedFiles: any[] = [];
  imageError!: any;
  addNew: any = false;
  customWebsiteList!: any;
  selectedExistWebsite!: any;
  store_url!: any;
  storeUrlInvalidError!: any;
  productType: any = 'new';
           
  constructor( private storage: StorageMap , private apiService : ApiService , private router: Router, private toast: NgToastService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id; 
        this.donwloadExistCatalog(this.user_id);    
      },
      error: (error) => {
        /* Called if data is invalid */
      },          
    });
    this.fetchCustomWebsite();
  }

  getBulkUploadFiles(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
      if(!_.includes(af, event.target.files[0].type)){
        this.excelError = true;
        setTimeout(() => {
          this.excelError = false;
        }, 3000);
      } else {
        this.upload_bulk_xlsx = event.target.files[0];
        this.bulk_xlsx_names = event.target.files[0].name;
      }
  }

  // upload image       
  getImageUploadFiles(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles.length > 0 ) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        if(event.target.files[i].name.endsWith('.png') || event.target.files[i].name.endsWith('.jpeg') || event.target.files[i].name.endsWith('.jpg')) {
          const reader = new FileReader();
          this.product_images.push(this.selectedFiles[i]);
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);
          this.img_names.push(this.selectedFiles[i].name);
        } else {
          this.imageError = true;
        }
      }
    } else {
    }
  }

  bulkFileDelete() {
    this.upload_bulk_xlsx = null;
    this.bulk_xlsx_names = null;
  }

  imageFileDelete(index:any) {
    this.previews = this.previews.filter((item:any , i:any) => i !== index);
    this.product_images = this.product_images.filter((item:any , i:any) => i !== index);
    this.img_names = this.img_names.filter((item:any , i:any) => i !== index);
  }

  importNewProduct() {
    if(!this.store_url && !this.selectedExistWebsite) {
      this.toast.error({detail: 'Please add Store Url.', summary: "", duration: 4000});
    } else if(!/^(https:\/\/www\.|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(this.store_url) && !this.selectedExistWebsite) {
      this.toast.error({detail: 'Store URL is not valid.', summary: "", duration: 4000});
    } else {
      this.disBtn = true;
      const formData = new FormData();
      formData.append("upload_bulk_xlsx", this.upload_bulk_xlsx);
      if(!this.selectedExistWebsite) {
        formData.append("store_url", this.store_url);
      } else {
        formData.append("store_url", this.selectedExistWebsite);
      }
      this.apiService.customImportProduct(formData).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.toast.success({detail: response.msg, summary: '', duration: 4000});
          this.upload_bulk_xlsx = null;
          this.bulk_xlsx_names = null;
          this.product_images = [];
          this.previews = [];
          this.img_names = [];
          this.store_url = '';
          this.donwloadExistCatalog(this.user_id);
          this.disBtn = false;
        } else {
          this.disBtn = false;
          this.toast.error({detail: response.msg, summary: "", duration: 4000});
        }
      }, (error) => {
        this.toast.error({detail:"Something went wrong! please try again.",summary: '' ,duration: 4000});
        this.disBtn = false;
      })
    }
    

  }

  importExistingProduct() {
    if(!this.store_url && !this.selectedExistWebsite) {
      this.toast.error({detail: 'Please add Store Url.', summary: "", duration: 4000});
    } else if(!/^(https:\/\/www\.|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(this.store_url) && !this.selectedExistWebsite) {
      this.toast.error({detail: 'Store URL is not valid.', summary: "", duration: 4000});
    } else {
      this.disBtn = true;
      const formData = new FormData();
      formData.append("upload_bulk_xlsx", this.upload_bulk_xlsx);
      if(!this.selectedExistWebsite) {
        formData.append("store_url", this.store_url);
      } else {
        formData.append("store_url", this.selectedExistWebsite);
      }
      this.apiService.customImportExistProduct(formData).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.toast.success({detail: response.msg, summary: '', duration: 4000});
          this.upload_bulk_xlsx = null;
          this.bulk_xlsx_names = null;
          this.product_images = [];
          this.previews = [];
          this.img_names = [];
          this.store_url = '';
          this.disBtn = false;
        } else {
          this.disBtn = false;
          this.toast.error({detail: response.msg, summary: "", duration: 4000});
        }
      }, (error) => {
        this.toast.error({detail:"Something went wrong! please try again.",summary: '' ,duration: 4000});
        this.disBtn = false;
      })
    }
    

  }

  donwloadExistCatalog(user_id: any) {
    this.apiService.downloadExistCatalog(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.existCatalog = response.data;
      } else {
        this.disBtn = false;
        this.toast.error({detail: response.msg, summary: "", duration: 4000});
      }
    }, (error) => {
      this.toast.error({detail:"Something went wrong! please try again.",summary: '' ,duration: 4000});
    })
  }

  customExportProduct() {
    let values = {
      store_url: this.selectedExistWebsite
    }
    this.apiService.customExportProduct(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        window.location.href = response.data;
      } else {
        this.disBtn = false;
        this.toast.error({detail: response.msg, summary: "", duration: 4000});
      }
    }, (error) => {
      this.toast.error({detail:"Something went wrong! please try again.",summary: '' ,duration: 4000});
    })
  }

  fetchCustomWebsite() {
    this.appComponent.showSpinner = true;
    this.apiService.fetchCustomWebsite().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.customWebsiteList = response.data;
        this.appComponent.showSpinner = false;
      } else {
        this.disBtn = false;
        this.appComponent.showSpinner = false;
        this.toast.error({detail: response.msg, summary: "", duration: 4000});
      }
    }, (error) => {
      this.toast.error({detail:"Something went wrong! please try again.",summary: '' ,duration: 4000});
      this.disBtn = false;
      this.appComponent.showSpinner = false;
    })
  }

  onStoreUrlChange() {
    if(!/^(https:\/\/www\.|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(this.store_url)) {
      this.storeUrlInvalidError = 'Store URL is not valid.'
    } else {
      this.storeUrlInvalidError = '';
    }
  }


}
