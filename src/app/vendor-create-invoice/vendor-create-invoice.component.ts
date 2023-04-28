import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-vendor-create-invoice',
  templateUrl: './vendor-create-invoice.component.html',
  styleUrls: ['./vendor-create-invoice.component.css']
})
export class VendorCreateInvoiceComponent implements OnInit {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  modalReference!: NgbModalRef;
  userSignupModalReference!: NgbModalRef;
  addCustomerModal!: NgbModalRef;
  addCustomItem!: NgbModalRef;
  invoiceProduct!: NgbModalRef;
  custDetAlertModal!: NgbModalRef;
  addPaymentModal!: NgbModalRef;
  custAddDivShow: any = false;
  btnDis: any = false;

  user_id!: any;
  customer_key!: any;
  first_name!: any;
  last_name!: any;
  store_name!: any;
  email!: any;
  shipping_name!: any;
  shipping_country: any = null ;
  shipping_street!: any;
  shipping_suite!: any;
  shipping_state: any = null;
  shipping_town: any = null;
  shipping_phone_code: any = '962';
  shipping_phone!: any;
  shipping_zip!: any;
  countriesArray!: any;
  stateArray!: any;
  cityArray!: any;
  ship_now: any = 1;
  self_note!: any;
  retailer_note!: any;
  custProName!: any;
  custProQty!: any;
  custProPrice!: any;
  bazaar_direct_link!: any;
  setProductVariants!: any;
  setVariationProduct!: any;
  selectedIvoiceProducts: any = [];
  draftSelectedIvoiceProducts: any = [];
  onlySelectedIvoiceProductsId: any = [];
  selectedProducts: any = [];
  subTotal!: any;
  ship_date!: any;
  minDate!: any;
  customerList!: any;
  customerEditShow: boolean = false;
  shipAddAdded: boolean = true;
  is_discount: any = 0;
  disc_amt!: any ;
  disc_amt_type: any = 'amount' ;
  ship_free: any = false ;
  discAmtError!: any;
  varProSearchText!: any;
  promotionObject: any = {};

