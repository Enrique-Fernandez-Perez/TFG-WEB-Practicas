import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { EditComponent } from './users/edit/edit.component';
import { CreateComponent } from './users/create/create.component';
import { ListComponent } from './users/list/list.component';
import { ShowComponent } from './users/show/show.component';
import { IndexComponent } from './pages/index/index.component';
import { SearchComponent } from './pages/search/search.component';
import { ImagesComponent } from './users/create/images/images.component';
import { ListMineComponent } from './users/list-mine/list-mine.component';


@NgModule({
  declarations: [
    EditComponent,
    CreateComponent,
    ListComponent,
    ShowComponent,
    IndexComponent,
    SearchComponent,
    ImagesComponent,
    ListMineComponent,
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule
  ]
})
export class ActivitiesModule { }
