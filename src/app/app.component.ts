import { Component } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'html';
  errorPopup = false;
  errorPopupContent!: string;
  show: any = true;
  showSpinner: any = false;
  not_logged_in: any = true;
  base_url: any = 'https://staging1.bazarcenter.ca/';

  constructor(private storage: StorageMap) {
    this.storage.get("user_session").subscribe({
      next: (user) => {
        /* Called if data is valid or `undefined` */
        if(user) {
          this.not_logged_in = false;
        }
      },
      error: (error) => {
        /* Called if data is invalid */
        console.log(error);
      },
    });
  }

  onActivate(event: any) {
    // window.scroll(0,0);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
