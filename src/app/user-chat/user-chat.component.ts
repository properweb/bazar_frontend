import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  chatbox:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  showChatBoxFunction() {
    this.chatbox = true;
  }

  hideChatBoxFunction() { 
    this.chatbox = false;
  }

}
