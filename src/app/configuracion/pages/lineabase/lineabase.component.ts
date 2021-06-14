import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LineaBase,
  Proyecto,
  Tarea,
} from 'src/app/desarrollo/models/proyecto.model';
import { ProyectoService } from 'src/app/desarrollo/services/proyecto.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lineabase',
  templateUrl: './lineabase.component.html',
  styleUrls: ['./lineabase.component.css'],
})
export class LineabaseComponent implements OnInit {
  public Title = 'Línea Base';
  public proyectos: Array<Proyecto> = [];
  public tareasTerminadas: Array<Tarea> = [];
  public tareasLineaBase: Array<Tarea> = [];
  public formularioLineaBase: FormGroup;
  public formularioTareas: FormGroup;

  private isEditProject: boolean = false;

  public lineaBase: LineaBase = {
    lineaBase: 0,
    descripcion: '',
    abierto: true,
    tareas: [],
  };

  private proyecto: Proyecto = {
    nombre: '',
    descripcion: '',
    tareas: [],
    lineasBase: [],
  };
  private tarea: Tarea = {
    titulo: '',
    estado: '',
    lineaBase: 0,
    version: 0,
    descripcion: '',
  };

  public isLoading: Boolean = false;
  constructor(
    private proyectoService: ProyectoService,
    private fb: FormBuilder
  ) {
    this.formularioLineaBase = this.fb.group({
      descripcion: ['', Validators.required],
      abierto: [true, Validators.required],
    });

    this.formularioTareas = this.fb.group({
      tareasEnLineaBase: this.fb.array([]),
    });
    this.cargarProyectos();
  }
  ngOnInit(): void {}
  get tareasEnLineaBase() {
    return this.formularioTareas.get('tareasEnLineaBase') as FormArray;
  }
  cargarProyectos() {
    this.proyectoService.getProyectos().subscribe((data) => {
      this.proyectos = data.proyectos;
    });
  }
  seleccionarProyecto(proyecto: Proyecto) {
    this.proyecto = proyecto;
    this.tareasTerminadas =
      proyecto.tareas?.filter((tarea) => {
        if (tarea.estado === 'finalizado') {
          return tarea;
        }
        return null;
      }) || [];
  }
  seleccionarLineaBase(proyecto: Proyecto, lineaBase: LineaBase) {
    this.seleccionarProyecto(proyecto);
    this.lineaBase = lineaBase;
    this.tareasLineaBase = this.tareasTerminadas.filter((tarea) => {
      if (tarea.lineaBase === 0) {
        this.tareasEnLineaBase.push(
          this.fb.control(false, Validators.required)
        );
        return tarea;
      }
      return null;
    });
  }
  borrarProyecto() {
    this.lineaBase = {
      lineaBase: 0,
      descripcion: '',
      abierto: true,
      tareas: [],
    };

    this.proyecto = {
      nombre: '',
      descripcion: '',
      tareas: [],
      lineasBase: [],
    };
    this.tarea = {
      titulo: '',
      estado: '',
      lineaBase: 0,
      version: 0,
      descripcion: '',
    };
    this.tareasTerminadas = [];
    this.tareasLineaBase = [];
    this.isEditProject = false;
    this.limpiarFormularios();
  }
  modificarLineaBase(proyecto: Proyecto, lineaBase: LineaBase) {
    this.isEditProject = true;
    this.seleccionarLineaBase(proyecto, lineaBase);
    this.formularioLineaBase.reset({
      descripcion: this.lineaBase.descripcion,
      abierto: this.lineaBase.abierto,
    });
  }
  enviarFormularioLineaBase() {
    if (this.formularioLineaBase.valid) {
      this.isLoading = true;
      //Agregar linea base
      if (this.proyecto.lineasBase == null) {
        this.proyecto.lineasBase = [];
      }
      let lineaBase = this.proyecto.lineasBase.length + 1;
      let descripcion = this.formularioLineaBase.get('descripcion')?.value;
      let abierto = this.formularioLineaBase.get('abierto')?.value;
      let tareas: Array<Tarea> = [];
      let nuevaLineaBase = {
        lineaBase,
        descripcion,
        abierto,
        tareas,
      };
      if (this.isEditProject) {
        let lineasBase = this.proyecto.lineasBase.map((lb) => {
          if (lb.lineaBase == this.lineaBase.lineaBase) {
            lb.abierto = abierto;
            lb.descripcion = descripcion;
          }
          return lb;
        });
        this.proyecto.lineasBase = lineasBase;
      } else {
        this.proyecto.lineasBase.push(nuevaLineaBase);
      }
      let _id = this.proyecto._id;
      let body = {
        nombre: this.proyecto.nombre,
        descripcion: this.proyecto.descripcion,
        tareas: this.proyecto.tareas,
        lineasBase: this.proyecto.lineasBase,
      };
      this.proyectoService.modificarProyecto(_id, body).subscribe(
        (resp) => {
          console.log('SE AGREGO LA LINEA BASE');
          this.cerrarModal('cerrar-modal-lineaBase');
          this.borrarProyecto();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'ÉXITO!!!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        },
        (err) => {
          console.warn('ERROR!!! No se agrego la Línea Base');
          console.warn(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error',
            footer: 'ERROR!!!',
          });
          this.isLoading = false;
          console.warn(err);
        }
      );
    } else {
      console.warn('ERROR!!! Ocurrio un error');
    }
  }
  cerrarModal(idButton: string) {
    let button = document.getElementById(idButton);
    button?.click();
  }
  enviarFormularioTareas() {
    if (this.formularioTareas.valid) {
      this.isLoading = true;
      let _id = this.proyecto._id;
      let lineaBase = this.lineaBase;
      let nuevasTareas: Array<Tarea> = [];
      let tareas: Array<Tarea> = [];

      //Actualizar la propiedad de lineaBase de tareas de proyecto
      let contador = 0;
      tareas =
        this.proyecto.tareas?.map((tarea) => {
          if (this.tareasLineaBase.includes(tarea)) {
            if (this.tareasEnLineaBase.controls[contador].value) {
              tarea.lineaBase = lineaBase.lineaBase;
              nuevasTareas.push(tarea);
            }
            ++contador;
          }
          return tarea;
        }) || [];

      //Actualizar la propiedad lineasBase del proyecto.
      let lineasBase = this.proyecto.lineasBase?.map((lb) => {
        if (lb.lineaBase === lineaBase.lineaBase) {
          lb.tareas = [...lb.tareas, ...nuevasTareas];
        }
        return lb;
      });
      //Crear el body
      let body = {
        nombre: this.proyecto.nombre,
        descripcion: this.proyecto.descripcion,
        tareas,
        lineasBase,
      };
      //Guardar el proyecto
      this.proyectoService.modificarProyecto(_id, body).subscribe(
        (resp) => {
          console.log('EXITO!!! El proyeccto se guardo con exito', resp);
          this.cerrarModal('cerrar-modal-tarea');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se agrego la tarea',
            showConfirmButton: false,
            timer: 1500,
          });
          this.isLoading = false;
        },
        (err) => {
          console.warn('ERROR!!! El proyecto no se guardo', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error',
            footer: 'No es posible agregar la tarea',
          });
          this.isLoading = false;
        }
      );
    }
  }

  limpiarFormularios() {
    this.formularioLineaBase.reset({
      descripcion: '',
      abierto: true,
    });
    this.formularioTareas.reset({
      tareasEnLineaBase: this.fb.array([]),
    });
  }
}
