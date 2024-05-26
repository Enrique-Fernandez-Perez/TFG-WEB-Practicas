import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroments } from 'src/environments/enviroments';
import { Observable, catchError, map, of, take, tap } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '../interfacess/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private baseUrl : string = enviroments.baseUrl;

  constructor( private tokenService: TokenService,) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.baseUrl + '/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/login', user);
  }

  // Access user profile
  profileUser(): Observable<User> {
    // return this.http.get(this.baseUrl + '/api/user-profile');
    return this.http.get<User>(this.baseUrl + '/me');
  }

  user ?: User;

  getUser(){
    const token = this.tokenService.getToken();

    if(!token){
      return false;
    }

    const headers = new HttpHeaders();

    headers.set(
      'Authorization', "Bearer " + token
    );

    this.http.get<User>(this.baseUrl + '/me',{headers}).subscribe(data => this.user = data);
    return this.user;
  }

  get currentUser() : User| undefined{
    if(!this.user){
      return undefined;
    }
    return structuredClone(this.user);
  }

  checkAuthentication() : Observable<boolean>{
    if(!localStorage.getItem('auth_token')){
      return of(false);
    }

    const token = localStorage.getItem('auth_token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user=> this.user = user),
        map(user => !!user),
        catchError(err => of(false))
        )
  }

  /* private user ?: User;

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
  } */

}
