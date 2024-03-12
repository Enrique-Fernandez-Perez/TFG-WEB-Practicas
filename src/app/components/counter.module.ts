import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterComponent } from './counter/counter.component';
import { HeroComponent } from './heroes/hero/hero.component';
import { ListComponent } from './heroes/list/list.component';

@NgModule({
  declarations: [
    CounterComponent,
    HeroComponent,
    ListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CounterComponent,
    HeroComponent,
    ListComponent
  ]
})
export class CounterModule { }
