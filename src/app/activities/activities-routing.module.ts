import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './users/create/create.component';
import { ListMineComponent } from './users/list-mine/list-mine.component';
import { ListActivitiesComponent } from './pages/list-activities/list-activities.component';
import { EditComponent } from './users/edit/edit.component';
import { AddImageComponent } from './users/add-image/add-image.component';
import { MyIndexComponent } from './users/my-index/my-index.component';
import { ListComponent } from './users/list/list.component';
import { AuthGuard } from '../auth/guards/auth.guard';


const routes: Routes = [
  {
    path:'',
    component: IndexComponent,
    children:[
      {
        path:'user',
        component : MyIndexComponent,
        // children :[
        //   {
        //     path:'create',
        //     component : CreateComponent,
        //   },

        //   {
        //     path:'mine',
        //     component : ListMineComponent,
        //   },

        //   {
        //     path:'edit/:{id}',
        //     component : EditComponent,
        //   },

        //   {
        //     path:'addImage/:{id}',
        //     component : AddImageComponent,
        //   },

        //   {
        //     path:'',
        //     component : ListComponent,
        //   },

        //   {
        //     path:'**',
        //     redirectTo:'user',
        //     pathMatch : 'full',
        //   },
        // ]
      },

      {
        path:'',
        component : ListActivitiesComponent,
      },

      {
        path:'**',
        redirectTo:'',
        pathMatch : 'full',
      },

      // { path:'new-hero', component:NewPageComponent,},
      // {
      //   path:'search',
      //   component:SearchPageComponent,
      // },
      // {
      //   path:'edit/:id',
      //   component:NewPageComponent,
      // },
      // {
      //   path:'list',
      //   component:ListPageComponent,
      // },
      // {
      //   path:':id',
      //   component:HeroPageComponent,
      // },
      // {
      //   path:'**',
      //   redirectTo:'list',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
