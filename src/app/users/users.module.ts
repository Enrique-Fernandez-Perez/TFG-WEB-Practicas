import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { IndexComponent } from './pages/index/index.component';
import { SiddebarComponent } from '../components/sidebar/siddebar.component';
import { SidebarDropComponent } from '../components/sidebar-drop/sidebar-drop.component';


@NgModule({
  declarations: [
    EditComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,

    IndexComponent,
    SiddebarComponent,
    SidebarDropComponent
  ],
})
export class UsersModule { }
