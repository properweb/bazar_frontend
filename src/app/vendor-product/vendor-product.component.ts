import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.css']
})
export class VendorProductComponent implements OnInit {
  user_id !:any;
  allDetails !:any;
  first_name !:any;
  products : any = [];
  searchText !: any;
  publishSearchText !: any;
  unpublishSearchText !: any;
  publishedProduct !: any;
  unPublishedProduct !: any;
  checkedItems: any = [];
  selectAll!:any;
  publishModal!: NgbModalRef;
  unPublishModal!: NgbModalRef;
  deleteModal!: NgbModalRef;
  sort_key:any = 3;
  showLoader: any = false;
  btnDis: any = false;
  currentPage: any = 1;
  proStatus: any = 'all';
  
  constructor(public modalService: NgbModal, private storage: StorageMap , private apiService : ApiService , private router: Router, private appComponent: AppComponent, private toast: NgToastService) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
    
    if(localStorage.getItem('searchkey') != null && localStorage.getItem('searchkey') != undefined) {
      this.searchText = localStorage.getItem('searchkey');
    }

    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.first_name = user_session.vendor_data.first_name;
        this.getProducts(this.user_id, this.sort_key, 1, 'all', this.searchText);
      
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });

  }


  openPublishModal(content: any) {  
  this.publishModal = this.modalService.open(content, { windowClass: 'publishModal' });
}

  openUnPublishModal(content: any) {  
  this.unPublishModal = this.modalService.open(content, { windowClass: 'unPublishModal' });
}

  openDeleteModal(content: any) {  
    this.deleteModal = this.modalService.open(content, { windowClass: 'deleteModal' });
  }

  getProducts(user_id:any, sort_key: any, currPage: any, status: any, search_key: any) {
    this.apiService.getSortProducts(user_id, sort_key, currPage, status, search_key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.allDetails = response.data; 
        if(response.data.products.length > 0) {
          response.data.products.forEach((element: any) => {
          this.products.push(element);
          });
        }
      this.publishedProduct = this.products.filter((item:any) => item.status === "publish");
      this.unPublishedProduct = this.products.filter((item:any) => item.status === "unpublish");
      this.appComponent.showSpinner = false;
    })
    
  }
    
  openExport(content:any) {
    this.modalService.open(content, { windowClass: 'exportModal' }); 
  }

  navigateTo(e:any) {
    if (e.target.value) {
        this.router.navigate([e.target.value]);
    }
    return false;
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
    let {checked, value} = event.target;
    if(checked) {
      this.products.forEach((i:any) =>  this.checkedItems.push(i.id));
    }else {
    this.checkedItems = [];
    }
  }

  onPublishClick() {
    this.btnDis = true;
    let value = this.checkedItems.join(',');
    this.apiService.updateProduct(value , 'publish').subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.products = [];
        this.currentPage = 1; 
        this.searchText = '';
        this.getProducts(this.user_id, this.sort_key, this.currentPage, this.proStatus, this.searchText);
        this.checkedItems = [];
        this.selectAll = false;
        this.toast.success({detail:"SUCCESS",summary: 'Product published successfully.' ,duration: 4000});
        this.publishModal.close();
        this.btnDis = false;
      } else {
        this.toast.error({detail:"Missing required fields.",summary: '' ,duration: 4000});
        this.btnDis = false;
        this.publishModal.close();
      }

    }, (error) => {
      this.toast.error({detail:"ERROR",summary: 'Something went wrong. please try again later!' ,duration: 4000});
      this.btnDis = false;
    })
  }

  onUnPublishClick() {
    this.btnDis = true;
    let value = this.checkedItems.join(',');
    this.apiService.updateProduct(value , 'unpublish').subscribe((responseBody) => {
      this.products = [];
      this.currentPage = 1; 
      this.searchText = '';
      this.getProducts(this.user_id, this.sort_key,this.currentPage, this.proStatus, this.searchText);
      this.checkedItems = [];
      this.selectAll = false;
      this.btnDis = false;
      this.unPublishModal.close();
      this.toast.success({detail:"SUCCESS",summary: 'Product unpublished successfully.' ,duration: 4000});
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: 'Something went wrong. please try again later!' ,duration: 4000});
      this.btnDis = false;
    })
  }

  onDeleteClick() {
    this.btnDis = true;
    let value = this.checkedItems.join(',');
    this.apiService.deleteProduct(value).subscribe((responseBody) => {
      this.products = [];
      this.currentPage = 1; 
      this.searchText = '';
      this.getProducts(this.user_id, this.sort_key,this.currentPage, this.proStatus, this.searchText);
      this.checkedItems = [];
      this.selectAll = false;
      this.btnDis = false;
      this.deleteModal.close();
      this.toast.success({detail:"SUCCESS",summary: 'Product deleted successfully.' ,duration: 4000});
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: 'Something went wrong. please try again later!' ,duration: 4000});
      this.btnDis = false;
    })

  }

  onSortChange(event: any) {
    this.products = [];
    this.currentPage = 1; 
    this.sort_key = event.target.value;
    this.getProducts(this.user_id, event.target.value,this.currentPage, this.proStatus, this.searchText);
  }

  syncShopify(id: any, website: any) {
    this.appComponent.showSpinner = true;
    this.apiService.syncToShopify(id,this.user_id,website).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.toast.success({detail:"SUCCESS",summary: response.msg ,duration: 4000});
      this.appComponent.showSpinner = false;
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: 'Something went wrong. please try again later!' ,duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

  syncToWordpress(id: any, website: any) {
    this.appComponent.showSpinner = true;
    this.apiService.syncToWordpress(id,this.user_id,website).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.toast.success({detail:"SUCCESS",summary: response.msg ,duration: 4000});
      this.appComponent.showSpinner = false;
    }, (error) => {
      this.toast.error({detail:"ERROR",summary: 'Something went wrong. please try again later!' ,duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

  onScroll() {
    this.currentPage ++;
    this.getProducts(this.user_id, this.sort_key,this.currentPage, this.proStatus, this.searchText);
  }

  tabAllClick() {
    this.checkedItems = [];
    this.selectAll = false;
    this.products = [];
    this.currentPage = 1;
    this.proStatus = 'all';
    this.searchText = '';
    this.getProducts(this.user_id, this.sort_key,this.currentPage, this.proStatus, this.searchText);
  }

  tabPublishClick() {
    this.checkedItems = [];
    this.selectAll = false;
    this.products = [];
    this.currentPage = 1;
    this.proStatus = 'publish';
    this.searchText = '';
    this.getProducts(this.user_id, this.sort_key,this.currentPage, 'publish', this.searchText);
  }

  tabUnPublishClick() {
    this.checkedItems = [];
    this.selectAll = false;
    this.products = [];
    this.currentPage = 1;
    this.proStatus = 'unpublish';
    this.searchText = '';
    this.getProducts(this.user_id, this.sort_key,this.currentPage, 'unpublish', this.searchText);
  }

  onSearchPress(event: any) {
    localStorage.setItem('searchkey', event.target.value);
    this.products = [];
    this.currentPage = 1;
    this.getProducts(this.user_id, this.sort_key,this.currentPage, this.proStatus , this.searchText);
  }

  onSearchTextChange(event: any) {
    if(event.target.value == '') {
      localStorage.removeItem('searchkey');
      this.products = [];
      this.currentPage = 1;
      this.getProducts(this.user_id, this.sort_key,this.currentPage, this.proStatus , this.searchText);
    }
  }
  

  onResetClick() {
    this.searchText = '';
    this.products = [];
    this.currentPage = 1;
    this.getProducts(this.user_id, this.sort_key,this.currentPage, this.proStatus , this.searchText);
  }

}
