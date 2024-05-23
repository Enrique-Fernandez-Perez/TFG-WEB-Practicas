import { Component, inject } from '@angular/core';
import { TokenService } from './auth/services/token.service';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '06-heroesApp';

  token = inject(TokenService);
  router = inject(Router);

  logout(){
    this.token.removeToken();
    this.router.navigate(['/'])
  }
}
