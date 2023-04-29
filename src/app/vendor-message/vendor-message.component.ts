import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { Subscription, interval, timer } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-vendor-message',
  templateUrl: './vendor-message.component.html',
  styleUrls: ['./vendor-message.component.css']
})
export class VendorMessageComponent implements OnInit, OnDestroy {
  @ViewChild('content') content!: ElementRef;
  mySubscription!: Subscription;
  chatbox:boolean = false;
  user_id!: any;
  user_role!: any;
  memberList!: any;
  sortedMemberList!: any;
  selectedRole!: any;
  senderId!: any;
  selectedChatDetails!: any;
  allChatDetails!: any;
  message!: any;
  activeChat!: any;
  searchText!: any;

  constructor(private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService, private appComponent: AppComponent) { } 

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
        this.user_role = user_session.role;
        this.activatedRoute.params.subscribe((routeParams) => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        })
      },
      error: (error) => {
      },          
    });
    this.showMessageMembers();
    setInterval(() => {
      if(this.chatbox) {
        this.allChat();
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    this.chatbox = false;
  }

  scrollToBottom() {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }

  showMessageMembers() {
    this.appComponent.showSpinner = true;
    this.apiService.showMessageMembers().subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.memberList = response.data;
        this.sortedMemberList = response.data;
        this.appComponent.showSpinner = false;
      } else {
        this.toast.success({detail: response.data,summary: '', duration: 4000});
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

  showChatDetail(role: any, senderId: any) {
    this.appComponent.showSpinner = true;
    let values = {
      role: role,
      user_id: senderId
    }
    this.apiService.showChatDetail(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.selectedChatDetails = response.data;
        this.appComponent.showSpinner = false;
      } else {
        this.toast.success({detail: response.data,summary: '', duration: 4000});
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      this.appComponent.showSpinner = false;
    })
  }

  allChat() {
    let values = {
      user_id: this.senderId
    }

    this.apiService.allChat(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.allChatDetails = response.data;
        // this.scrollToBottom();
      } else {
        this.toast.success({detail: response.data,summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
    })
    
  }

  messageCreate(reciever_id: any) {
    let values = {
      message: this.message,
      sender_id: this.user_id,
      reciever_id: reciever_id
    }
    this.apiService.messageCreate(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        // this.selectedChatDetails = response.data;
        this.message = null;
        this.allChat();
        setTimeout(() => {
          this.scrollToBottom();
        }, 2000);
      } else {
        this.toast.success({detail: response.data,summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
    })
  }

  showChatBoxFunction(item: any, index: any, user_id: any) {
    this.senderId = null;
    this.chatbox = true;
    item.status = 1;
    this.activeChat = index;
    this.showChatDetail(item.role, item.user_id);
    this.senderId = user_id;
    this.allChat();
    setTimeout(() => {
      this.scrollToBottom();
    }, 2000);
  }

  hideChatBoxFunction() { 
    this.chatbox = false;
  }

  onRadioChange(event: any) {
    let array: any = [];
    if(event.target.checked) {
      this.memberList && this.memberList.forEach((element: any) => {
        if(element.status == 0) {
          array.push(element);
        };
      });
    } else {
      this.memberList && this.memberList.forEach((element: any) => {
        array.push(element);
      });
    };
    this.sortedMemberList = array;
  }

  onScroll(event: any) {
    if (event.target.scrollTop === 0) {
      // User has scrolled to the top
      // Call your function here
    }
  }

}
