import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Componentes del modulo
import { CrearRolesComponent } from './pages/crear-roles/crear-roles.component';
import { CrearUsuariosComponent } from './pages/crear-usuarios/crear-usuarios.component';
import { RolesUsuariosComponent } from './pages/roles-usuarios/roles-usuarios.component';

//Importar httpModule
import { HttpClientModule } from '@angular/common/http';
//Importar Formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CrearRolesComponent,
    CrearUsuariosComponent,
    RolesUsuariosComponent,
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [HttpClientModule, ReactiveFormsModule],
})
export class AdministracionModule {}
