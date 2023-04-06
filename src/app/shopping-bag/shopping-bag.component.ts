import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AfterLoginHeaderComponent } from '../after-login-header/after-login-header.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent implements OnInit {

  @ViewChild(AfterLoginHeaderComponent) afterLoginHeaderComp!:AfterLoginHeaderComponent;

  user_id!: any;
  role!: any;
  cartDetails!: any;
  cartCount!: any;
  quantity!: any;
  totalPrice: any = [];

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,private storage: StorageMap, private router: Router,private titleService: Title, private toast: NgToastService ) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
    this.titleService.setTitle('Cart');
    this.storage.get("user_session").subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.role = user_session.role;
        this.user_id = user_session.id;
        this.fetchCart(user_session.id);
      },
      error: (error) => {
        console.log(error);
      },
    });

  }

  fetchCart(user_id: any) {
    let totalPriceArr: any = [];
    this.apiService.fetchCart(user_id).subscribe((responseBody) => { 
      let response = JSON.parse(JSON.stringify(responseBody));
      this.cartCount = response.data.cart_count;
      if(this.cartCount == 0) {
        setTimeout(() => {
        }, 5000);
      }
      this.cartDetails = response.data.cart_arr; 
      response.data.cart_arr.forEach((cartElement: any, cartkey: any) => {
        totalPriceArr[cartkey] = [];
        totalPriceArr[cartkey]['brand_id'] = cartElement.brand_id;
        if(cartElement.products.length > 0) {
          let total = 0;
          cartElement.products.forEach((element: any, key: any) => {
              total += Number(element.product_qty) * Number(element.product_price);
          });
          totalPriceArr[cartkey]['brand_total'] = total;
          this.totalPrice = totalPriceArr;
      this.cartDetails = response.data.cart_arr;
      response.data.cart_arr.forEach((cartElement: any, cartkey: any) => {
          cartElement.products.forEach((element: any, key: any) => {
              let total = Number(element.product_qty) * Number(element.product_price);
              totalPriceArr.push(total);
          });
          
          let total1 = 0;
          totalPriceArr.forEach((element1: any) => {
            total1 = 0;
            total1 += element1;
          });
          this.totalPrice.push(total1); 
        }
      });
  }

  deleteCart(id: any) {
    let values = {
      id: id,
      user_id: this.user_id
    }
    this.apiService.deleteCart(values).subscribe((responseBody) => {
    this.apiService.deleteCart(id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.afterLoginHeaderComp.fetchCart(this.user_id);
        this.fetchCart(this.user_id);
        this.toast.success({detail: 'Cart item removed succesfully',summary: '' ,duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later.",summary: '' ,duration: 4000});
    })
  }

  handleCheckOut(id: any, price: any, brand_name: any, brand_key: any) {
    let values = {
      price: price,
      brand_name: brand_name,
      brand_key: brand_key
  handleCheckOut(id: any, price: any, brand_name: any) {
    let values = {
      price: price,
      brand_name: brand_name
    }
    this.router.navigate(['checkout/' + id], {
      state:{
        price: values
      }
    });
  }

  onQtyChange(event: any, item: any, index: any) {
    item.product_qty = Number(event.target.value);
    let totalPriceArr: any = [];
    this.cartDetails.forEach((cartElement: any, cartkey: any) => {
      totalPriceArr[cartkey] = [];
      totalPriceArr[cartkey]['brand_id'] = cartElement.brand_id;
      if(cartElement.products.length > 0) {
        let total = 0;
        cartElement.products.forEach((element: any, key: any) => {
            total += Number(element.product_qty) * Number(element.product_price);
        });
        totalPriceArr[cartkey]['brand_total'] = total;
        this.totalPrice = totalPriceArr;
      }
    });
  }

}
