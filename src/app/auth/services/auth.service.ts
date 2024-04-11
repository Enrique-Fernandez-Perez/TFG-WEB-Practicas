import { Injectable, computed, inject, signal } from '@angular/core';
import { enviroment } from '../../../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = enviroment.baseUrl;

  private http = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(()=> this._currentUser());
  public authStatus = computed(()=> this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user : User|null, token : string) : boolean{
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  login( email : string, password: string) : Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`;

    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({user, token}) =>{
          return this.setAuthentication(user, token);
        }),
        catchError(err => throwError(() => err.error.message)),
      );
  }

  checkAuthStatus() : Observable<boolean>{

    const url = `${this.baseUrl}/auth/check-token`;

    const tokenLocal = localStorage.getItem('token');

    if(!tokenLocal){
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization',`Bearer ${ tokenLocal }`);

    return this.http.get<CheckTokenResponse>(url, {headers})
      .pipe(
        // tap(rest => console.log(rest)),
        map(({user, token}) => {

          const rest = this.setAuthentication(user, tokenLocal);
          return rest;
        }),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        }),
        // catchError(err => throwError(() => err.error.message))
      );
  }


  public getUser( id : string, headers : HttpHeaders) : Observable<User>{

    const url = `${this.baseUrl}/auth/user/${ id }`;

    return this.http.get<User>(url, {headers})
      .pipe(
        tap((rest) => {
          if(!rest){
            this._authStatus.set(AuthStatus.notAuthenticated);
          }
          return rest;
        }),
      );
  }

  logout(){
    const token = localStorage.getItem('token');
    if(token){
      localStorage.removeItem('token');
    }
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
