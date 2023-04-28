import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-vendor-performance-reviews',
  templateUrl: './vendor-performance-reviews.component.html',
  styleUrls: ['./vendor-performance-reviews.component.css']
})
export class VendorPerformanceReviewsComponent implements OnInit {

  allDetails!: any;

  constructor( private apiService: ApiService, private router: Router, public toast: NgToastService) { }

  ngOnInit(): void {
    this.brandOrderReview('new');
  }

  brandOrderReview(sort_key: any) {
    this.apiService.brandOrderReview(sort_key).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
    })
  }

  onSortChange(event: any) {
    this.brandOrderReview(event.target.value);
  }

}
