import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';

import { PrimeNgModule } from './prime-ng/prime-ng.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Configuración de lenguaje local de la app
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs);
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    SharedModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue:'es-HN'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
