import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearRolesComponent } from './pages/crear-roles/crear-roles.component';
import { ModificarRolesComponent } from './pages/modificar-roles/modificar-roles.component';



@NgModule({
  declarations: [CrearRolesComponent, ModificarRolesComponent],
  imports: [
    CommonModule
  ]
})
export class AdministracionModule { }
