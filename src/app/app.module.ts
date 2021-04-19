import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Modulos personalizados
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import {AdministracionModule} from './administracion/administracion.module';
import {DesarrolloModule} from './desarrollo/desarrollo.module';
import {ConfiguracionModule} from './configuracion/configuracion.module';
//Importar ngrx
import { StoreModule } from "@ngrx/store";
import { miReducer } from "./app.reducer";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    AdministracionModule,
    ConfiguracionModule,
    SharedModule,
    StoreModule.forRoot({
      login: miReducer
    }),
    AdministracionModule,
    DesarrolloModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
