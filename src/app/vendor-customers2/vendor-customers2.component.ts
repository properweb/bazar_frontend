import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vendor-customers2',
  templateUrl: './vendor-customers2.component.html',
  styleUrls: ['./vendor-customers2.component.css']
})
export class VendorCustomers2Component implements OnInit {

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  openExport(content:any) {
    this.modalService.open(content, { windowClass: 'addCustomerContact' });
  }

}
