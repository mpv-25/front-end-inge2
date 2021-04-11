import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//http
import { HttpClientModule} from'@angular/common/http';
//Formulario reactivo
import { ReactiveFormsModule } from '@angular/forms'
//Componentes
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { TareasComponent } from './pages/tareas/tareas.component';



@NgModule({
  declarations: [ProyectosComponent, TareasComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DesarrolloModule { }
