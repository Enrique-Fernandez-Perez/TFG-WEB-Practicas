import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { ListComponent } from './components/list/list.component';
import { AddCharcterComponent } from './components/add-charcter/add-charcter.component';



@NgModule({
  declarations: [
    MainPageComponent,
    ListComponent,
    AddCharcterComponent
  ],
  exports:[
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DbzModule { }
