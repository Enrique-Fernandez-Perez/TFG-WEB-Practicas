import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gif, SearchResponse } from '../interfaces/gifs';

// const GIPHY_API_KEY : string = '9lxuSLGc8gHp5sv4z6HdaMICF3XNBkJA';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList : Gif[] =  [];

  private _tagsHistory : string[] = [];

  private apiKey : string = "9lxuSLGc8gHp5sv4z6HdaMICF3XNBkJA";
  private seviceUrl : string= 'https://api.giphy.com/v1/gifs';

  public numResult : number = 10;

  constructor(private http : HttpClient) {
    this.loadLocalStorage();
   }

  private saveLocalStorage():void{
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('tagsHistory')){return;}

    this._tagsHistory = JSON.parse(localStorage.getItem('tagsHistory')!);

    if(this._tagsHistory.length === 0){return;}

    this.searchTag(this._tagsHistory['0']);
  }


  get tagsHistory(): string[]{
    return [...this._tagsHistory];
  }

  private organizedHistory(tag: string){
    tag=tag.toLocaleLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this.tagsHistory.splice(0,10);

    this.saveLocalStorage();
  }

  public searchTag(tag:string) : void{
    if(!tag){
      return
    }

    this.organizedHistory(tag);

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=9lxuSLGc8gHp5sv4z6HdaMICF3XNBkJA&limit=10&q=valorant').
    //   then(resp=> resp.json()).
    //   then(data=>console.log(data));

    const params : HttpParams = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit',this.numResult)
      .set('q',tag);


    this.http.get<SearchResponse>(`${ this.seviceUrl }/search`, {params})
      .subscribe(resp=> {
        this.gifsList = resp.data;
      });
  }
}
