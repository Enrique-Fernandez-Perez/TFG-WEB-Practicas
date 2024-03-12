import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region.type';
// import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl : string= 'https://restcountries.com/v3.1';

  public cacheStore : CacheStore= {
    byCapital: {term:'',countries:[]},
    byCountries: {term:'',countries:[]},
    byRegion: {region:'',countries:[]},
    // countries: [],
  }

  constructor(private http : HttpClient ) { }

  private getCountrisRequest(url : string) : Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(()=>of([])),
        // delay(2000)
      );
  }

 searchCapital( term : string) : Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountrisRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital= {term, countries})
      );
  }

  searchCountry(term: string) : Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountrisRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = {term, countries})
      );
  }

  //America, oceania, europa, asia, africa
  searchRegion(region: Region) : Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountrisRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region, countries})
      );
  }

  searchCountryAlphaCode( code : string) :  Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      // tap(countries => {if(countries.length > 0){this.cacheStore.countries.push(countries[0])}}),
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(() =>  of(null))
    );
  }
}
