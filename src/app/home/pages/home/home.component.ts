import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Importar Charts
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import { UsuarioService } from 'src/app/administracion/services/usuario.service';
import { CantidadPorRole } from 'src/app/administracion/models/usuario';
import { ProyectoService } from 'src/app/desarrollo/services/proyecto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bar: any;
  bar2: any;
  pie: any;
  public permisos;

  public cantidadPorRole: Array<CantidadPorRole> = [];
  public nombres: Array<string> = [];
  public cantidad: Array<number> = [];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService
  ) {
    this.permisos = localStorage.getItem('permisos')?.split(',');
    console.log(this.permisos);
  }

  ngOnInit(): void {
    if (this.permisos?.includes('ADMIN')) {
      //Crear Gráfico de Pie
      let nombresPie: Array<string> = [];
      let cantidadesPie: Array<number> = [];
      this.usuarioService.cantidadDeUsuarioPorRole().subscribe(async (resp) => {
        resp.cantidadPorRole.map((data) => {
          nombresPie.push(data.nombre);
          cantidadesPie.push(data.cantidad);
        });
        this.crearPie(nombresPie, cantidadesPie);
      });
    }
    if (this.permisos?.includes('DES')) {
      //Crear Gráfico de Bar 1
      let nombresBar: Array<string> = [];
      let totalTareasBar: Array<number> = [];
      let pendienteBar: Array<number> = [];
      let iniciadoBar: Array<number> = [];
      let finalizadoBar: Array<number> = [];
      this.proyectoService.cantTareas().subscribe((resp) => {
        resp.map((proyecto) => {
          nombresBar.push(proyecto.nombre);
          totalTareasBar.push(proyecto.cantidad);
          pendienteBar.push(proyecto.pendiente);
          iniciadoBar.push(proyecto.iniciado);
          finalizadoBar.push(proyecto.finalizado);
        });
        this.crearBar(
          nombresBar,
          totalTareasBar,
          pendienteBar,
          iniciadoBar,
          finalizadoBar
        );
      });
    }
    if (this.permisos?.includes('CONFIG')) {
      //Crear Gráficos de Bar 2
      let nombresBar2: Array<string> = [];
      let totalLB: Array<number> = [];
      let lbAbiertas: Array<number> = [];
      let lbCerrada: Array<number> = [];
      this.proyectoService.cantLB().subscribe((resp) => {
        console.log(resp);
        resp.map((proyecto) => {
          nombresBar2.push(proyecto.proyecto);
          totalLB.push(proyecto.cantidadLB);
          lbAbiertas.push(proyecto.cantidadLBabiertas);
          lbCerrada.push(proyecto.cantidadLBcerradas);
        });
        this.crearBar2(nombresBar2, totalLB, lbAbiertas, lbCerrada);
      });
    }
  }
  // Funcion para subir al inicio
  subirInicio(): void {
    window.scroll(0, 0);
  }
  verificarPermiso(permiso: string): Boolean {
    let ok: Boolean;
    if (this.permisos?.includes(permiso)) {
      ok = true;
    } else {
      ok = false;
    }
    return ok;
  }

  goToCrearRoles() {
    this.router.navigate(['administracion/crear-roles']);
  }

  goToCrearUsuarios() {
    this.router.navigate(['administracion/crear-usuarios']);
  }

  goToRolesUsuarios() {
    this.router.navigate(['administracion/roles-usuarios']);
  }
  goToProyectos() {
    this.router.navigate(['desarrollo/proyectos']);
  }
  goToTareas() {
    this.router.navigate(['desarrollo/tareas']);
  }
  goToLineaBase() {
    this.router.navigate(['configuracion/lineabase']);
  }

  //Crear Gráficos
  async crearPie(nombres: Array<string>, cantidades: Array<number>) {
    this.pie = document.getElementById('chartPie');

    let colores = [];
    for await (let nombre of nombres) {
      colores.push(this.colorRGB());
    }

    let pieChart = new Chart(this.pie, {
      type: 'pie',
      data: {
        labels: nombres,
        datasets: [
          {
            // label: 'My First Dataset',
            data: cantidades,
            backgroundColor: colores,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
  async crearBar(
    nombres: Array<string>,
    totalTareas: Array<number>,
    tareasPendiente: Array<number>,
    tareasIniciada: Array<number>,
    tareasFinalizadas: Array<number>
  ) {
    this.bar = document.getElementById('chartBar');

    let colores = [];
    for await (let element of [0, 1, 2, 3]) {
      colores.push(this.colorRGB());
    }

    const data = {
      labels: nombres,
      datasets: [
        {
          label: 'Total de Tareas',
          data: totalTareas,
          borderColor: colores[0],
          backgroundColor: colores[0],
        },
        {
          label: 'Tareas Pendiente',
          data: tareasPendiente,
          borderColor: colores[1],
          backgroundColor: colores[1],
        },
        {
          label: 'Tareas Iniciadas',
          data: tareasIniciada,
          borderColor: colores[2],
          backgroundColor: colores[2],
        },
        {
          label: 'Tareas Finalizadas',
          data: tareasFinalizadas,
          borderColor: colores[3],
          backgroundColor: colores[3],
        },
      ],
      options: {
        responsive: true,
      },
    };
    let barChart = new Chart(this.bar, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
  async crearBar2(
    nombresBar2: Array<string>,
    totalLB: Array<number>,
    lbAbiertas: Array<number>,
    lbCerrada: Array<number>
  ) {
    this.bar2 = document.getElementById('chartBar2');

    let colores = [];
    for await (let element of [0, 1, 2]) {
      colores.push(this.colorRGB());
    }

    const data = {
      labels: nombresBar2,
      datasets: [
        {
          label: 'Total de LB',
          data: totalLB,
          borderColor: colores[0],
          backgroundColor: colores[0],
        },
        {
          label: 'LB Abiertas',
          data: lbAbiertas,
          borderColor: colores[1],
          backgroundColor: colores[1],
        },
        {
          label: 'LB Cerradas',
          data: lbCerrada,
          borderColor: colores[2],
          backgroundColor: colores[2],
        },
      ],
      options: {
        responsive: true,
      },
    };
    let barChart = new Chart(this.bar2, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
  //Generar colores RGB de forma aleatoria
  generarNumero(numero: number) {
    return (Math.random() * numero).toFixed(0);
  }
  colorRGB() {
    let color =
      '(' +
      this.generarNumero(255) +
      ',' +
      this.generarNumero(255) +
      ',' +
      this.generarNumero(255) +
      ')';
    return 'rgb' + color;
  }
}
