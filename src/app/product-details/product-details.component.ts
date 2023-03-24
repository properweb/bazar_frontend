import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../services/api.service';
import { EventService } from '@crystalui/angular-lightbox';
import { Title } from '@angular/platform-browser';  
import { AfterLoginHeaderComponent } from '../after-login-header/after-login-header.component';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @ViewChild(AfterLoginHeaderComponent) afterLoginHeaderComp!:AfterLoginHeaderComponent;

  user_id!: any;
  productKey!: any;
  role!: any;
  product_id!: any;
  openSizingTotalQty!: any;
  perPrepackValue!: any;
  productDetail: any = [];
  productVariation: any = [];
  productPrepackArray: any = [];
  relatedProducts: any = [];
  recentlyViewedProducts: any = [];
  productVariationFirst: any = [];
  openSizingArray: any = [];
  option_type: any = [];
  radioBtnValue: any = [];
  colorAvailable:any = false;
  addCrtBtn:any = false;
  addWishBtn:any = false;
  keysComp!: any;
  colorIndex!: any;
  colorName!: any;
  currentUrl!: any;
  quantity!: any;
  items: any;
  custQtyEnable: any = false;
  isCustomQtySelected: any = false;
  pageOfItems!: Array<any>;
  addToBagObject: any = {};
  wishlistId!: any
  wishListModalReference!: NgbModalRef;
  boardsList!: any;

  constructor( private apiService: ApiService, private activatedRoute: ActivatedRoute,private storage: StorageMap, private router: Router,private eventService: EventService, private titleServive: Title, private toast: NgToastService, private appComponent: AppComponent, public modalService: NgbModal) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      this.productKey = routeParams['id'];
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.storage.get("user_session").subscribe({
        next: (user) => {
          let user_session = JSON.parse(JSON.stringify(user));
  
          this.role = user_session.role;
          this.user_id = user_session.id;
          this.getProductDetail(routeParams['id'], user_session.id);
          this.fetchBoards();
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        },
        error: (error) => {
          console.log(error);
        },
      });

    })
    this.currentUrl =this.router.url;
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  imagesSlider = {
    slidesToShow:1,
    slidesToScroll:1,
    fade:true,
    asNavFor: ".thumbs",
    cssEase:'linear',
    infinite: false,
    centerMode: true,
  };

  thumbnailsSlider = {
    slidesToShow:4,
    slidesToScroll:4,
    vertical:true,
    verticalSwiping:true,
    asNavFor:".feedback",
    infinite: false,
    arrows: false,
    focusOnSelect: true,
    draggable: false,
    centerMode: false,
  };
  
  slickInit(e:any) {
  }
  
  breakpoint(e:any) {
  }
  
  afterChange(e:any) {

  }
  
  beforeChange(e:any) {
  }

  getProductDetail(product_id: any, user_id: any) {
    this.appComponent.showSpinner = true;
    this.productVariationFirst = {};
    this.openSizingArray = [];
    this.apiService.fetchProductDetails(product_id, user_id).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.productDetail = response.data;
      this.product_id = response.data.id;
      this.wishlistId = response.data.wishlistId;

      if(response.data.sell_type == '2' ) {        
        if(response.data.variation_options.length > 0) {
          let splitQty = Math.ceil(Number(response.data.min_order_qty / response.data.variation_options.length));
          response.data.variation_options.forEach((element:any, key: any) => {
            if(element.name == 'Size') {
              element.options.forEach((element1: any) => {
                this.openSizingArray.push({value: element1, qty: splitQty});
              });
            }
          });
        }
      }

      // Removing 'Size' from options if prepacks available
      if(response.data.prepacks.length > 0 ) {        
        let firstPrepackOption = response.data.prepacks[0];
        let calPerPrepackValue = firstPrepackOption.size_ratio.split('-');
        let totalPrepack = 0;
        calPerPrepackValue.forEach((element: any) => {
          totalPrepack += Number(element);
        });
        this.perPrepackValue = totalPrepack;
      }
      this.totalOpenSizingQty();
      if(response.data.variation_options.length > 0 ) {
        this.productVariation = Object.keys(response.data.variations);
        let firstObject = response.data.variations[Object.keys(response.data.variations)[0]];
        this.productVariationFirst = firstObject;
        this.addToBagObject = { product_id: response.data.id, variant_id: firstObject.variant_id, price: firstObject.wholesale_price, quantity: 1};
        if(response.data.min_order_qty != 'undefined') {
          let int = Number(response.data.min_order_qty);
          let qty = int + Number(response.data.case_quantity*0);
          this.addToBagObject = { product_id: response.data.id, variant_id: firstObject.variant_id, price: firstObject.wholesale_price, quantity: qty};
        }

        if(response.data.prepacks.length > 0 ) {
          this.productPrepackArray = response.data.prepacks;
          this.addToBagObject = { product_id: response.data.id, variant_id: firstObject.variant_id, prepack_id: response.data.prepacks[0].id, price: response.data.prepacks[0].wholesale_price, quantity: 1, variationWishId: response.data.prepacks[0].variationWishId};
        }
        this.radioBtnValue = [];
        response.data.variation_options.forEach((element: any) => {
          this.radioBtnValue.push(element.options[0]);
          if(element.name == 'Color'){                     
            this.colorAvailable = true;
            this.colorName = element.options[0];           
          } else {
            this.option_type = response.data.option_type ;
          }
         });

         response.data.options.forEach((element: any, index: any) => {           
          if(element == 'Color'){ 
            this.colorIndex = index;
          }
         })
      } else {
        if(response.data.min_order_qty != 'undefined') {
          let int = Number(response.data.min_order_qty);
          let qty = int + Number(response.data.case_quantity*0);
          this.addToBagObject = { product_id: response.data.id, variant_id: '', price: response.data.usd_wholesale_price, quantity: qty};
        } else {
          this.addToBagObject = { product_id: response.data.id, variant_id: '', price: response.data.usd_wholesale_price, quantity: 1};
        }
      }
      this.relatedProducts = response.data.related_products;
      this.recentlyViewedProducts = response.data.rcntviwd_produtcs;
      this.titleServive.setTitle(response.data.name);
      this.appComponent.showSpinner = false;
    })
  }

  fetchBoards() {
    this.apiService.fetchBoards().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.boardsList = response.data;
      } else {
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
       this.toast.error({detail:"Something went wrong. Please try again!",summary: '' ,duration: 4000});
    })
  }

  orderQtyCounter(i: number) {
    return new Array(i);
  }

  orderQtyText(minQty: any, caseQty: any, index: any, wsPrice: any) {
    if(wsPrice != undefined) {
      let int = Number(minQty);
      let qty = int + (caseQty*index);
      let price = qty* Number(wsPrice);
      return qty + '($'+ price +')';
    } else {
      let int = Number(minQty);
      let qty = int + (caseQty*index);
      return qty;
    }

  }

  orderQtyText1(minQty: any, caseQty: any, index: any, wsPrice: any) {
    if(wsPrice != undefined) {
      let int = Number(minQty);
      let qty = int + (caseQty*index);
      let price = qty* Number(wsPrice);
      if(index > 9) {
        return 'Custom quantity';
      } else {
        return qty + '($'+ price +')';
      }
    } else {
      let int = Number(minQty);
      let qty = int + (caseQty*index);
      if(index > 9) {
        return 'Custom quantity';
      } else {
        return qty;
      }
    }
  
  }

  orderPreQtyText1() {
    
  }

  orderQtyNumber(minQty: any, caseQty: any, index: any, wsPrice: any) {
    let int = Number(minQty);
    let qty = int + (caseQty*index);
    return qty ;
  }

  orderQtyNumber1(minQty: any, caseQty: any, index: any, wsPrice: any) {
    let int = Number(minQty);
    let qty = int + (caseQty*index);
    // if(index > 9) {
    //   this.custQtyEnable = true;
    //   return 'Custom quantity';
    // } else {
      return qty;
    // }
  }

  onColorChange(event: any) {
    this.colorName = event.target.value;
    this.radioBtnValue[this.colorIndex]=event.target.value;
    let keysComp = this.radioBtnValue.join('_');

    Object.keys(this.productDetail.variations).forEach(key => {
      if(key == keysComp ) {
        this.productVariationFirst = this.productDetail.variations[key];
        this.addToBagObject.variant_id = this.productVariationFirst.variant_id;
        this.addToBagObject.price = this.productVariationFirst.wholesale_price;
      }      
    });
  }

  onVariationChange(event: any) {
    let keysComp = this.radioBtnValue.join('_');
    Object.keys(this.productDetail.variations).forEach(key => {
      if(key == keysComp ) {
        this.productVariationFirst = this.productDetail.variations[key];
        this.addToBagObject.variant_id = this.productVariationFirst.variant_id;
        this.addToBagObject.price = this.productVariationFirst.wholesale_price;
      }      
    });
  }

  onQtyChange(event: any) {
    if(event.target.value == 11 || event.target.value == '11') {
      this.custQtyEnable = true;
    }
    // this.addToBagObject = { user_id: this.user_id, product_id: this.product_id, variant_id: this.productVariationFirst.variant_id, price: this.productVariationFirst.wholesale_price, quantity: event.target.value};
    this.addToBagObject.quantity = Number(event.target.value);
  }

  onQtyCustChange(event: any) {
    this.addToBagObject = { product_id: this.product_id, variant_id: this.productVariationFirst.variant_id, price: this.productVariationFirst.wholesale_price, quantity: Number(event.target.value)};
    this.custQtyEnable = false;
  }

  onQtyChange1(event: any) {
    // if(event.target.value == 'Custom quantity') {
    //   this.isCustomQtySelected = true;

    // } else {
      this.isCustomQtySelected = false;
      this.addToBagObject = { product_id: this.product_id, variant_id: this.productVariationFirst.variant_id, price: this.productVariationFirst.wholesale_price, quantity: event.target.value};
    // }
  }

  onPrepackChange(event: any) {
    let firstPrepackOption:any;
    this.productDetail.prepacks.forEach((e: any) => {
      if(e.id == event.target.value) {
        firstPrepackOption = e;
      }
    });
    let calPerPrepackValue = firstPrepackOption.size_ratio.split('-');
    let totalPrepack = 0;
    calPerPrepackValue.forEach((element: any) => {
      totalPrepack += Number(element);
    });
    this.perPrepackValue = totalPrepack;
    this.addToBagObject.prepack_id = event.target.value; 
  }

  addToBag() {
    this.addCrtBtn = true;
    let addToBagObjectString;
    if(this.productDetail.sell_type == '2') {
      this.addToBagObject.quantity = this.openSizingTotalQty;
      this.addToBagObject.openSizingArray = this.openSizingArray;
      addToBagObjectString = this.addToBagObject ;
    } else {
      addToBagObjectString = this.addToBagObject;
    }

    this.apiService.addToCart(addToBagObjectString).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.toast.success({detail:"Product added to cart.",summary: '' ,duration: 4000});
        this.afterLoginHeaderComp.fetchCart();
        this.addCrtBtn = false;
      } else {
        this.toast.error({detail:response.msg,summary: '' ,duration: 4000});
        this.addCrtBtn = false;
      }

    },(error) => {
      this.addCrtBtn = false;
      this.toast.error({detail:"Something went wrong. please try again later.",summary: '' ,duration: 4000});
    })

  }

  addToWishlist() {
    this.addWishBtn = true;
    let addToBagObjectString;
    if(this.productDetail.sell_type == '2') {
      this.addToBagObject.quantity = this.openSizingTotalQty;
      this.addToBagObject.openSizingArray = this.openSizingArray;
      addToBagObjectString = this.addToBagObject ;
    } else {
      addToBagObjectString = this.addToBagObject;
    };

    this.apiService.addToWishlist(addToBagObjectString).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.getProductDetail(this.productKey, this.user_id);
        this.toast.success({detail:"Product added to wishlist.",summary: '' ,duration: 4000});
        this.addWishBtn = false;
      } else {
        this.toast.error({detail:response.msg,summary: '' ,duration: 4000});
        this.addWishBtn = false;
      }

    },(error) => {
      this.addWishBtn = false;
      this.toast.error({detail:"Something went wrong. please try again later.",summary: '' ,duration: 4000});
    })

  }

  removeWishlist(wish_id: any) {
    this.addWishBtn = true;
    let values = {
      id: wish_id
    }
    this.apiService.deleteWishlist(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.getProductDetail(this.productKey, this.user_id);
        this.fetchBoards();
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
        this.addWishBtn = false;
      } else {
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
        this.addWishBtn = false;
      }
    },(error) => {
      this.addWishBtn = false;
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

  totalOpenSizingQty() {
    let sum = 0;
    for (let i = 0; i < this.openSizingArray.length; i++) {
      sum += this.openSizingArray[i].qty;
    }
    this.openSizingTotalQty = sum;
  }

  openSizingTotalQtyInc(obj: any, quantity: any) {
    obj.qty = quantity + 1;
    this.totalOpenSizingQty();
  }

  openSizingTotalQtyDec(obj: any, quantity: any) {
    obj.qty = quantity - 1;
    this.totalOpenSizingQty();
  }

  onOpenSizeChange(obj: any, event: any) {
    obj.qty = Number(event.target.value);
    this.totalOpenSizingQty();
  }

  onCustomeQtyClick() {
    alert(1);
  }

  openWishListModal(content: any) {
    this.wishListModalReference = this.modalService.open(content, { windowClass: 'wishListBoardmodal' });
  }

  onSelectBoard(event: any) {
    this.addToBagObject.board_id = event.target.value;
    let addToBagObjectString = this.addToBagObject;
    this.apiService.addToWishlist(addToBagObjectString).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.wishListModalReference.close();
        this.getProductDetail(this.productKey, this.user_id);
        this.fetchBoards();
        this.toast.success({detail:"Product added to wishlist.",summary: '' ,duration: 4000});
        this.addWishBtn = false;
      } else {
        this.toast.error({detail:response.msg,summary: '' ,duration: 4000});
        this.addWishBtn = false;
      }

    },(error) => {
      this.addWishBtn = false;
      this.toast.error({detail:"Something went wrong. please try again later.",summary: '' ,duration: 4000});
    })
  }

  specialProductTwoArray:any = [
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    },
    {
      brandImgName: "assets/images/after-login-product-band-img.png",
      brandTitleName: "Star Seller",
      priceText: "80$ minimum",
      discountText: "Up to 30% off  + free shipping"
    }
  ]

  specialProductOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    margin: 20,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2,
        slideBy: 2
      },
      740: {
        items: 3,
        slideBy: 3
      },
      940: {
        items: 4,
        slideBy: 4
      }
    },
    nav: true
  }

}
