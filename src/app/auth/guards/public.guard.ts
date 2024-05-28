import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, CanMatch, Router, Route, UrlSegment } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(private authService : AuthService,
    private router : Router,){}

   /*  private checkAuthStatus() : Observable<boolean> {
      return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => {
        /** TODO comprobar rol de usuario * /
        // if(!isAuthenticated){
        //   this.router.navigate(['']);
        // }
        if(isAuthenticated){
          if(this.authService.currentUser?.role_id == 'registrado'){
            //** TODO cerrar sesion * /
            this.router.navigate(['/activities']);
          }
          else if(this.authService.currentUser?.role_id == 'alumno'){
            this.router.navigate(['user']);
          }
          else if(this.authService.currentUser?.role_id == 'profesor'){
            this.router.navigate(['user']);
          }
          else if(this.authService.currentUser?.role_id== 'administrador'){
            this.router.navigate(['admin']);
          }
          else{
            this.router.navigate(['/activities']);
          }
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    );
  } */
  private checkAuthStatus() : Observable<boolean> {
    const auth = this.authService.currentUser;

    // console.log(auth);

    // if(auth == undefined){
    //   this.router.navigate(['/activities']);
    //   // return of(false);
    // }

    switch (auth?.role_id){
      case ('administrador'):
        this.router.navigate(['/admin']);
        return of(true);
      case ('profesor'):
        this.router.navigate(['/user']);
        return of(true);
      case ('alumno'):
        this.router.navigate(['/user']);
        return of(true);
      case ('registrado'):
        this.router.navigate(['/activities']);
        return of(true);
      default:
        break;
    }
        // if(auth?.role_id == 'registrado'){
          //   //** TODO cerrar sesion * /
          // }
          // if(auth?.role_id != 'aministrador'){
            //   //** TODO cerrar sesion * /
            //   this.router.navigate(['/user']);
            // }
            // if(auth?.role_id == 'aministrador'){
              //   //** TODO cerrar sesion * /
              //   this.router.navigate(['/admin']);
              // }

    // this.router.navigate(['/activities']);
    return of(false);
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
