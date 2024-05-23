import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from '../pages/index/index.component';
import { SidebarDropComponent } from 'src/app/components/sidebar-drop/sidebar-drop.component';
import { SiddebarComponent } from 'src/app/components/sidebar/siddebar.component';
import { EditUserComponent } from './users/edit/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './users/list/list-users.component';


@NgModule({
  declarations: [
    EditUserComponent,
    ListUsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,

    IndexComponent,
    SidebarDropComponent,
    SiddebarComponent

  ]
})
export class AdminModule { }
