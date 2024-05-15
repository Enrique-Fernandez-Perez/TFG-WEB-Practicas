import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Actividades } from '../interfaces/actividades';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  baseUrl : string ='';
  private http = inject(HttpClient);

  constructor() { }

  getAll() : Observable<Actividades[]>{
    return this.http.get<Actividades[]>(`${this.baseUrl}/actividades`)
      .pipe(
        tap(actividades => actividades),
      );
  }
}
