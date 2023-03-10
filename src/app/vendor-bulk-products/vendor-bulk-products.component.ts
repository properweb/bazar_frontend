import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import * as _ from 'lodash';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-bulk-products',
  templateUrl: './vendor-bulk-products.component.html',
  styleUrls: ['./vendor-bulk-products.component.css']
})

export class VendorBulkProductsComponent implements OnInit {

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
           
  constructor( private storage: StorageMap , private apiService : ApiService , private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
    
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

  uploadBulk() {
    this.disBtn = true;
    const formData = new FormData();
    formData.append("user_id",this.user_id);
      formData.append("upload_bulk_xlsx", this.upload_bulk_xlsx);
    for (var i = 0; i < this.product_images.length; i++) { 
      formData.append("product_images[]", this.product_images[i]);
    }
    this.apiService.bulkUpload(formData).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.toast.success({detail:"SUCCESS",summary: 'Import Successfully.' ,duration: 4000});
        this.upload_bulk_xlsx = null;
        this.bulk_xlsx_names = null;
        this.product_images = [];
        this.previews = [];
        this.img_names = [];
        this.donwloadExistCatalog(this.user_id);
        this.disBtn = false;
      } else {
        this.toast.error({detail:"ERROR",summary: response.msg ,duration: 4000});
      }
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: 'Something went wrong! please try again!' ,duration: 4000});
      this.disBtn = false;
    })

  }

  donwloadExistCatalog(user_id: any) {
    this.apiService.downloadExistCatalog(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.existCatalog = response.data;
    })
  }


}
