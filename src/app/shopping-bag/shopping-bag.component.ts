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
  btnDis: any = false;
  cartDetails!: any;
  cartCount!: any;
  quantity!: any;
  qtyError!: any;
  totalPrice: any = [];

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,private storage: StorageMap, private router: Router,private titleService: Title, private toast: NgToastService ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Cart');
    this.storage.get("user_session").subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.role = user_session.role;
        this.user_id = user_session.id;
        this.fetchCart();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchCart() {
    let totalPriceArr: any = [];
    this.apiService.fetchCart().subscribe((responseBody) => { 
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
    },(error) => {
      this.toast.error({detail:"Something went wrong. Please try again!",summary: '' ,duration: 4000});
   })
  }

  deleteCart(id: any) {
    let values = {
      id: id
    }
    this.apiService.deleteCart(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.afterLoginHeaderComp.fetchCart();
        this.fetchCart();
        this.toast.success({detail: 'Cart item removed succesfully',summary: '' ,duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later.",summary: '' ,duration: 4000});
    })
  }

  handleCheckOut(id: any, price: any, brand_name: any, brand_key: any) {
    this.btnDis = true;
    let specificBrand = this.cartDetails.find((item: any) => item.brand_key === id);
    if(this.qtyError) {
      this.btnDis = false;
      this.toast.error({detail:"Inventory must be number and max 6 numbers.",summary: '' ,duration: 4000});
    } else {
      let valuesCart = {
        cart: specificBrand.products
      }
      this.apiService.updateCart(valuesCart).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          let values = {
            price: price,
            brand_name: brand_name,
            brand_key: brand_key
          }
          this.router.navigate(['checkout/' + id], {
            state:{
              price: values
            }
          });
          this.btnDis = false;
          this.afterLoginHeaderComp.fetchCart();
        } else {
          this.btnDis = false;
          this.toast.error({detail:response.msg ,summary: '' ,duration: 4000});
        }
      },(error) => {
        this.btnDis = false;
        this.toast.error({detail:"Something went wrong. please try again later.",summary: '' ,duration: 4000});
      })
      
    }
  }

  onQtyChange(event: any, item: any, index: any) {
    if(event.target.value && !/^[0-9]{0,6}$/.test(event.target.value)) {
      this.qtyError = 'Inventory must be number and max 6 numbers.';
    } else {
      this.qtyError = '';
      item.product_qty = Number(event.target.value);
      let totalPriceArr: any = [];
      let products: any = []; 
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
      let specificBrand = this.cartDetails.findIndex((item: any, cartIndex: any) => cartIndex === index);
      let specificBrdPro = this.cartDetails[specificBrand];
      let specificProArray = specificBrdPro.products.find((arrayItem: any) => arrayItem.id === item?.id);
      let valuesCart = {
        cart: [specificProArray]
      }
      this.apiService.updateCart(valuesCart).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.toast.success({detail:"Cart updated successfully." ,summary: '' ,duration: 4000});
          this.afterLoginHeaderComp.fetchCart();
        } else {
          this.toast.error({detail:response.msg ,summary: '' ,duration: 4000});
        }
      },(error) => {
        this.toast.error({detail:"Something went wrong. please try again later.",summary: '' ,duration: 4000});
      })
    }
  }

}
