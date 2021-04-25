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
    descripcion: '',
    tareas: [],
  };
  public tarea: Tarea = {
    titulo: '',
    estado: '',
    version: 0,
    descripcion: '',
  };
  public tareas: Array<Tarea> | undefined = [this.tarea];
  public tareaEditada: string = '';
  public isEditingProject: boolean = false;

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
      version: [0, Validators.required],
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
      let descripcion = this.form.get('descripcion')?.value;
      if (!this.isEditingProject) {
        let body: Proyecto = {
          nombre,
          descripcion,
          tareas: [],
          lineasBase: [],
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
      } else {
        let _id = this.proyecto._id;
        let tareas = this.proyecto.tareas || [];
        let lineasBase = this.proyecto.lineasBase || [];
        let body = {
          nombre,
          descripcion,
          tareas,
          lineasBase,
        };
        this.proyectoService.modificarProyecto(_id, body).subscribe(
          (resp) => {
            this.cargarProyectos();
            this.isEditingProject = false;
            this.proyecto = {
              nombre: '',
              descripcion: '',
              tareas: [],
            };
            console.log('EXITOSO!!! Proyecto Modificado');
          },
          (err) => {
            console.warn('ERROR!!! No se agrego la tarea');
            console.warn(err);
          }
        );
      }
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
      let version = this.formularioTarea.get('version')?.value;
      //actualizar la versión de la tarea
      ++version;
      if (proyecto.tareas == null) {
        proyecto.tareas = [];
      }
      if (proyecto.lineasBase == null) {
        proyecto.lineasBase = [];
      }
      let nuevaTareas: Array<Tarea>;
      if (!this.isEditingProject) {
        let tarea: Tarea = {
          titulo,
          estado,
          version,
          descripcion,
          id_tarea_padre: idTareaPadre,
        };
        nuevaTareas = proyecto.tareas;
        nuevaTareas.push(tarea);
      } else {
        nuevaTareas = proyecto.tareas.map((tarea) => {
          if (tarea._id == this.tareaEditada) {
            return {
              _id: tarea._id,
              titulo,
              estado,
              version,
              descripcion,
              id_tarea_padre: idTareaPadre,
            };
          }
          return tarea;
        });
      }
      let _id = proyecto._id;
      let body = {
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        tareas: nuevaTareas,
        lineasBase: proyecto.lineasBase,
      };
      this.proyectoService.modificarProyecto(_id, body).subscribe(
        (resp) => {
          this.cargarProyectos();
          this.borrarFormularioTarea();
          console.log('EXITOSO!!! Proyecto Modificado');
        },
        (err) => {
          console.warn('ERROR!!! No se agrego la tarea');
          console.warn(err);
        }
      );
    } else {
      console.warn('ERROR!!! formulario no valido');
    }
  }
  borrarFormularioTarea() {
    this.formularioTarea.reset({
      estado: '',
      version: 0,
      titulo: '',
      descripcion: '',
      idTareaPadre: '',
    });
    this.isEditingProject = false;
    this.proyecto = {
      nombre: '',
      descripcion: '',
      tareas: [],
    };
    this.tarea = {
      titulo: '',
      estado: '',
      version: 0,
      descripcion: '',
    };
  }
  editarProyecto(proyecto: Proyecto) {
    this.isEditingProject = true;
    this.proyecto = proyecto;
    this.form.reset({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
    });
  }
  seleccionarTarea(proyecto: Proyecto, tarea: Tarea) {
    this.proyecto = proyecto;
    this.formularioTarea.reset({
      estado: tarea.estado,
      version: tarea.version,
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      idTareaPadre: tarea.id_tarea_padre,
    });
    this.tareas = proyecto.tareas;
    this.isEditingProject = true;
    this.tareaEditada = tarea._id || '';
  }
  eliminarTarea(proyecto: Proyecto, idTarea: string | undefined) {
    let nuevaTareas: Array<Tarea> | undefined;
    nuevaTareas = proyecto.tareas?.filter((tarea) => {
      if (tarea._id != idTarea) {
        return tarea;
      }
      return;
    });
    let body = {
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      tareas: nuevaTareas,
    };
    this.proyectoService.modificarProyecto(proyecto._id, body).subscribe(
      (resp) => {
        console.log('EXITO!!! La tarea fue eliminada');
        this.cargarProyectos();
      },
      (err) => {
        console.warn('ERROR!!! La tarea no fue eliminada');
      }
    );
  }
  eliminarProyecto(idProyecto: string) {
    this.proyectoService.borrarProyecto(idProyecto).subscribe(
      (resp) => {
        this.cargarProyectos();
      },
      (err) => {
        console.warn(err);
      }
    );
  }
}
