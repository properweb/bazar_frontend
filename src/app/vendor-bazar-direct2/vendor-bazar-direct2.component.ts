import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { AppComponent } from '../app.component';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vendor-bazar-direct2',
  templateUrl: './vendor-bazar-direct2.component.html',
  styleUrls: ['./vendor-bazar-direct2.component.css']
})
export class VendorBazarDirect2Component implements OnInit {

  url!: SafeResourceUrl;
  forCopyUrl!: any;
  widgetSize:any = 'large';
  devEmail!: any;
  devBody!: any;
  widgetDetails!: any;
  largeWidget!: any;
  standardWidget!: any;
  smallWidget!: any;
  direct_Link!: any;
  copyValue!: any;
  copied: boolean = false;
  errorMsg!: any;

  constructor( private apiService: ApiService, private toast: NgToastService, private appComponent: AppComponent, public sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
    this.fetchWidgets(); 
  }

  fetchWidgets() {
    this.appComponent.showSpinner = true;
    this.apiService.fetchWidgets().subscribe((responseBody) => {
      let response = JSON.parse(JSON.stringify(responseBody));
      if(response.res == true) {
        let response = JSON.parse(JSON.stringify(responseBody));
        this.widgetDetails = response.data;  
        this.largeWidget = response.data.find((item: any) => item.title == 'large');
        let newUrl = 'https://staging1.bazarcenter.ca/embed/' + this.largeWidget.embed_key;
        this.forCopyUrl = newUrl;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
        this.standardWidget = response.data.find((item: any) => item.title == 'standard');
        this.smallWidget = response.data.find((item: any) => item.title == 'small');
        this.copyValue = '<iframe width="900" height="600" scrolling="no" frameBorder="0" src="'+ this.forCopyUrl +'"></iframe>';
        this.appComponent.showSpinner = false;
      } else {
        this.toast.error({detail: response.msg, summary: '', duration: 4000});
        this.appComponent.showSpinner = false;
      }
    },(error) => {
      this.toast.error({detail: "Something went wrong, please try again.", summary: '', duration: 4000});
      this.appComponent.showSpinner = false;
    });
  }
  
  onSizechange(event: any) {
    this.copied = false;
    let newUrl: any;
    if(this.widgetSize == 'large') {
      newUrl = 'https://staging1.bazarcenter.ca/embed/' + this.largeWidget.embed_key;
      this.forCopyUrl = newUrl;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
      this.copyValue = '<iframe width="900" height="600" scrolling="no" frameBorder="0" src="'+ this.forCopyUrl +'"></iframe>';
    } else if(this.widgetSize == 'standard') {
      newUrl = 'https://staging1.bazarcenter.ca/embed/' + this.standardWidget.embed_key;
      this.forCopyUrl = newUrl;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
      this.copyValue = '<iframe width="500" height="600" scrolling="no" frameBorder="0" src="'+ this.forCopyUrl +'"></iframe>';
    } else {
      newUrl = 'https://staging1.bazarcenter.ca/embed/' + this.smallWidget.embed_key;
      this.forCopyUrl = newUrl;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
      this.copyValue = '<iframe width="360" height="64" scrolling="no" frameBorder="0" src="'+ this.forCopyUrl +'"></iframe>';
    }
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copied = true;
  }

  onSendInstructions() {
    if(!this.devEmail) {
      this.errorMsg = 'Please enter an email.';
    } else if (!this.devBody) {
      this.errorMsg = 'Please enter sebject.';
    } else {
      console.log(this.devEmail, this.devBody);
      this.errorMsg = null;
    }
  }

}
