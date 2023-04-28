import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit, OnDestroy {
  @ViewChild('content') content!: ElementRef;
  mySubscription!: Subscription;
  chatbox:boolean = false;
  user_id!: any;
  memberList!: any;
  selectedRole!: any;
  senderId!: any;
  selectedChatDetails!: any;
  allChatDetails!: any;
  message!: any;
  activeChat!: any;
  myTimeout!: any;
  searchText!: any;

   constructor(private apiService: ApiService, private storage: StorageMap, private activatedRoute: ActivatedRoute,private router: Router,private toast: NgToastService) { } 

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
    this.apiService.showMessageMembers().subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.memberList = response.data;
      } else {
        this.toast.success({detail: response.data,summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
    })
  }

  showChatDetail(role: any, senderId: any) {
    let values = {
      role: role,
      user_id: senderId
    }
    this.apiService.showChatDetail(values).subscribe((responseBody) => {
      let response =  JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        this.selectedChatDetails = response.data;
      } else {
        this.toast.success({detail: response.data,summary: '', duration: 4000});
      }
    },(error) => {
      this.toast.error({detail:'Something went wrong! please try again.',summary: '', duration: 4000});
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
        this.scrollToBottom();
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
        // this.allChat(reciever_id);
        this.scrollToBottom();
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

}
