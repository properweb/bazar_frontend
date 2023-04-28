import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.css']
})
export class VendorOrdersComponent implements OnInit {

  @ViewChild('printBtn') printBtn!: ElementRef;
  @ViewChild('printPickBtn') printPickBtn!: ElementRef;

  user_id!: any;
  orderList!: any ;
  orderListArray: any = [];
  activeTab: any = 'all';
  currentPage: any = 1;
  searchText !: any;
  minDate !: any;

  checkedItems: any = [];
  selectAll!:any;
  allDetails!: any;
  endSdateErr!: any;

  addProductModal: any; 
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  product_deadline!:any;  

  constructor(public modalService: NgbModal, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private apiService: ApiService, private storage: StorageMap, private appComponent: AppComponent, private router: Router) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
   }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.fetchOrders(user_session.id, 1, 'all', this.searchText);
      },
      error: (error) => {
      },          
    });

  }

  fetchOrders(user_id: any, currPage: any, status: any, search_key: any) {
    this.apiService.fetchOrders(user_id, currPage, status, search_key).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        if(response.data.orders.length > 0) {
          response.data.orders.forEach((element: any) => {
            this.orderListArray.push(element);
          });
        }
        this.orderList = this.orderListArray
        // this.appComponent.showSpinner = false;
      }
    },(error) => {})
  }

  onChecked(item: any, event: any){
    let {checked, value} = event.target;
    if(checked) {
      this.checkedItems.push(Number(value));
    } else {
      let index = this.checkedItems.indexOf(Number(value));
      if (index !== -1) this.checkedItems.splice(index, 1);
    }
  }

  checkAll(event: any){
    let {checked, value} = event.target;
    if(checked) {
      this.orderList.forEach((i:any) =>  this.checkedItems.push(i.order_id));
    }else {
    this.checkedItems = [];
    }
  }

  sendOrderMultiple() {
    let values = {
      items: this.checkedItems
    }
    this.apiService.orderMultiple(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        setTimeout(() => {
          this.printBtn.nativeElement.click();
          }, 200);
      }
    })
  }

  multiplePickList() {
    let values = {
      items: this.checkedItems
    }
    this.apiService.orderMultiple(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        setTimeout(() => {
          this.printPickBtn.nativeElement.click();
          }, 200);
      }
    })
  }

  downloadCsv() {
    let splitValues = this.checkedItems.join(',');
    window.location.href = `https://staging.bazarcenter.ca/api/orders/csv?brand_id=${this.user_id}&order_id=${splitValues}`;
    this.checkedItems = [];
    this.selectAll = false;
  }
 
  confirmShipDate() { 
    let values = {
      items: this.checkedItems,
      ship_date: this.formatter.format(this.product_deadline)
    }
    if(this.product_deadline == undefined) {
      this.endSdateErr = 'Select a ship date';
    } else {
      this.apiService.changeEditShipOrder(values).subscribe((responseBody) => {
        let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.endSdateErr = '';
          this.checkedItems = [];
          this.orderListArray= [];
          this.selectAll = false;
          this.addProductModal.close();
          this.product_deadline = undefined;
          this.fetchOrders(this.user_id, 1, this.activeTab, this.searchText);
        }
      })

    }

  }

  onTabChnage(tab: any) {
    this.checkedItems = [];
    this.selectAll = false;
    this.orderListArray= [];
    this.currentPage = 1;
    // alert(this.limit);
    this.activeTab = tab;
    this.searchText = '';
    this.fetchOrders(this.user_id,this.currentPage, this.activeTab, this.searchText);
  }

  onScroll() {
    this.currentPage ++;
    this.fetchOrders(this.user_id,this.currentPage, this.activeTab, this.searchText);
  }

  onSearchTextChange(event: any) {
    if(event.target.value == '') {
      // alert('empty');
      localStorage.removeItem('searchOrderKey');
      this.orderListArray= [];
      this.currentPage = 1;
      this.fetchOrders(this.user_id,this.currentPage, this.activeTab, this.searchText);
    }
  }

  onSearchPress(event: any) {
    localStorage.setItem('searchOrderKey', event.target.value);
    this.orderListArray= [];
    this.currentPage = 1;
    this.fetchOrders(this.user_id,this.currentPage, this.activeTab, this.searchText);
  }

  openAddProductModal(content:any) {
    this.addProductModal = this.modalService.open(content, { windowClass: 'productShipDateModal' });
 }

 //date-range
 onDateSelection(date: NgbDate) {
  if (!this.fromDate && !this.toDate) {
    this.fromDate = date;
  } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
    this.toDate = date;
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

}
