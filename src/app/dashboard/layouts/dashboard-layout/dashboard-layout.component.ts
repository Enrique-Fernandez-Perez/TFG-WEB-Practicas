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
  // public user2 = computed(()=> this.authService.currentUser());
  public user = computed(()=> this.user2());
  // public user = this.authService.currentUser();
  // public user ?: any;

  constructor(){
    if(!(this.user2() instanceof Object)){
      this.getUser();
    }
  }

  // constructor(){
  //   console.log(this.authService.currentUser());
  // }

  // get user(){
  //   return this.authService.currentUser();
  // }

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
}
