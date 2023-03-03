import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-new-promotions',
  templateUrl: './vendor-new-promotions.component.html',
  styleUrls: ['./vendor-new-promotions.component.css']
})
export class VendorNewPromotionsComponent implements OnInit {
  @ViewChild('datepicker') myRangeInput!: any;
  @ViewChild('autoComId') autoComId!: any;

  user_id!: any;
  type!: any;
  title!: any;
  from_date!: any;
  to_date!: any;
  promotion_to: any = 1;
  promotion_country!: any;
  promotion_tier: any = 1;
  promotion_offer_type: any = 1;
  order_amount!: any;
  discount_amount!: any;
  offer_free_shipping: any = true;
  btnDis: any = false;
  promotionCountryArry!: any;
  promoCountrySelected: any = [];
  selectedProducts: any = [];
  checkedItems: any = [];
  setProductVariants!: any;
  hoveredDate: NgbDate | null = null;
  fromDate!: any;
  toDate!: any;
  invoiceProduct!: any;
  proKeyword = 'name';
  proData = [ 
    { id: 1, img: 'assets/images/search-img.png', name: 'Grey plate', sku: 'AA234', stock: 'In stock', price: '$11.70' , variations: []},
    { id: 2, img: 'assets/images/search-img.png', name: 'abcd', sku: 'AA234', stock: 'In stock', price: '$11.70', variations: [
      {id: 2, variation_id: 111, img: 'assets/images/search-img.png', name: '7Up Drink 150mL (12 Pieces) ', sku: 'AA234', stock: 'In stock', price: '$11.70' },
      {id: 2, variation_id: 222, img: 'assets/images/search-img.png', name: '7Up Drink 150mL (50 Pieces) ', sku: 'AA234', stock: 'In stock', price: '$11.70' },
      {id: 2, variation_id: 333, img: 'assets/images/search-img.png', name: '7Up Drink 150mL (100 Pieces) ', sku: 'AA234', stock: 'In stock', price: '$11.70' },
    ]},
    { id: 3, img: 'assets/images/product-img.jpeg', name: 'Test', sku: 'AA234', stock: 'In stock', price: '$11.70', variations: [1]},
  ];

  constructor(private apiService: ApiService, private storage: StorageMap, private router: Router, private activatedRoute: ActivatedRoute, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,public modalService: NgbModal, public toast: NgToastService ) {
    this.fromDate = null
    this.toDate = null
  }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
      },
      error: (error) => {
      },          
    });
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.type = params.get('type') || '';
    })
    this.getPromotionCountries();

    

  }

  getPromotionCountries() {
    this.apiService.getPromotionCountry().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.promotionCountryArry = response.data;
    })
  }

  promoCountryChange(e: any) {
    if (e.target.checked) {
      this.promoCountrySelected.push(e.target.value);
    } else {
      this.promoCountrySelected = this.promoCountrySelected.filter((item:any) => item !== e.target.value);
    }
  }

  addPromotion() {
    this.btnDis = true;
    let sepByComma = this.promoCountrySelected.join(',');
    let values = {
      brand_id: this.user_id,
      title: this.title,
      type: this.promotion_to,
      country: sepByComma,
      tier: this.promotion_tier,
      discount_type: this.promotion_offer_type,
      ordered_amount: this.order_amount,
      discount_amount: this.discount_amount,
      from_date: this.formatter.format(this.fromDate),
      to_date: this.formatter.format(this.toDate),
      free_shipping: this.promotion_offer_type == 3 ? true : this.offer_free_shipping,
      products: []
    }
    console.log(this.fromDate);
    if(this.title == undefined || this.title == null) {
      this.toast.error({detail: "Promotion name is required.", summary: '', duration: 4000});
      this.btnDis = false;
      return false;
    } else if(this.fromDate == null || this.fromDate == undefined) {
      this.toast.error({detail: "Promotion dates required.", summary: '', duration: 4000});
      this.btnDis = false;
      return false;
    } else if(this.toDate == null || this.toDate == undefined) {
      this.toast.error({detail: "Promotion dates required.", summary: '', duration: 4000});
      this.btnDis = false;
      return false;
    } else if(this.promoCountrySelected.length == 0) {
      this.toast.error({detail: "Please select promotion country.", summary: '', duration: 4000});
      this.btnDis = false;
      return false;
    } else if(this.order_amount == null || this.order_amount == undefined) {
      this.toast.error({detail: "Please enter order amount.", summary: '', duration: 4000});
      this.btnDis = false;
      return false;
    }
    else {
      this.apiService.addPromotion(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.toast.success({detail: response.msg, summary: '', duration: 4000});
          this.btnDis = false;
          this.router.navigate(['/brand-portal/promotions/']);
        } else {
          this.toast.error({detail: response.msg, summary: '', duration: 4000});
          this.btnDis = false;
        }
      },(error) => {
        this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
        this.btnDis = false;
      })
      return true;
    }
  }

  //date-range
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      // this.product_shipdate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      // this.product_endshipdate = date;
      this.myRangeInput.close();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  onShipDateChnage(event: any) {
    if(event.target.value == '') {
      this.fromDate = null;
      this.toDate = null;
    }
  }

  onFocused(e:any){
    // do something when input is focused
  }

  openInvoiceProductModal(content: any) {
    this.invoiceProduct = this.modalService.open(content, { windowClass: 'invoiceProductModal' });
  }

  onAddingProduct(item: any) {
    if(this.selectedProducts.indexOf(item) == -1) {
      this.selectedProducts.push(item);
    }
    console.log(this.selectedProducts);
  }

  settingVariation(item: any) {
    if(item.variations.length > 0) {
      this.setProductVariants = item.variations;
    }
    console.log(this.setProductVariants);
  }

  onVarCheckBoxSelect(event: any, item: any) {
    let {checked, value} = event.target;
    if(checked) {
      if(this.selectedProducts.indexOf(item) == -1)  this.selectedProducts.push(item);
    } else {
      let index = this.selectedProducts.indexOf(item);
      if (index !== -1) this.selectedProducts.splice(index, 1);
    }
  }
  


}
