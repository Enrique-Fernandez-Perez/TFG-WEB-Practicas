import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateComponent } from './users/create/create.component';
import { ListMineComponent } from './users/list-mine/list-mine.component';


const routes: Routes = [
  {
    path:'',
    component: IndexComponent,
    children:[
      {
        path:'create',
        component : CreateComponent,
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ],
      },

      {
        path:'mine',
        component : ListMineComponent,
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ],
      },

      {
        path:'edit/:{id}',
        component : CreateComponent,
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ],
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
