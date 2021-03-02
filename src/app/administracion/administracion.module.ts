import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearRolesComponent } from './pages/crear-roles/crear-roles.component';
import { CrearUsuariosComponent } from './pages/crear-usuarios/crear-usuarios.component';
import { RolesUsuariosComponent } from './pages/roles-usuarios/roles-usuarios.component';




@NgModule({
  declarations: [CrearRolesComponent, CrearUsuariosComponent, RolesUsuariosComponent],
  imports: [
    CommonModule
  ]
})
export class AdministracionModule { }
