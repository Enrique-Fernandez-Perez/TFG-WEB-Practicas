import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { RediretUserGuard } from './auth/guards/rediret-user.guard';
import { RediretAdminGuard } from './auth/guards/rediret-admin.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren : ()=>import('./auth/auth.module').then(m=> m.AuthModule),
  },

  {
    path:'user',
    loadChildren : ()=>import('./users/users.module').then(m=> m.UsersModule),
    canActivate : [RediretUserGuard]
  },

  {
    path:'admin',
    loadChildren : ()=>import('./users/admin/admin.module').then(m=> m.AdminModule),
    canActivate : [RediretAdminGuard]
  },

  {
    path:'activities',
    loadChildren : ()=>import('./activities/activities.module').then(m => m.ActivitiesModule),
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
