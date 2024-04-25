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
    path:'activities',
    loadChildren : ()=>import('./activities/activities.module').then(m => m.ActivitiesModule),
    // canActivate: [ AuthGuard ],
    // canMatch: [ AuthGuard ],
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
