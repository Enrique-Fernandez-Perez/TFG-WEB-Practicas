import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { MyIndexComponent } from './pages/my-index/my-index.component';
import { AdminIndexComponent } from './admin/pages/index/index.component';
import { AdminMyIndexComponent } from './admin/pages/my-index/my-index.component';

const routes: Routes = [

  //LLeva a la vista del administrador, mediante la gestion de rutas del modulo
  {
    path:'admin',
    component : AdminIndexComponent,
    children:[
      {
        path:'',
        component : AdminMyIndexComponent,
        loadChildren : ()=> import('./admin/admin.module').then(m => m.AdminModule),
      },

      {
        path:'**',
        redirectTo:'',
        pathMatch : 'full',
      },
    ],
  },

  //Gestionn del resto de rutas de usuarios
  {
    path:'',
    component: IndexComponent,
    children:[
      {
        path:'activities',
        component : MyIndexComponent,
      },

      {
        path:'**',
        redirectTo:'activities',
        pathMatch : 'full',
      },
    ],
  },


  // {
  //   path:'admin',
  //   loadChildren : ()=>import('./admin/admin.module').then(m=> m.AdminModule),
  // },

  // {
  //   path:'activities',
  //   loadChildren : ()=>import('./pages/my-index/my-index.component').then(m => m.MyIndexComponent),
  // },

  // {
  //   path:'',
  //   redirectTo: 'activities',
  // },

  // {
  //   path:'**',
  //   redirectTo: 'activities',
  //   // pathMatch: 'full',
  // },

  /* {
    path:'',
    component : MyIndexComponent
  },

  {
    path:'activities',
    loadChildren : ()=>import('./pages/my-index/my-index.component').then( m=> m.MyIndexComponent)
  },

  {
    path:'admin',
    loadChildren : ()=>import('./admin/my-index/my-index.component').then( m=> m.MyIndexComponent)
    // loadChildren : ()=>import('./admin/admin.module').then(m=> m.AdminModule),
  },

  {
    path:'**',
    redirectTo: 'activities',
    pathMatch : 'full'
  }, */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
