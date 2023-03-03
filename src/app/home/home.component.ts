import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') != null) {
      if(localStorage.getItem('local_data') == 'brand') {
        this.router.navigate(['/brand-portal']);
      } else if(localStorage.getItem('local_data') == 'retailer') {
        this.router.navigate(['/retailer-home']);
      }
    } else {
      
    }
  }
  
  delete() {
    $("#myBody").removeAttr("style");
    $("#myBody").removeClass("modal-open");
    $(".modal-backdrop").remove();
  }

}
