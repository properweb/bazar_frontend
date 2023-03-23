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

  totalPrice: any = [];

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,private storage: StorageMap, private router: Router,private titleService: Title, private toast: NgToastService ) { }

  ngOnInit(): void {

    this.titleService.setTitle('Cart');
    this.storage.get("user_session").subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.role = user_session.role;
        this.user_id = user_session.id;

      },
      error: (error) => {
        console.log(error);
      },
    });

      let response = JSON.parse(JSON.stringify(responseBody));
      this.cartCount = response.data.cart_count;
      if(this.cartCount == 0) {
        setTimeout(() => {
          this.router.navigateByUrl("/");
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
        }
      });

  }

  deleteCart(id: any) {
    let values = {

    }
    this.apiService.deleteCart(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {

        this.toast.success({detail: 'Cart item removed succesfully',summary: '' ,duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later.",summary: '' ,duration: 4000});
    })
  }

  handleCheckOut(id: any, price: any, brand_name: any, brand_key: any) {

  }

}
