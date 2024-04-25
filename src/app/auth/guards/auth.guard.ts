import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch, CanActivate {

  constructor(private authService : AuthService,
    private router : Router,){}

  private checkAuthStatus() : Observable<boolean> {
    return this.authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => {
        if(!isAuthenticated){
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean> {
      return this.checkAuthStatus();
      // return false;
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkAuthStatus();
    // return false;
  }
}
