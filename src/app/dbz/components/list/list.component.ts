import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input()
  public characterList : Character[] = [
    {
      name:"Goku",
      power:100
    }];

    @Output()
    public onDeleteId : EventEmitter<string> = new EventEmitter();
    // public onDeleteId : EventEmitter<number> = new EventEmitter();

    /**
     * emit event to deleted item of list, view to main-page
     * @param {number} index
     * @memberof ListComponent
     */
    // onDeletedCharater(index : number):void{
    //   //TODO: emitie el id del personaje
    //   this.onDeleteId.emit(index);
    onDeletedCharaterById(id : string):void{
      //TODO: emitie el id del personaje
      this.onDeleteId.emit(id);
    }
}
