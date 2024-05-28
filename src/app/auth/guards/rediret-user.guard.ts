import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../interfacess/user';

@Injectable({
  providedIn: 'root'
})
export class RediretUserGuard implements CanActivate {

  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let user = this.authService.getUser();

      this.authService.getAuth().subscribe(
        (user)=>{
          if(user.role_id == 'registrado'){
            this.router.navigate(['/activities']);
            return false;
          }
          return true;
        },
        (error)=>{
          this.router.navigate(['/activities']);
          return;
        }
      )

    return true;
  }

}
