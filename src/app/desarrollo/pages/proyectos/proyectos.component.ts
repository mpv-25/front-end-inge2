import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto, Tarea } from '../../models/proyecto.model';
import { ProyectoService } from '../../services/proyecto.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

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
    lineaBase: 0,
    version: 0,
    descripcion: '',
  };
  public tareas: Array<Tarea> | undefined = [this.tarea];
  public tareaEditada: string = '';
  public isEditingProject: boolean = false;

  public isLoading: boolean = false;

  constructor(
    private proyectoService: ProyectoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.formularioTarea = this.fb.group({
      estado: ['pendiente', Validators.required],
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
  cerrarModal(idButton: string) {
    let button = document.getElementById(idButton);
    button?.click();
  }

  enviarFormulario() {
    if (this.form.valid) {
      this.isLoading = true;
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
            console.log('EXITOSO!!! El proyecto fue creado');
            this.cargarProyectos();
            this.cerrarModal('btn-modal-proyecto');
            this.borrarFormulario();

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El proyecto fue creado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.isLoading = false;
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error',
              footer: 'No es posible crear el proyecto.',
            });
            this.isLoading = false;
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
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El proyecto fue modificado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.isLoading = false;
          },
          (err) => {
            console.warn('ERROR!!! No se agrego la tarea');
            console.warn(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error',
              footer: 'No es posible modificar el proyecto.',
            });
            this.isLoading = false;
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
      this.isLoading = true;
      let titulo = this.formularioTarea.get('titulo')?.value;
      let estado = this.formularioTarea.get('estado')?.value;
      let descripcion = this.formularioTarea.get('descripcion')?.value;
      let idTareaPadre = this.formularioTarea.get('idTareaPadre')?.value;
      let version = this.formularioTarea.get('version')?.value;
      let lineaBase = 0;
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
          lineaBase,
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
              lineaBase: tarea.lineaBase,
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
          this.cerrarModal('btn-modal-tarea');
          this.borrarFormularioTarea();
          console.log('Tarea agregada');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tarea agregada',
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        },
        (err) => {
          console.warn('No se agrego la tarea');
          console.warn(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error',
            footer: 'No se agrego la tarea',
          });
          this.isLoading = false;
        }
      );
    } else {
      console.warn('ERROR!!! formulario no valido');
    }
  }
  borrarFormularioTarea() {
    this.formularioTarea.reset({
      estado: 'pendiente',
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
      lineaBase: 0,
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
