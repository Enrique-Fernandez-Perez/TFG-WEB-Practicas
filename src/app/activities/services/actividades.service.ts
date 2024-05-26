import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Actividades, editActividades, postActividades } from '../interfaces/actividades';
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
      'Content-Type': 'application/json',
      // 'Content-Type' : 'multipart/form-data',
      // 'Accept':'application/json',
      // 'Accept':'multipart/form-data',
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

  getMine() : Observable<Actividades[]>{
    return this.http.get<Actividades[]>(`${this.baseUrl}/actividades/mine`, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }

  getIncriptas() : Observable<Actividades[]>{
    return this.http.get<Actividades[]>(`${this.baseUrl}/actividades/inscrito`, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }

  getFavoritas() : Observable<Actividades[]>{
    return this.http.get<Actividades[]>(`${this.baseUrl}/actividades/favoritas`, this.httpOptions)
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

  delete(id : number) : Observable<Actividades>{
    return this.http.delete<Actividades>(`${this.baseUrl}/actividades/${id}`, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }

  addRegistro(id : number) : Observable<Actividades>{
    return this.http.post<Actividades>(`${this.baseUrl}/actividades/inscribir/${id}`, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }

  addFavoritas(id : number) : Observable<Actividades>{
    return this.http.delete<Actividades>(`${this.baseUrl}/actividades/favorita/${id}`, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }

  add(item : postActividades) : Observable<Actividades>{
    return this.http.post<Actividades>(`${this.baseUrl}/actividades/`, item, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }

    // add(item : FormData) : Observable<Actividades>{
    //   return this.http.post<Actividades>(`${this.baseUrl}/actividades`, item, {headers : this.httpOptions.headers})
    //     .pipe(
    //       tap(actividades => actividades),
    //     );
    // }

  edit(item : editActividades) : Observable<Actividades>{
    return this.http.put<Actividades>(`${this.baseUrl}/actividades/${item.id}`, item, this.httpOptions)
      .pipe(
        tap(actividades => actividades),
      );
  }
}
