import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from '../pages/index/index.component';
import { SidebarDropComponent } from 'src/app/components/sidebar-drop/sidebar-drop.component';
import { SiddebarComponent } from 'src/app/components/sidebar/siddebar.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,

    IndexComponent,
    SidebarDropComponent,
    SiddebarComponent

  ]
})
export class AdminModule { }
