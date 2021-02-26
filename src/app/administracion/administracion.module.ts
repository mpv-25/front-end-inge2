import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearRolesComponent } from './pages/crear-roles/crear-roles.component';
import { ModificarRolesComponent } from './pages/modificar-roles/modificar-roles.component';
import { CrearUsuariosComponent } from './pages/crear-usuarios/crear-usuarios.component';
import { ModificarUsuariosComponent } from './pages/modificar-usuarios/modificar-usuarios.component';
import { RolesUsuariosComponent } from './pages/roles-usuarios/roles-usuarios.component';




@NgModule({
  declarations: [CrearRolesComponent, ModificarRolesComponent, CrearUsuariosComponent, ModificarUsuariosComponent, RolesUsuariosComponent],
  imports: [
    CommonModule
  ]
})
export class AdministracionModule { }
