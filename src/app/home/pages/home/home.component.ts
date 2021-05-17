import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bar:any; line:any; pie:any;
  public permisos;
  constructor(private router: Router) {
    this.permisos = localStorage.getItem('permisos')?.split(',');
    console.log(this.permisos);
  }

  ngOnInit(): void {
    this.subirInicio();

    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Filler,
      Legend,
      Title,
      Tooltip
    );

      this.bar = document.getElementById('chartBar');
      this.line = document.getElementById('chartLine');
      this.pie = document.getElementById('chartPie');

      
      
      let barChart = new Chart(this.bar , {
        type: 'bar',
        data: {
            labels: ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 5', 'Proyecto 6'],
            datasets: [{
                label: 'Tareas por proyecto',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
            },
            responsive:false,
            // color:'#fff' color de fuente
            
        }
    });
    let lineChart = new Chart(this.line  , {
      type: 'line',
      data:{
        labels: ["Linea Base 1","Linea Base 2","Linea Base 3"],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options:{
        responsive:false,
      }
    });

    let pieChart = new Chart(this.pie, {
      type: 'pie',
      data:{
        labels: ["Usuarios Activos","Usuarios Bloqueados"],
        datasets: [{
          // label: 'My First Dataset',
          data: [300, 50],
          backgroundColor: [
            'rgb(51, 204, 0)',
            'rgb(204, 0, 0)',
          ],
          hoverOffset: 4
        }]
      },
      options:{
        responsive:false,
      }
    });
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
  // Funcion para subir al inicio
  subirInicio(): void {
    window.scroll(0, 0);
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
  
}
