import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-roles',
  templateUrl: './crear-roles.component.html',
  styleUrls: ['./crear-roles.component.css']
})
export class CrearRolesComponent implements OnInit {
  public Title = "Crear Roles"
  public RolSistemaChecked = false;

  constructor() { }

  ngOnInit(): void {
  }

  onTipoRolChange(event:any){
     this.RolSistemaChecked = event.target.value.includes('sistema');
   }

}
