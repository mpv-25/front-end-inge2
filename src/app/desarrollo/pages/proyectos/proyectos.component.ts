import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto, Tarea } from '../../models/proyecto.model';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  public Title = 'Proyectos';
  public proyectos: Array<Proyecto> = [];
  public form: FormGroup;
  public formularioTarea: FormGroup;
  public proyecto: Proyecto = {
    nombre: '',
    gerente: '',
    descripcion: '',
    tareas: [],
  };
  public tarea: Tarea = {
    titulo: '',
    estado: '',
    descripcion: '',
  };
  public tareas: Array<Tarea> | undefined = [this.tarea];
  constructor(
    private proyectoService: ProyectoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.formularioTarea = this.fb.group({
      estado: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      idTareaPadre: [''],
    });
    this.cargarProyectos();
  }

  ngOnInit(): void {}

  cargarProyectos() {
    this.proyectoService.getProyectos().subscribe((resp) => {
      this.proyectos = resp.proyectos;
    });
  }
  enviarFormulario() {
    if (this.form.valid) {
      let nombre = this.form.get('nombre')?.value;
      let gerente = '60246933a00573178bf6097d';
      let descripcion = this.form.get('descripcion')?.value;
      let body: Proyecto = {
        nombre,
        gerente,
        descripcion,
      };
      this.proyectoService.nuevoProyecto(body).subscribe(
        (resp) => {
          console.log('EXITOSO!!! Proyecto creado');
          this.cargarProyectos();
          this.borrarFormulario();
        },
        (err) => {
          console.warn('ERROR!!! No se creo el proyecto');
        }
      );
      console.log(this.form);
    } else {
      console.warn('ERROR!!! formulario no valido');
    }
  }
  borrarFormulario() {
    this.form.reset({
      nombre: '',
      descripcion: '',
    });
  }
  seleccionarProyecto(proyecto: Proyecto) {
    this.proyecto = proyecto;
    this.tareas = proyecto.tareas;
  }
  enviarFormularioTarea(proyecto: Proyecto) {
    if (this.formularioTarea.valid) {
      let titulo = this.formularioTarea.get('titulo')?.value;
      let estado = this.formularioTarea.get('estado')?.value;
      let descripcion = this.formularioTarea.get('descripcion')?.value;
      let idTareaPadre = this.formularioTarea.get('idTareaPadre')?.value;
      let tarea: Tarea = {
        titulo,
        estado,
        descripcion,
        id_tarea_padre: idTareaPadre,
      };
      if (proyecto.tareas == null) {
        proyecto.tareas = [];
      }
      let tareas = proyecto.tareas;
      tareas?.push(tarea);
      proyecto.tareas = tareas;

      this.proyectoService.setProyecto(proyecto._id, proyecto).subscribe(
        (resp) => {
          console.log('EXITOSO!!! Se agrego la tarea');
          console.log(resp);
          this.cargarProyectos();
          this.borrarFormularioTarea();
        },
        (err) => {
          console.warn('ERROR!!! No se agrego la tarea');
          console.warn(err);
        }
      );
      console.log(this.form);
    } else {
      console.warn('ERROR!!! formulario no valido');
    }
  }
  borrarFormularioTarea() {
    this.formularioTarea.reset({
      estado: '',
      titulo: '',
      descripcion: '',
      idTareaPadre: '',
    });
  }
}
