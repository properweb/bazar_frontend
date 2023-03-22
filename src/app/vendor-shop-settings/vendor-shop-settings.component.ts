import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-shop-settings',
  templateUrl: './vendor-shop-settings.component.html',
  styleUrls: ['./vendor-shop-settings.component.css']
})
export class VendorShopSettingsComponent implements OnInit {
  @ViewChild('datepicker') myRangeInput!: any;
  user_id!: any;
  usd_order_min !: any;
  usd_reorder_min !: any;
  cad_order_min !: any;
  cad_reorder_min !: any;
  gbp_order_min !: any;
  gbp_reorder_min !: any;
  aud_order_min !: any;
  aud_reorder_min !: any;
  eur_order_min !: any;
  eur_reorder_min !: any;
  outside_us !: any;
  sell_to_middle_east !: any;
  sell_to_uk !: any;
  sell_to_aus !: any;
  handle_pack_cost !: any;
  sell_to_online !: any;
  allow_social_sellers !: any;
  sell_to_qual_reat !: any;
  brand_name !: any;
  email !: any;
  prime_cat !: any;
  shop_lead_time !: any;
  hoveredDate: NgbDate | null = null;
  pause_from_date!:any;
  pause_to_date!:any;
  btnDis1: any;
  minDate: any;
  pricingListError:any = {usdFom: '', usdReOrd: '', cadFom: '', cadReOrd: '', gbpFom: '', gbpReOrd: '', audFom: '', audReOrd: '', eurFom: '', eurReOrd: '', };
  primeCatArray: any = [];

  shopLeadTime: any = [ 
    {id:1, name: '1-3 days'},
    {id:2,name: '4-7 days'},
    {id:3,name: '8-10 days'},
    {id:4,name: '11-14 days'},
    {id:5,name: '15-21 days'},
    {id:6,name: '22-30 days'},
    {id:7,name: '30+ days'},
  ]

  constructor(private apiService: ApiService, private storage: StorageMap, private toast: NgToastService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private router: Router) {
    this.pause_from_date = null;
    this.pause_to_date = null;
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
   }

  ngOnInit(): void {
    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getVendorDetails(this.user_id);
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },
    });
    this.getParentCategories();
  }

  getVendorDetails(user_id: any) {
    this.apiService.getVendorDetails(user_id).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.usd_order_min = response.data.first_order_min;
      this.usd_reorder_min = response.data.re_order_min;
      if(response.data.outside_us != true) {
        this.apiService.convertPrice(response.data.first_order_min).subscribe((responseBody) => {
          let response = JSON.parse(JSON.stringify(responseBody));
          this.usd_order_min = response.data.USD;
          this.cad_order_min = response.data.CAD;
          this.gbp_order_min = response.data.GBP;
          this.aud_order_min = response.data.AUD;
          this.eur_order_min = response.data.EUR;
        })
        this.apiService.convertPrice(response.data.re_order_min).subscribe((responseBody) => {
          let response = JSON.parse(JSON.stringify(responseBody));
          this.usd_reorder_min = response.data.USD;
          this.cad_reorder_min = response.data.CAD;
          this.gbp_reorder_min = response.data.GBP;
          this.aud_reorder_min = response.data.AUD;
          this.eur_reorder_min = response.data.EUR;
        })
      } else {
        this.cad_order_min = response.data.cad_order_min;
        this.cad_reorder_min = response.data.cad_reorder_min;
        this.gbp_order_min = response.data.gbp_order_min;
        this.gbp_reorder_min = response.data.gbp_reorder_min;
        this.aud_order_min = response.data.aud_order_min;
        this.aud_reorder_min = response.data.aud_reorder_min;
        this.eur_order_min = response.data.eur_order_min;
        this.eur_reorder_min = response.data.eur_reorder_min;
      }

      this.outside_us = response.data.outside_us;
      this.sell_to_middle_east = response.data.sell_to_middle_east;
      this.sell_to_uk = response.data.sell_to_uk;
      this.sell_to_aus = response.data.sell_to_aus;
      this.handle_pack_cost = response.data.handle_pack_cost;
      this.sell_to_online = response.data.sell_to_online;
      this.allow_social_sellers = response.data.allow_social_sellers;
      this.sell_to_qual_reat = response.data.sell_to_qual_reat;
      this.brand_name = response.data.brand_name;
      this.email = response.data.email;
      this.prime_cat = response.data.prime_cat;
      this.shop_lead_time = response.data.shop_lead_time;
      this.pause_from_date = this.formatter.parse(response.data.pause_from_date);
      this.pause_to_date = this.formatter.parse(response.data.pause_to_date);
      
    })
  }

  getParentCategories() {
    this.apiService.getParentCategories().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.primeCatArray = response.data;

    })
  }

  saveShopSettings(shopSettingsForm: any) {
    this.btnDis1 = true;
    let values = {
      user_id: this.user_id,
      first_order_min : this.usd_order_min,
      re_order_min : this.usd_reorder_min,
      cad_order_min : this.cad_order_min,
      cad_reorder_min : this.cad_reorder_min,
      gbp_order_min : this.gbp_order_min,
      gbp_reorder_min : this.gbp_reorder_min,
      aud_order_min : this.aud_order_min,
      aud_reorder_min : this.aud_reorder_min,
      eur_order_min : this.eur_order_min,
      eur_reorder_min : this.eur_reorder_min,
      outside_us : this.outside_us,
      sell_to_middle_east : this.sell_to_middle_east,
      sell_to_uk : this.sell_to_uk,
      sell_to_aus : this.sell_to_aus,
      handle_pack_cost : this.handle_pack_cost,
      sell_to_online : this.sell_to_online,
      allow_social_sellers : this.allow_social_sellers,
      sell_to_qual_reat : this.sell_to_qual_reat,
      brand_name : this.brand_name,
      email : this.email,
      prime_cat : this.prime_cat,
      shop_lead_time : this.shop_lead_time,
      pause_from_date: this.formatter.format(this.pause_from_date),
      pause_to_date: this.formatter.format(this.pause_to_date),
    }
    
    let maxPricingError = 0;
    Object.values(this.pricingListError).forEach((elem:any) => {
      if(elem != '') {
        maxPricingError = 1;
      }
    })

    if(maxPricingError == 1) {
      this.toast.error({detail:"First order and re order min must be number and max 6 numbers.",summary:'' ,duration: 4000});
      this.btnDis1 = false;
      return false;
    } else {
      this.apiService.updateVendorDetails(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == false) {
          this.btnDis1 = false;
          this.toast.error({detail: response.msg,summary:'' ,duration: 4000});
        } else {
          this.toast.success({detail:"Shop Settings updated.",summary: '' ,duration: 4000});
          this.btnDis1 = false;
        }
      },(error) => {
        this.btnDis1 = false;
        this.toast.error({detail:"Something went wrong. Please try again.",summary: '' ,duration: 4000});
      })
    }
    return true;
  }

  onDateSelection(date: NgbDate) {
    if (!this.pause_from_date && !this.pause_to_date) {
      this.pause_from_date = date;
    } else if (this.pause_from_date && !this.pause_to_date && date && date.after(this.pause_from_date)) {
      this.pause_to_date = date;
      this.myRangeInput.close();
    } else {
      this.pause_to_date = null;
      this.pause_from_date = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.pause_from_date && !this.pause_to_date && this.hoveredDate && date.after(this.pause_from_date) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.pause_to_date && date.after(this.pause_from_date) && date.before(this.pause_to_date); }

  isRange(date: NgbDate) {
    return date.equals(this.pause_from_date) || (this.pause_to_date && date.equals(this.pause_to_date)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  autoOrderMinPrice() {
    this.apiService.convertPrice(this.usd_order_min).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.usd_order_min = response.data.USD;
      this.cad_order_min = response.data.CAD;
      this.gbp_order_min = response.data.GBP;
      this.aud_order_min = response.data.AUD;
      this.eur_order_min = response.data.EUR;
    })
  }

  autoReOrderMinPrice() {
    this.apiService.convertPrice(this.usd_reorder_min).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      this.usd_reorder_min = response.data.USD;
      this.cad_reorder_min = response.data.CAD;
      this.gbp_reorder_min = response.data.GBP;
      this.aud_reorder_min = response.data.AUD;
      this.eur_reorder_min = response.data.EUR;
    })
  }

  onDeletePauseDate() {
    this.pause_to_date = null;
    this.pause_from_date = null;
  }

  onNousdFomChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.usdFom = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.usdFom = '';
      this.autoOrderMinPrice();
    }
  }

  onNousdReOrdChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.usdReOrd = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.usdReOrd = '';
      this.autoReOrderMinPrice();
    }
  }

  onNocadFomChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.cadFom = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.cadFom = '';
    }
  }

  onNocadReOrdChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.cadReOrd = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.cadReOrd = '';
    }
  }

  onNogbpFomChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.gbpFom = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.gbpFom = '';
    }
  }

  onNogbpReOrdChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.gbpReOrd = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.gbpReOrd = '';
    }
  }

  onNoaudFomChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.audFom = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.audFom = '';
    }
  }

  onNoaudReOrdChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.audReOrd = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.audReOrd = '';
    }
  }

  onNoeurFomChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.eurFom = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.eurFom = '';
    }
  }

  onNoeurReOrdChange(event: any) {
    if(!/^\d{0,6}(\.\d{0,2})?$/.test(event.target.value)) {
      this.pricingListError.eurReOrd = 'This field must be number & max 6 numbers.';
    } else {
      this.pricingListError.eurReOrd = '';
    }
  }

}
