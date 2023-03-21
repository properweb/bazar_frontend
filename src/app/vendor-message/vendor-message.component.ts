import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-message',
  templateUrl: './vendor-message.component.html',
  styleUrls: ['./vendor-message.component.css']
})
export class VendorMessageComponent implements OnInit {

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
