import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroments } from 'src/environments/enviroments';
import { User } from '../interfacess/user';
import { Observable, catchError, map, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private baseUrl : string = enviroments.baseUrl;
  private user ?: User;

  get currentUser() : User| undefined{
    if(!this.user){
      return undefined;
    }
    return structuredClone(this.user);
  }

  login( email : string, password : string) : Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => {this.user = user;}),
        tap(user => { localStorage.setItem('token', 'mundo')})
      );
  }

  constructor() { }

  checkAuthentication() : Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user=> this.user = user),
        map(user => !!user),
        catchError(err => of(false))
        )
  }

  logout(){
    this.user = undefined;
    // localStorage.removeItem('token');
    localStorage.clear();
  }
}
