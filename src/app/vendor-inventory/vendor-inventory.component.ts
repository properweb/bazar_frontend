import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-inventory',
  templateUrl: './vendor-inventory.component.html',
  styleUrls: ['./vendor-inventory.component.css']
})
export class VendorInventoryComponent implements OnInit {

  user_id!: any;
  products!: any;
  productsArray: any = [];
  products: any = [];
  inStockProducts: any = [];
  outOfStockProducts: any = [];
  itemQuantity: number = 0;
  searchText!: any;
  stockSearchText!: any;
  outOfStockSearchText!: any;
  showLoader: any = false;
  Quantity!: any;
  currentPage: any = 1;
  allDetails!: any;
  status: any = 'all';

  constructor(public modalService: NgbModal,private storage: StorageMap , private apiService : ApiService, private appComponent: AppComponent, private router: Router ) { }

  ngOnInit(): void {


  constructor(public modalService: NgbModal,private storage: StorageMap , private apiService : ApiService, private appComponent: AppComponent ) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        // console.log("user-id =>" ,user_session.id);
        this.getProducts(this.user_id, 1, 'all', this.searchText);
      
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });

  }

  getProducts(user_id:any, currentPage: any,status: any ,search_key: any) {
    this.apiService.getInventoryProducts(user_id,currentPage,status, search_key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.allDetails = response.data; 
      if(response.data.products.length > 0) {
        response.data.products.forEach((element: any) => {
          this.productsArray.push(element);
        });
      }
      this.products = this.productsArray;
          this.products.push(element);
        });
      }
      this.products.forEach((element: any) => {
        element.name = element.name.replace(/\\/g, '');
        element.stock = parseInt(element.stock);

        if(element.stock > 0) {
          this.inStockProducts.push(element);
        } else {
          this.outOfStockProducts.push(element);
        }
      });
      this.appComponent.showSpinner = false;

    })
  }

  openExport(content:any) {
    this.modalService.open(content, { windowClass: 'exportModal' });
  }
  
  minus(productId: any , productVariantId: any, productStock:any, productObj: any) { 
    this.inStockProducts = [];
    this.outOfStockProducts = [];
    productStock = productStock - 1 ;
    let values = {
      id: productId, 
      variant_id: productVariantId, 
      stock: productStock
    };
    productObj.stock = productStock;
    this.apiService.updateStock(values).subscribe((responseBody) => {
    })
  }
   
  plus(productId: any,productVariantId: any, productStock:any, productObj: any) { 
    this.inStockProducts = [];
    this.outOfStockProducts = [];
    productStock = productStock + 1 ;
    let values = {
      id: productId,
      variant_id: productVariantId, 
      stock: productStock
    };
    productObj.stock = productStock;
    this.apiService.updateStock(values).subscribe((responseBody) => {
    })
  }

  onStockChange(productId: any,productVariantId:any, productStock:any, productObj: any) {
    this.inStockProducts = [];
    this.outOfStockProducts = [];
    let values = {
      id: productId,
      variant_id: productVariantId, 
      stock: productStock.target.value
    };
    productObj.stock = productStock.target.value;
    this.apiService.updateStock(values).subscribe((responseBody) => {
   
    })
  }

  onScroll() {
    this.currentPage ++;
    this.getProducts(this.user_id,  this.currentPage, this.status, this.searchText);
  }

  onSearchPress() {

    this.products = [];
    this.currentPage = 1;
    this.getProducts(this.user_id, this.currentPage, this.status, this.searchText);
  }

  onSearchTextChange(event: any) {
    if(event.target.value == '') {
      this.productsArray = [];
      this.products = [];
      this.currentPage = 1;
      this.getProducts(this.user_id, this.currentPage, this.status, this.searchText);
    }
  }

  tabAllClick() {
    this.currentPage = 1;
    this.productsArray = [];
    this.products = [];
    this.status = 'all';
    this.searchText = '';
    this.getProducts(this.user_id, this.currentPage, this.status, this.searchText);
  }

  tabInstockClick() {
    this.currentPage = 1;
    this.productsArray = [];
    this.products = [];
    this.status = 'instock';
    this.searchText = '';
    this.getProducts(this.user_id, this.currentPage, this.status, this.searchText);
  }

  tabOutOfStockClick() {
    this.currentPage = 1;
    this.productsArray = [];
    this.products = [];
    this.status = 'outofstock';
    this.searchText = '';
    this.getProducts(this.user_id, this.currentPage, this.status, this.searchText);
  }

  onResetClick() {
    this.searchText = '';
    this.productsArray = [];
    this.products = [];
    this.currentPage = 1;
    this.getProducts(this.user_id, this.currentPage, this.status, this.searchText);
  }

}
