import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';

import { v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DbzService {

  public characters : Character[] = [
      {
        id:uuid(),
        name:"Goku",
        power:1500
      },
      {
        id:uuid(),
        name:"Vegeta",
        power:6500
      },
      {
        id:uuid(),
        name:"Krilin",
        power:100
      },
    ];

    public addCharacter(character : Character): void{
      const newCharacter : Character = {...character, id:uuid()};
      this.characters.push(newCharacter);
    }

    // public onDeleteCharacter(index : number): void{
    //   this.characters.splice(index, 1);
    public deleteCharacterById( id: string){
      this.characters = this.characters.filter(item => item.id !== id);
    }

    constructor() { }
}
