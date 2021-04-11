import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { TareasComponent } from './pages/tareas/tareas.component';



@NgModule({
  declarations: [ProyectosComponent, TareasComponent],
  imports: [
    CommonModule
  ]
})
export class DesarrolloModule { }
