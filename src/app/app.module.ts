import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { SidebarDropComponent } from './components/sidebar-drop/sidebar-drop.component';
import { FavoritasComponent } from './users/pages/favoritas/favoritas.component';
import { RegistradasComponent } from './users/pages/registradas/registradas.component';
// import { SiddebarComponent } from './components/siddebar/siddebar.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoritasComponent,
    RegistradasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    SharedModule,
  ],
  // exports : [SiddebarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
