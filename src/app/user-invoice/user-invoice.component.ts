import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import jspdf from 'jspdf';  

@Component({
  selector: 'app-user-invoice',
  templateUrl: './user-invoice.component.html',
  styleUrls: ['./user-invoice.component.css']
})
export class UserInvoiceComponent implements OnInit {

  @ViewChild('pdfData') pdfData!: ElementRef;

  constructor(public modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  downloadPdf() {
    let doc = new jspdf();
    // doc.addHTML(this.pdfData.nativeElement, function() {
    //    doc.save("sample.pdf");
    // });
  }

  openDownloadInvoiceModal(content:any) {
    this.modalService.open(content, { windowClass: 'downloadInvoiceModal' });
  }

}
