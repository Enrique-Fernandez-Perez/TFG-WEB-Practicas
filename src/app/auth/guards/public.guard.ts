import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanMatch, Router, Route, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(private authService : AuthService,
    private router : Router,){}

    private checkAuthStatus() : Observable<boolean> {
      return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
        /** TODO comprobar rol de usuario*/
        // if(!isAuthenticated){
        //   this.router.navigate(['']);
        // }
        if(isAuthenticated){
          if(this.authService.currentUser?.role_id == 0){
            //** TODO cerrar sesion */
            this.router.navigate(['']);
          }
          else if(this.authService.currentUser?.role_id == 1){
            this.router.navigate(['user']);
          }
          else if(this.authService.currentUser?.role_id == 2){
            this.router.navigate(['user']);
          }
          else if(this.authService.currentUser?.role_id== 3){
            this.router.navigate(['admin']);
          }
          else{
            this.router.navigate(['']);
          }
        }
      }),
      map(isAuthenticated => !isAuthenticated)
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
