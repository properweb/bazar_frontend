import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  token!: any;
  constructor(private appComponent: AppComponent,private activatedRoute: ActivatedRoute, private apiServive: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.appComponent.showSpinner = true;
    this.token = this.activatedRoute.snapshot.params['token'];
    
    this.apiServive.verifyEmail(this.token).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res ==  true) {
        if(this.appComponent.not_logged_in) {
          this.router.navigate(['localManufacturers']);
        } else {
          this.router.navigate(['brand-portal']);
        }
        this.appComponent.showSpinner = false;
      }
    })
  }

}
