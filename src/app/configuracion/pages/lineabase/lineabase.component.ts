import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto, Tarea } from 'src/app/desarrollo/models/proyecto.model';
import { ProyectoService } from 'src/app/desarrollo/services/proyecto.service';

@Component({
  selector: 'app-lineabase',
  templateUrl: './lineabase.component.html',
  styleUrls: ['./lineabase.component.css'],
})
export class LineabaseComponent implements OnInit {
  public proyectos: Array<Proyecto> = [];
  public tareasTerminadas: Array<Tarea> = [];
  public formularioLineaBase: FormGroup;
  public formularioTareas: FormGroup;

  private proyecto: Proyecto = {
    nombre: '',
    descripcion: '',
    tareas: [],
    lineasBase: [],
  };
  private tarea: Tarea = {
    titulo: '',
    estado: '',
    version: 0,
    descripcion: '',
  };
  constructor(
    private proyectoService: ProyectoService,
    private fb: FormBuilder
  ) {
    this.proyectoService.getProyectos().subscribe((data) => {
      this.proyectos = data.proyectos;
      console.log(data);
    });
    this.formularioLineaBase = fb.group({
      descripcion: ['', Validators.required],
      abierto: [true, Validators.required],
    });
    this.formularioTareas = this.fb.group({
      _id: [''],
      agregarLineaBase: false,
    });
  }
  Title = 'Linea Base';
  ngOnInit(): void {}

  seleccionarProyecto(proyecto: Proyecto) {
    this.proyecto = proyecto;
    this.tareasTerminadas =
      proyecto.tareas?.filter((tarea) => {
        if (tarea.estado === 'finalizado') {
          return tarea;
        }
        return null;
      }) || [];

    console.log(this.tareasTerminadas);
  }
  borrarProyecto() {
    this.proyecto = {
      nombre: '',
      descripcion: '',
      tareas: [],
      lineasBase: [],
    };
  }
  enviarFormularioLineaBase() {
    if (this.formularioLineaBase.valid) {
      console.log(this.formularioLineaBase.value);
      console.log(this.proyecto);
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
      this.proyecto.lineasBase.push(nuevaLineaBase);
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
          this.borrarProyecto();
        },
        (err) => {
          console.warn('ERROR!!! No se agrego la Línea Base');
          console.warn(err);
        }
      );
    } else {
      console.warn('ERROR!!! Ocurrio un error');
    }
  }
  enviarFormularioTareas() {}
}
