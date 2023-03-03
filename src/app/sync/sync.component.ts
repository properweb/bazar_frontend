import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

  user_id!: any;
  syncList!: any ;
  btnDis !: any; 
  clickedIndex !: any;
  constructor(private apiService: ApiService, private storage: StorageMap, private toast: NgToastService, private appComponent: AppComponent, private router: Router ) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}

    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.getSyncList(this.user_id);
      },
      error: (error) => {
        /* Called if data is invalid */ 
        console.log(error);
      },
    });

  }

  getSyncList(user_id:any) {
    this.appComponent.showSpinner = true;
    this.apiService.getSyncList(user_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.syncList = response.data;
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.appComponent.showSpinner = false;
      this.toast.error({detail:"EROOR",summary: 'Something went wrong! ' ,duration: 4000});
    })
  }

  updateSync(id: any , index: any, type:any) {
    this.appComponent.showSpinner = true;
    this.clickedIndex = index;
    this.btnDis = true;
    this.apiService.updateSync(id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.clickedIndex = null;
        this.btnDis = false;
        this.toast.success({detail:"SUCCESS",summary: response.msg ,duration: 4000});
        this.appComponent.showSpinner = false;
      }
    } , (error) => {
      this.btnDis = false;
      this.clickedIndex = null;
      this.toast.error({detail:"EROOR",summary: 'Something went wrong! ' ,duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

  wordpressSync(id: any , index: any, type:any) {
    this.appComponent.showSpinner = true;
    this.clickedIndex = index;
    this.btnDis = true;
    this.apiService.wordpressSync(id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.clickedIndex = null;
        this.btnDis = false;
        this.toast.success({detail:"SUCCESS",summary: response.msg ,duration: 4000});
        this.appComponent.showSpinner = false;
      }
    } , (error) => {
      this.btnDis = false;
      this.clickedIndex = null;
      this.toast.error({detail:"EROOR",summary: 'Something went wrong! ' ,duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }


}
