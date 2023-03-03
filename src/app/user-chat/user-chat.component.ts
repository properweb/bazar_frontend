import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  chatbox:boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('local_data') == null) {
      this.router.navigate(['/']);
    } else {}
  }

  showChatBoxFunction() {
    this.chatbox = true;
  }

  hideChatBoxFunction() { 
    this.chatbox = false;
  }

}
