import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { MyIndexComponent } from './pages/my-index/my-index.component';

import { CreateComponent } from '../pages/create/create.component';
import { ListMineComponent } from '../pages/list-mine/list-mine.component';
import { EditComponent } from '../pages/edit/edit.component';
import { AddImageComponent } from '../pages/add-image/add-image.component';

import { CreateUserComponent } from './users/create/create-user.component';
import { ListUsersComponent } from './users/list/list-users.component';
import { ShowUserComponent } from './users/show/show-user.component';
import { EditUserComponent } from './users/edit/edit-user.component';


const routes: Routes = [
  {
    path:'',
    component: IndexComponent,
    children:[
      {
        path:'activities',
        component : MyIndexComponent,
      },

    ],
  },

  {
    path:'activitie',
    component: IndexComponent,
    children:[
        {
          path:'create',
          component : CreateComponent,
        },

        {
          path:'mine',
          component : ListMineComponent,
        },

        {
          path:'edit/:{id}',
          component : EditComponent,
        },

        {
          path:'addImage/:{id}',
          component : AddImageComponent,
        },

        {
          path:'**',
          redirectTo:'',
          pathMatch : 'full',
        },

      ],
  },

  {
    path:'users',
    component: IndexComponent,
    children:[
        {
          path:'create',
          component : CreateUserComponent,
        },

        {
          path:'listUser',
          component : ListUsersComponent,
        },
        
        {
          path:'register',
          component : EditUserComponent,
        },

        {
          path:'**',
          redirectTo:'',
          pathMatch : 'full',
        },

      ],
  },

  {
    path:'user',
    component: IndexComponent,
    children:[
      {
        path:'show/:{id}',
        component : ShowUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
