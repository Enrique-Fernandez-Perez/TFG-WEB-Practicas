import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent implements OnInit {

    loginForm: FormGroup;
    errors:any = null;

    constructor(
      public router: Router,
      public fb: FormBuilder,
      public authService: AuthService,
      private token: TokenService,
      private authState: AuthStateService
    ) {
      this.loginForm = this.fb.group({
        email: [],
        password: [],
      });

    }
    ngOnInit() {
    }

    onSubmit() {
      this.authService.signin(this.loginForm.value).subscribe(
        (result) => {
          this.responseHandler(result);
        },
        (error) => {
          this.errors = error.error;
        },
        () => {
          this.authState.setAuthState(true);
          this.loginForm.reset();
          if(this.authService.user?.role_id == 'administrador'){
            this.router.navigate(['/admin']);
          }
          else{
            this.router.navigate(['/user']);
          }
        }
      );

    }
    // Handle response
    responseHandler(data:any) {
      this.token.handleData(data.access_token);
    }

      /* imagenes/users/registroactividad/favactividad Model backend ?? = imagenes/users*/
    // public function ??(){
    //     return $this->belongsToMany('App\Models\User')->withTimestamps();
    // }
    // https://railway.app/

  // }
}
