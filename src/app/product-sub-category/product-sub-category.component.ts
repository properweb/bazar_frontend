import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-sub-category',
  templateUrl: './product-sub-category.component.html',
  styleUrls: ['./product-sub-category.component.css']
})
export class ProductSubCategoryComponent implements OnInit {

  catSlug!: any;
  subCatSlug!: any;
  subSubCatSlug!: any;

  constructor( private apiService: ApiService, private storage: StorageMap, private router: Router, private activatedRoute: ActivatedRoute) { } 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routeParams) => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.storage.get("user_session").subscribe({
        next: (user) => {
          /* Called if data is valid or `undefined` */
          let user_session = JSON.parse(JSON.stringify(user));
          // this.user_id = user_session.id;
          this.catSlug = routeParams['cat_slug'];
          this.subCatSlug = routeParams['subcat_slug'];
          this.subSubCatSlug = routeParams['subsubcat_slug'];
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        },
        error: (error) => {
          /* Called if data is invalid */
        },
      });
    })
  }
  
  model = 'middle';

}
