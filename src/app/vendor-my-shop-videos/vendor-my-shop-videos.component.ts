import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vendor-my-shop-videos',
  templateUrl: './vendor-my-shop-videos.component.html',
  styleUrls: ['./vendor-my-shop-videos.component.css']
})
export class VendorMyShopVideosComponent implements OnInit {

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  openExport(content:any) {
    this.modalService.open(content, { windowClass: 'uploadVidModal' });
  }
  
  openUploadFeatureModal(content:any) {
    this.modalService.open(content, { windowClass: 'editVideoModal' });
  }

}
