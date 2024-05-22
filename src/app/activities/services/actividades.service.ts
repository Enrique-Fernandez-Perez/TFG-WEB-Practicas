import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Actividades } from '../interfaces/actividades';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { TokenService } from '../../auth/services/token.service';
import { enviroments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  baseUrl : string = enviroments.baseUrl;

  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private token = inject(TokenService);

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Content-Type' : 'multipart/form-data',
      'Accept':'application/json',
      'Authorization': "Bearer " + this.token.getToken()
    })
  }

  constructor() { }

  getAll() : Observable<Actividades[]>{
    return this.http.get<Actividades[]>(`${this.baseUrl}/actividades`, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }
  
  findbyId(id : number) : Observable<Actividades>{
    return this.http.get<Actividades>(`${this.baseUrl}/actividades/${id}`, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }
}
