import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

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
  custAddDivShow: any = false;

  user_id!: any;
  first_name!: any;
  last_name!: any;
  store_name!: any;
  email!: any;
  ship_name!: any;
  ship_country: any = null ;
  ship_address1!: any;
  ship_address2!: any;
  ship_state: any = null;
  ship_town: any = null;
  ship_ph_code: any = '962';
  ship_phone!: any;
  ship_post_code!: any;
  countriesArray!: any;
  stateArray!: any;
  cityArray!: any;
  ship_now: any = 1;
  self_note!: any;
  retailer_note!: any;
  custProName!: any;
  custProQty!: any;
  custProPrice!: any;

  constructor(public modalService: NgbModal, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.getCountries();
  }

  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'Georgia'
    },
     {
       id: 2,
       name: 'Usa'
     },
     {
       id: 3,
       name: 'India'
     }
  ];

  proKeyword = 'name';
  proData = [ 
    { id: 1, img: 'assets/images/search-img.png', name: 'Grey plate', sku: 'AA234', stock: 'In stock', price: '$11.70'},
    { id: 2, img: 'assets/images/search-img.png', name: 'abcd', sku: 'AA234', stock: 'In stock', price: '$11.70'},
    { id: 1, img: 'assets/images/search-img.png', name: 'efgh', sku: 'AA234', stock: 'In stock', price: '$11.70'},
  ];

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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCountries() {
    this.apiService.getCountries().subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.countriesArray = response.data;
    })
  }

  onChangeCountry(event: any) {
    let countryId = event.target.value;
    this.ship_state = null;
    this.ship_town = null;
    let country = this.countriesArray.filter((item: any) => item.id == countryId);
    this.ship_ph_code = country[0].phone_code;
    this.apiService.getStates(countryId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.stateArray = response.data;
    })
  }

  onChangeState(event: any) { 
    let stateId = event.target.value;
    this.ship_town = null;
    this.apiService.getCities(stateId).subscribe((responseBody) => {
      let response= JSON.parse(JSON.stringify(responseBody));
      this.cityArray = response.data;
    })
  }

  sendAddCustomerForm(addCustomerForm: any) {
    console.log(addCustomerForm.value);
    
    this.addCustomerModal.close();
  }
  

}
