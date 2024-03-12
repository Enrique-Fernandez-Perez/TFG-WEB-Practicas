import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <P>Count: {{counter}}</P>
  <button (click)="incrementBy(+1)">+1</button>
  <button (click)="setCounter(10)">Reset</button>
  <button (click)="incrementBy(-1)">-1</button>
  `
})
export class CounterComponent {
  counter : number = 10;

  public incrementBy( value : number) : void{
    this.counter += value;
  }

  setCounter(value:number) : void{
    this.counter = value;
  }
}
