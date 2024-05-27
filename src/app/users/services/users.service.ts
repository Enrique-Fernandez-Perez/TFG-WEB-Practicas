import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { TokenService } from '../../auth/services/token.service';
import { enviroments } from 'src/environments/enviroments';
import { User } from 'src/app/auth/interfacess/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl : string = enviroments.baseUrl;

  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private token = inject(TokenService);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Content-Type' : 'multipart/form-data',
      'Accept':'application/json',
      'Authorization': "Bearer " + this.token.getToken()
    })
  }

  constructor() { }

  getAll() : Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users`, this.httpOptions)
      .pipe(
        tap(users => users),
      );
  }

  getRegisters() : Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users/register`, this.httpOptions)
      .pipe(
        tap(users => users),
      );
  }

  update(user : User): Observable<User>{
    return this.http.patch<User>(`${this.baseUrl}/user/${user.id}`, JSON.stringify(user), this.httpOptions)
      .pipe(
        tap(users => users),
      );
  }

  delete(id : number) : Observable<string>{
    return this.http.delete<string>(`${this.baseUrl}/user/${id}`, this.httpOptions);
  }

  findbyId(id : number) : Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/user/${id}`, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }

}
