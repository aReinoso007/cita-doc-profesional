import { filter, take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';
@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor(private tokenService: TokenService, private router: Router){}

  canLoad(): Observable<boolean> {    
    return this.tokenService.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        console.log('Found previous token, automatic login');
        if (isAuthenticated) {
          // Directly open inside area       
          this.router.navigateByUrl('/tabs/dashboard', { replaceUrl: true });
        } else {          
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}
