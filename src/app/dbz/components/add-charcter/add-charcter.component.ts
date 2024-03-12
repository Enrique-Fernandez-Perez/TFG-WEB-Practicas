import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'dbz-add-charcter',
  templateUrl: './add-charcter.component.html',
  styleUrls: ['./add-charcter.component.css']
})
export class AddCharcterComponent {

  @Output()
  public onNewCharacter : EventEmitter<Character> = new EventEmitter();

  public character :Character = {
    name:'Vulma',
    power:0

  };

  emitCharacter():void{

    // debugger;

    if(!this.character.name || this.character.power < 0){return}

    this.onNewCharacter.emit(this.character);

    this.character ={
      name:'',
      power:0
    }
  }

}
