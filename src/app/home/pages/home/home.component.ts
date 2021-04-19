import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public permisos;
  constructor(private router: Router) {
    this.permisos = localStorage.getItem('permisos')?.split(',');
    console.log(this.permisos);
  }

  ngOnInit(): void {
    this.subirInicio();
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