  constructor(public modalService: NgbModal, private apiService: ApiService, private router: Router, public toast: NgToastService, private storage: StorageMap, public formatter: NgbDateParserFormatter, private activatedRoute: ActivatedRoute) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
   }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getVendorDetails(user_session.id);
        this.fetchCustomers();
      },
      error: (error) => {
      },          
    });
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if(params['customer']) {
        this.getCustomerDetail(params['customer']);
        this.customerEditShow = true;
      }
    })
    this.getCountries();
  }

  keyword = 'name';
  data = [];

  proInvoiceKeyword = 'name';
  proKeyword = 'name';
  // proData = [ 
  //   { id: 1, img: 'assets/images/search-img.png', name: 'Grey plate', sku: 'AA234', stock: 'In stock', price: '$11.70'},
  //   { id: 2, img: 'assets/images/search-img.png', name: 'abcd', sku: 'AA234', stock: 'In stock', price: '$11.70'},
  //   { id: 1, img: 'assets/images/search-img.png', name: 'efgh', sku: 'AA234', stock: 'In stock', price: '$11.70'},
  // ];

  proData: any = [];
  proInvoiceData: any = [];

  fetchCustomers() {
    this.apiService.fetchAllCustomers().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.data = response.data;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
    })
  }

  selectEvent(item:any) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  } 
  
  onFocused(e:any){
    // do something when input is focused
  }

  openUserLogInModal(content: any) {
    this.addCustomerModal = this.modalService.open(content, { windowClass: 'addCustomerModal' });
  }

  openAddCustomitemModal(content: any) {
    this.addCustomItem = this.modalService.open(content, { windowClass: 'addCustomItemModal' });
  }

  openInvoiceProductModal(content: any) {
    this.invoiceProduct = this.modalService.open(content, { windowClass: 'invoiceProductModal' });
  }

  openCustDetAlertModal(content: any) {
    this.custDetAlertModal = this.modalService.open(content, { windowClass: 'custDetAlertModal' });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getVendorDetails(user_id: any) {
    this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if( response.res == true) {
        this.bazaar_direct_link = response.data.bazaar_direct_link;
        this.getProducts();
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
    })
  }

  getProducts() {
    this.apiService.fetchProductsForDropdown().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody)); 
      response?.data.forEach((element: any) => {
        // if(element.stock != '0' || element.stock != 0) {
          this.proInvoiceData.push(element);
          this.proData.push(element);
        // }
      });
    })
  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }

  onChangeCountry(event: any) {
    let countryId = event.target.value;
    this.shipping_state = null;
    this.shipping_town = null;
    let country = this.countriesArray.filter((item: any) => item.id == countryId);
    this.shipping_phone_code = country[0].phone_code;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
    })
  }

  onChangeState(event: any) { 
    let stateId = event.target.value;
    this.shipping_town = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.cityArray = response.data;
    })
  }

  sendAddCustomerForm(addCustomerForm: any) {
    this.btnDis = true;
    this.apiService.createCustomer(addCustomerForm.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.customerEditShow = true;
        this.addCustomerModal.close();
        this.btnDis = false;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.btnDis = false;
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.btnDis = false;
    });
  }

  sendEditCustomerInfoForm(editCustomerInfoForm: any) {
    this.btnDis = true;
    editCustomerInfoForm.value.customer_key = this.customer_key;
    this.apiService.updateCustomerInfo(editCustomerInfoForm.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if( response.res == true) {
        this.customerEditShow = true;
        this.addCustomerModal.close();
        this.btnDis = false;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.btnDis = false;
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.btnDis = false;
    });
  }

  sendEditCustomerShippingForm(editCustomerShippingForm: any) {
    this.btnDis = true;
    editCustomerShippingForm.value.customer_key = this.customer_key;
    this.apiService.updateCustomerShipping(editCustomerShippingForm.value).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if( response.res == true) {
        this.customerEditShow = true;
        this.addCustomerModal.close();
        this.btnDis = false;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.btnDis = false;
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.btnDis = false;
    });
  }
  
  settingVariation(item: any) {
    if(item.variations.length > 0) {
      this.setProductVariants = item.variations;
    }
    this.setVariationProduct = item;
    console.log(this.setProductVariants);
  }

  onAddingInvoiceProduct(item: any) {
    let alreadyExist = 0;
    let newObj = {id: item?.id, variation_id: '', product_key: item?.product_key, featured_image: item?.featured_image, name: item?.name, stock: item?.stock, case_size: 5, quantity: 1, usd_wholesale_price: item?.usd_wholesale_price, total: item?.usd_wholesale_price};
    this.selectedIvoiceProducts.forEach((element: any) => {
      if(JSON.stringify(element.id) === JSON.stringify(newObj.id) && (JSON.stringify(element.variation_id) === JSON.stringify(newObj.variation_id))) {
        alreadyExist = 1;
      }
    });
    if(alreadyExist === 0) {
      this.selectedIvoiceProducts.push(newObj);
    }
    console.log(this.selectedIvoiceProducts);
    this.subTotalCount();
  }

  onVarProChecked(mainItem: any, varItem: any, event: any) {
    let alreadyExist = 0;
    let newObj = {id: mainItem?.id, variation_id: varItem?.variant_id, product_key: mainItem?.product_key, featured_image: varItem?.featured_image, name: mainItem?.name, variation: varItem?.variant, stock: varItem?.stock, case_size: 5, quantity: 1, usd_wholesale_price: varItem?.usd_wholesale_price, total: varItem?.usd_wholesale_price};

    if(event.target.checked) {
      this.selectedIvoiceProducts.forEach((element: any) => {
        if(JSON.stringify(element.id) === JSON.stringify(newObj.id) && (JSON.stringify(element.variation_id) === JSON.stringify(newObj.variation_id))) {
          alreadyExist = 1;
        }
      });
      if(alreadyExist === 0) {
        this.draftSelectedIvoiceProducts.push(newObj);
      }
    } else {
      let varIndex = this.draftSelectedIvoiceProducts.findIndex((item: any) => item?.variation_id === varItem?.variation_id);
      this.draftSelectedIvoiceProducts?.splice(varIndex, 1);
    }
  }

  onAddingProduct(item: any) {
    if(this.selectedProducts.indexOf(item) == -1) {
      this.selectedProducts.push(item);
    }
    console.log(this.selectedProducts);
  }

  deleteSelectedProduct(i: any) {
    this.selectedProducts.splice(i,1);
  }

  onAddCustomeProduct() {
    let alreadyExist = 0;
    let totalCal = this.custProQty * this.custProPrice;
    let newObj = {id: 'new', product_key: 'new', featured_image: '', name: this.custProName, stock: 1, case_size: 5, quantity: this.custProQty, usd_wholesale_price: this.custProPrice, total: totalCal};
    this.selectedIvoiceProducts.forEach((element: any) => {
      if(JSON.stringify(element) === JSON.stringify(newObj)) {
        alreadyExist = 1;
      }
    });
    if(alreadyExist === 0) {
      this.selectedIvoiceProducts.push(newObj);
    }
    console.log(this.selectedIvoiceProducts);
    this.subTotalCount();
    this.custProName = null;
    this.custProQty = null;
    this.custProPrice = null;
  }

  subTotalCount() {
    let total = 0;
    if(this.selectedIvoiceProducts.length > 0) {
      this.selectedIvoiceProducts.forEach((elm: any, key: any) => {
        let total1 = Number(elm.quantity) * Number(elm.usd_wholesale_price);
        total += total1;
      });
      this.subTotal = total;
    }
    console.log("subTotal",this.subTotal);
  }

  onRemoveCustomerDetails() {
    this.first_name = null;
    this.last_name = null;
    this.store_name = null;
    this.email = null;
    this.shipping_name = null;
    this.shipping_country = null;
    this.shipping_street = null;
    this.shipping_suite = null;
    this.shipping_state = null;
    this.shipping_town = null;
    this.shipping_phone_code = '962';
    this.shipping_phone = null;
    this.shipping_zip = null;
    this.customer_key = null;

    this.customerEditShow = false;
    this.custDetAlertModal.close();
  }

  getCustomerDetail(key: any) {
    this.shipping_state = null;
    this.shipping_town = null;

    this.apiService.customerDetail(key).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));

      if(response.res === true) {
        this.customer_key = response.data.customer_key;
        this.email = response.data.email;
        this.first_name = response.data.first_name;
        this.last_name = response.data.last_name;
        this.shipping_street = response.data.shipping_street;
        this.shipping_suite = response.data.shipping_suite;
        this.shipping_country = response.data.shipping_country;
        this.shipping_name = response.data.shipping_name;
        this.shipping_phone_code = response.data.shipping_phone_code ? response.data.shipping_phone_code : '962';
        this.shipping_phone = response.data.shipping_phone;
        this.shipping_zip = response.data.shipping_zip;
        this.shipping_state = response.data.shipping_state;
        this.shipping_town = response.data.shipping_town;
        this.store_name = response.data.store_name;

        if(response.data.shipping_country == null) {
          this.shipAddAdded = false;
        }

        this.apiService.getStates(response.data.shipping_country).subscribe((responseBody1) => {
          let response1= JSON.parse(JSON.stringify(responseBody1));
          this.stateArray = response1.data;
        })

        this.apiService.getCities(response.data.shipping_state).subscribe((responseBody2) => {
          let response2= JSON.parse(JSON.stringify(responseBody2));
          this.cityArray  = response2.data;
        })

      }
    })
  }

  onCustomerSelect(item: any) {
    this.customerEditShow = true;
    this.getCustomerDetail(item?.customer_key);
  }

  onQtyChange(event: any, qty:any, obj: any) {
    let updatedPrice = event.target.value * obj.usd_wholesale_price;
    obj.quantity = Number(event.target.value);
    obj.total = updatedPrice;
    let total = 0;
    // if(this.ordersArray.length > 0) {
      this.selectedIvoiceProducts.forEach((cartElement: any, cartkey: any) => {
        let total1 = Number(cartElement.quantity) * Number(cartElement.usd_wholesale_price);
        total += total1;
      });
      this.subTotal = total;
    // }
    this.subTotalCount();
  }

  onSubmitEmail() {
    this.btnDis = true;
    let values = {
      customer_key: this.customer_key,
      products: this.selectedIvoiceProducts,
      shipping_date: this.formatter.format(this.ship_date),
      self_note: this.self_note,
      recommended_products: this.selectedProducts,
      retailer_note: this.retailer_note,
      promotion_type: this.promotionObject.disc_amt_type,
      promotion_amount: this.promotionObject.disc_amt,
      ship_free: this.promotionObject.ship_free
    }
    if(!this.customer_key) {
      this.toast.error({detail: 'Please add customer.', summary: '', duration: 4000});
      this.btnDis = false;
      return false;
    } else if(this.selectedIvoiceProducts?.length == 0) {
      this.toast.error({detail: 'Please add atleast one invoice product.', summary: '', duration: 4000});
      this.btnDis = false;
      return false;
    } else if( this.ship_now == 0 && (this.ship_date == null || this.ship_date == undefined)) {
      this.toast.error({detail: 'Please add ship date.', summary: '', duration: 4000});
      this.btnDis = false;
      return false;
    } else {
      this.apiService.createBrandInvoice(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if( response.res == true) {
          console.log(values);
          this.toast.success({detail: response.msg, summary: '', duration: 4000});
          this.btnDis = false;
        } else {
          this.toast.error({detail: response.msg, summary: '', duration: 4000});
          this.btnDis = false;
        }
      },(error) => {
        this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
        this.btnDis = false;
      });
      this.btnDis = false;
      return true;
    }
  }

  onDiscountChange(event: any) {
    if(!/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) {
      this.discAmtError = 'This field must be non-negative number & max 9 digits are allowed. After decimal allowed only two digits.';
    } else {
      this.discAmtError = '';
      if(this.disc_amt_type == "amount") {
        // this.ordersArray.forEach((element: any) => {
        //   element.newAmt = Number(element.amount) - Number(event.target.value);
        // });
        // this.newSubTotal = this.orderTotal - Number(event.target.value);
      } else {
        let percentageCal = 0;
        // percentageCal = this.orderTotal * ((100-Number(event.target.value)) / 100);
        // this.newSubTotal = percentageCal.toFixed(2);
      }
      // console.log("this.ordersArray" , this.ordersArray);
    }
    
  }

  onAddVarOptClick() {
    this.draftSelectedIvoiceProducts.forEach((element: any) => {
      this.selectedIvoiceProducts.push(element);
    });
    this.subTotalCount();
    this.draftSelectedIvoiceProducts.forEach((elm: any) => {
      this.onlySelectedIvoiceProductsId.push(elm.variation_id);
    })
  }

  deleteInvoiceSelectedProduct(index: any) {
    this.selectedIvoiceProducts.splice(index, 1);
    this.subTotalCount();
  }

  onPromoApply() {
    if(!this.discAmtError) {
      this.custDetAlertModal.close();
      this.promotionObject.disc_amt_type = this.disc_amt_type;
      this.promotionObject.disc_amt = this.disc_amt;
      this.promotionObject.ship_free = this.ship_free;
      console.log("promotionObject", this.promotionObject);
    }
  }

  openAddPaymentModal(content: any) {
    this.addPaymentModal = this.modalService.open(content, { windowClass: 'addCustomItemModal' });
  }

}
