import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router ) {}
  canActivate( route: ActivatedRouteSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userRole = localStorage.getItem('local_data');
      const { roles } = route.data;
      if(userRole) {
        if(roles && !roles.includes(userRole)) {
          this.router.navigate(['/']);
          return false;
        } 
        return true;
      }
      this.router.navigate(['/']);
      return false;
  }
  
}
