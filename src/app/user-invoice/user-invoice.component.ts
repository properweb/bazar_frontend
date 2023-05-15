import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import jspdf from 'jspdf';  
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-invoice',
  templateUrl: './user-invoice.component.html',
  styleUrls: ['./user-invoice.component.css']
})
export class UserInvoiceComponent implements OnInit {

  user_id !:any;
  allDetails !:any;
  invoices!: any;
  invoicesArray: any = [];
  invoiceDetails!: any;

  @ViewChild('pdfData') pdfData!: ElementRef;

  constructor(public modalService: NgbModal,private storage: StorageMap, private apiService: ApiService,private toast: NgToastService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        if(user_session.id) {
          this.getInvoices();
        }
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
      });
  }

  getInvoices() {
    this.appComponent.showSpinner = true;
    this.apiService.retailerInvoices().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
        if(response.res == true) {
          this.allDetails = response.data;
          this.invoices = response.data;
          this.appComponent.showSpinner = false;
        } else {
          this.toast.error({detail: response.msg, summary: "" ,duration: 4000});
          this.appComponent.showSpinner = false;
        }
      },(error) => {
        this.toast.error({detail:"Something went wrong. Please try again!", summary: "" ,duration: 4000});
        this.appComponent.showSpinner = false;
      })
	  
  }
  
  downloadPdf() {
    let doc = new jspdf();
    // doc.addHTML(this.pdfData.nativeElement, function() {
    //    doc.save("sample.pdf");
    // });
  }

  openDownloadInvoiceModal(content:any, invoice_key: any) {
    let sortedInvoice = this.invoices.find((item: any) => item,invoice_key == invoice_key);
    this.invoiceDetails = sortedInvoice;
    this.modalService.open(content, { windowClass: 'downloadInvoiceModal' });
  }

  showInvoice() {

  }

}
