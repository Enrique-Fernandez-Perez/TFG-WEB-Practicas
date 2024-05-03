import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { RouterModule, RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    RouterOutlet,
  ]
})
export class UsersModule { }
