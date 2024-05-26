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
import { ListMineComponent } from './pages/list-mine/list-mine.component';
import { CarrouselComponent } from '../components/carrousel/carrousel.component';
import { UsersService } from './services/users.service';
import { ActivitiesModule } from '../activities/activities.module';


@NgModule({
  declarations: [
    EditComponent,
    CreateComponent,
    // CarrouselComponent,
    ListMineComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,

    ActivitiesModule,

    IndexComponent,
    SiddebarComponent,
    SidebarDropComponent,
  ],
})
export class UsersModule { }
