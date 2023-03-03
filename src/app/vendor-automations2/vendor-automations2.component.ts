import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vendor-automations2',
  templateUrl: './vendor-automations2.component.html',
  styleUrls: ['./vendor-automations2.component.css']
})
export class VendorAutomations2Component implements OnInit {

  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }
  
  openActivationAutomations(content:any) {
    this.modalService.open(content, { windowClass: 'activateAutomationsModal' });
  }

}
