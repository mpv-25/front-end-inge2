import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.subirInicio();
  }
   // Funcion para subir al inicio
  subirInicio(): void{
    window.scroll(0, 0);
  }
   
  goToCrearRoles(){
    this.router.navigate(['administracion/crear-roles']);
  }

  goToCrearUsuarios(){
    this.router.navigate(['administracion/crear-usuarios']);
  }

  goToRolesUsuarios(){
    this.router.navigate(['administracion/roles-usuarios']);
  }
}
