import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Paginas
import { LoginComponent } from './pages/login/login.component';

//Importar Http
import { HttpClientModule } from "@angular/common/http";

//Importar formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
