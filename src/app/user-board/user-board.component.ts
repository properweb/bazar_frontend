import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {

  user_id !:any;
  board_id !:any;
  allDetails !:any;
  boardList !:any;
  editBoardModal !:any;
  editBoardProductModal !:any;
  newBoardProductModal !:any;
  board_name !:any;
  board_visibility !:any;
  exist_board_name !:any;
  exist_board_visibility !:any;
  saveBtnDis: any = false;
  deleteBtnDis: any = false;
  newBtnDis: any = false;
  wishId!: any;
  
  constructor(private storage: StorageMap, private apiService: ApiService,private toast: NgToastService, private router: Router, private appComponent: AppComponent, public modalService: NgbModal, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.board_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.fetchBoard(this.board_id);
      this.storage.get('user_session').subscribe({
        next: (user) => {
          /* Called if data is valid or `undefined` */
          let user_session = JSON.parse(JSON.stringify(user));
          this.user_id = user_session.id;
          if(user_session.id) {
            this.fetchBoardList();
          }
        },
        error: (error) => {
          /* Called if data is invalid */
          console.log(error);
        },          
        });

  }

  fetchBoard(board_id:any) {
    this.appComponent.showSpinner = true;
    this.apiService.fetchBoardWishlist(board_id).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allDetails = response.data;
        this.exist_board_name = response.data.board_arr.name;
        this.exist_board_visibility = response.data.board_arr.visibility;
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

  fetchBoardList() {
    // this.appComponent.showSpinner = true;
    this.apiService.fetchBoards().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
	    this.boardList = response.data;
    })
    
  } 

  removeWishlist(id: any) {
    let values = {
      id: id
    }
    this.apiService.deleteWishlist(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.fetchBoard(this.user_id);
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

  openEditBoardModal(content: any) {  
    this.editBoardModal = this.modalService.open(content, { windowClass: 'editboardmodal' });
  }

  openEditBoardProductModal(content: any) {  
    this.editBoardProductModal = this.modalService.open(content, { windowClass: 'editboardproductmodal' });
  }

  openNewBoardProductModal(content: any) {  
    this.newBoardProductModal = this.modalService.open(content, { windowClass: 'newBoardProductModal' });
  }

  saveAddBoard(addBoard: any) {
    this.newBtnDis = true;
    let vales = {
      user_id: this.user_id,
      name: this.board_name,
      visibility: this.board_visibility == true ? 1 : 0
    }
    this.apiService.addBoardWishlist(vales).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        // this.addBoardsModal.close(); 
        this.newBtnDis = false;
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
        this.modalService.dismissAll();
        this.router.navigate(['/wishlist']);
      } else {
        this.newBtnDis = false;
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.newBtnDis = false;
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

  editBoard(editBoard: any) {
    this.saveBtnDis = true;
    let values = {
      key: this.board_id,
      name: this.exist_board_name,
      visibility: this.exist_board_visibility == true ? 1 : 0
    }
    this.apiService.updateBoardWishlist(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        // this.fetchWishlist(this.user_id);
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
        this.fetchBoard(this.board_id);
        this.editBoardModal.close();
        this.saveBtnDis = false;
      } else {
        this.saveBtnDis = false;
      this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.saveBtnDis = false;
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

  onCheckChange(event: any) {
    this.exist_board_visibility = event.target.checked;
  }

  deleteBoard() {
    this.deleteBtnDis = true;
    let values = {
      key: this.board_id
    }
    this.apiService.deleteBoardWishlist(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.deleteBtnDis = false;
        // this.editBoardProductModal.close();
        this.modalService.dismissAll();
        this.toast.success({detail: 'Board removed successfully.',summary: '' ,duration: 4000});
        this.router.navigate(['/wishlist']);
      } else {
        this.deleteBtnDis = false;
        this.toast.error({detail: response.msg ,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.deleteBtnDis = false;
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

  onMoveBoard(event: any) {
    let values = {
      wish_id: this.wishId,
      board_key: event.target.value
    }
    this.apiService.changeBoardWishlist(values).subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.deleteBtnDis = false;
        this.fetchBoard(this.board_id);
        this.modalService.dismissAll();
        this.toast.success({detail: response.msg,summary: '' ,duration: 4000});
        // this.router.navigate(['/wishlist']);
      } else {
        this.toast.error({detail: response.msg,summary: '' ,duration: 4000});
      }
    },(error) => {
      this.deleteBtnDis = false;
      this.toast.error({detail:"Something went wrong. please try again later!",summary: '' ,duration: 4000});
    })
  }

}
