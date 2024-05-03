import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren : ()=>import('./auth/auth.module').then(m=> m.AuthModule),
    // canActivate: [ PublicGuard ],
    // canMatch: [ PublicGuard ],
  },

  {
    path:'user',
    loadChildren : ()=>import('./users/users.module').then(m=> m.UsersModule),
    // canActivate: [ PublicGuard ],
    // canMatch: [ PublicGuard ],

    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ],
  },

  {
    path:'activities',
    loadChildren : ()=>import('./activities/activities.module').then(m => m.ActivitiesModule),
    // canActivate: [ PublicGuard ],
    // canMatch: [ PublicGuard ],
  },

  {
    path:'404',
    component : Error404PageComponent,
  },

  {
    path:'',
    redirectTo: 'activities',
    pathMatch: 'full',
  },

  {
    path:'**',
    redirectTo: '404',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
