import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit {
  @ViewChild('modalCloseBtn') modalCloseBtn!: ElementRef<HTMLElement>
  user_id !:any;
  allWishDetails !:any;
  board_name !:any;
  board_visibility !:any;
  addBoardsModal !:any;
  btnDis:any = false;

  constructor(private storage: StorageMap, private apiService: ApiService,private toast: NgToastService, private router: Router, private appComponent: AppComponent, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        if(user_session.id) {
          this.fetchWishlist();
        }
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },          
    });
  }

  openAddBoardsModal(content: any) {  
    this.addBoardsModal = this.modalService.open(content, { windowClass: 'editboardproductmodal' });
  }

  fetchWishlist() {
    this.appComponent.showSpinner = true;
    this.apiService.fetchWishlist().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allWishDetails = response.data;
        this.appComponent.showSpinner = false;
      } else {
        this.appComponent.showSpinner = false;
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.appComponent.showSpinner = false;
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
    
  }

  removeWishlist(wish_id: any) {
    let values = {
      id: wish_id
    }
    this.apiService.deleteWishlist(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.fetchWishlist();
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

  saveAddBoard(addBoard: any) {
    this.btnDis = true;
    let vales = {
      // user_id: this.user_id,
      name: this.board_name,
      visibility: this.board_visibility == true ? 1 : 0
    }
    this.apiService.addBoardWishlist(vales).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        // this.addBoardsModal.close(); 
        this.fetchWishlist();
        this.modalCloseBtn.nativeElement.click();
        this.btnDis = false;
        this.board_name = '';
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      } else {
        this.btnDis = false;
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.btnDis = false;
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

}
