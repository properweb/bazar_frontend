import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-edit-promotions',
  templateUrl: './vendor-edit-promotions.component.html',
  styleUrls: ['./vendor-edit-promotions.component.css']
})
export class VendorEditPromotionsComponent implements OnInit {
  @ViewChild('datepicker') myRangeInput!: any;

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
  promotionCountryArry!: any;
  promoCountrySelected: any = [];
  hoveredDate: NgbDate | null = null;
  fromDate!: any;
  toDate!: any;
  invoiceProduct!: any;
  proKeyword = 'name';
  proData = [ 
    { id: 1, img: 'assets/images/search-img.png', name: 'Grey plate', sku: 'AA234', stock: 'In stock', price: '$11.70'},
    { id: 2, img: 'assets/images/search-img.png', name: 'abcd', sku: 'AA234', stock: 'In stock', price: '$11.70'},
    { id: 1, img: 'assets/images/search-img.png', name: 'efgh', sku: 'AA234', stock: 'In stock', price: '$11.70'},
  ];

  constructor(private apiService: ApiService, private storage: StorageMap, private router: Router, private activatedRoute: ActivatedRoute, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,public modalService: NgbModal, ) {
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
    this.activatedRoute.params.subscribe((routeParams) => {
      alert(routeParams['id']);
    } )
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
    let sepByComma = this.promoCountrySelected.join(',');

    let values = {
      brand_id: this.user_id,
      title: this.title,
      promotion_to: this.promotion_to,
      promotion_country: sepByComma,
      promotion_tier: this.promotion_tier,
      promotion_offer_type: this.promotion_offer_type,
      order_amount: this.order_amount,
      discount_amount: this.discount_amount,
      from_date: this.formatter.format(this.fromDate),
      to_date: this.formatter.format(this.toDate),
      offer_free_shipping: this.promotion_offer_type == 3 ? true : this.offer_free_shipping
    }
    console.log(values);

    this.apiService.addPromotion(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
    })
    
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
  
  openEndPromotion(content:any) {
    this.modalService.open(content, { windowClass: 'endPromotionModal' });
  }

  openInvoiceProductModal(content: any) {
    this.invoiceProduct = this.modalService.open(content, { windowClass: 'invoiceProductModal' });
  }

}
