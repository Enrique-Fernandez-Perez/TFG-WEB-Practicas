import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { EditComponent } from './users/edit/edit.component';
import { CreateComponent } from './users/create/create.component';
import { ListComponent } from './users/list/list.component';
import { ShowComponent } from './users/show/show.component';
import { IndexComponent } from './pages/index/index.component';
import { SearchComponent } from './pages/search/search.component';
import { ListMineComponent } from './users/list-mine/list-mine.component';
import { ListActivitiesComponent } from './pages/list-activities/list-activities.component';
import { AddImageComponent } from './users/add-image/add-image.component';
import { MyIndexComponent } from './users/my-index/my-index.component';
import { HttpClientModule } from '@angular/common/http';
import { ActividadesService } from './services/actividades.service';

import { CarrouselComponent } from '../components/carrousel/carrousel.component';
import { RouterModule } from '@angular/router';
import { SidebarDropComponent } from '../components/sidebar-drop/sidebar-drop.component';
import { SiddebarComponent } from '../components/sidebar/siddebar.component';


@NgModule({
  declarations: [
    EditComponent,
    CreateComponent,
    ListComponent,
    ShowComponent,
    IndexComponent,
    SearchComponent,
    ListMineComponent,
    ListActivitiesComponent,
    AddImageComponent,
    MyIndexComponent,
    CarrouselComponent,
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    HttpClientModule,
    RouterModule,

    SiddebarComponent,
    SidebarDropComponent
  ],
  providers : [
    ActivitiesModule,
    ActividadesService,
  ]
})
export class ActivitiesModule { }
