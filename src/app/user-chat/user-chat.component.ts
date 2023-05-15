import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { Subscription, interval } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnDestroy {
  @ViewChild('content') content!: ElementRef;
  mySubscription!: Subscription;
  chatbox:boolean = false;
  chatboxRepeat:boolean = true;
  user_id!: any;
  memberList!: any;
  sortedMemberList!: any;
  selectedRole!: any;
  senderId!: any;
  selectedChatDetails!: any;
  allChatDetails!: any;
  message!: any;
  activeChat!: any;
  myTimeout!: any;
  searchText!: any;
  messageOnSend:boolean = false;

  constructor(private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService, private appComponent: AppComponent) { } 

  ngOnInit(): void {
    this.storage.get('user_session').subscribe({
      next: (user) => {
        let user_session = JSON.parse(JSON.stringify(user));
        this.user_id = user_session.id;
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
      if(this.chatboxRepeat) {
        this.showMessageMembersRepeat();
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    this.chatbox = false;
    this.chatboxRepeat = false;
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

  showMessageMembersRepeat() {
    this.apiService.showMessageMembers().subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.memberList = response.data;
        this.sortedMemberList = response.data;
      } else {
        this.toast.success({detail: response.data,summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
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
    this.messageOnSend = true;
    let values = {
      message: this.message,
      sender_id: this.user_id,
      reciever_id: reciever_id
    }
    this.apiService.messageCreate(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        // this.selectedChatDetails = response.data;
        this.messageOnSend = false;
        this.message = null;
        this.allChat();
        setTimeout(() => {
          this.scrollToBottom();
        }, 2000);
      } else {
        this.toast.success({detail: response.data,summary: '', duration: 4000});
        this.messageOnSend = false;
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
      this.messageOnSend = false;
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

}
