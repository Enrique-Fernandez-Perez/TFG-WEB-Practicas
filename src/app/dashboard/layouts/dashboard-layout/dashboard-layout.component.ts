import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../../auth/interfaces';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent{

  private authService = inject(AuthService);

  private user2 = signal<User|null>(this.authService.currentUser());
  public user = computed(()=> this.user2());

  constructor(){
    if(!(this.user2() instanceof Object)){
      this.getUser();
    }
  }

  getUser(){
    const tokenLocal = localStorage.getItem('token');

    if(!tokenLocal){
      return;
    }

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ tokenLocal }`);

    this.authService.getUser(this.authService.currentUser() +"", headers)
      .subscribe(data => this.user2.set(data as User));
  }

  onLogout(){
    this.authService.logout();
  }
}
