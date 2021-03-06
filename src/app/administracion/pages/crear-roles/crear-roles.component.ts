import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleBD, NewRole } from '../../models/role';
import { RoleService } from '../../services/role.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-roles',
  templateUrl: './crear-roles.component.html',
  styleUrls: ['./crear-roles.component.css'],
})
export class CrearRolesComponent implements OnInit {
  public Title = 'Roles';
  public RolSistemaChecked = false;
  public roleForm: FormGroup;
  public listaRoles: Array<RoleBD> = [];
  private nuevoRole = true;
  private idRole: string = '';
  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      administracion: [false],
      configuracion: [false],
      proyecto: [false],
    });
    this.cargarListaRoles();
  }

  ngOnInit(): void {}
  cargarListaRoles() {
    this.roleService.getRoles().subscribe((data) => {
      this.listaRoles = data.roles;
    });
  }
  limpiarFormulario() {
    this.roleForm.reset({
      nombre: '',
      descripcion: '',
      administracion: false,
      configuracion: false,
      proyecto: false,
    });
    this.idRole = '';
  }
  cargarFormulario(id: string) {
    this.limpiarFormulario();
    this.roleService.getRole(id).subscribe((data) => {
      this.nuevoRole = false;
      this.idRole = id;
      let nombre = data.role.nombre;
      let descripcion = data.role.descripcion;
      let administracion = false;
      let configuracion = false;
      let proyecto = false;
      if (data.role.permisos.indexOf('ADMIN') >= 0) {
        administracion = true;
      }
      if (data.role.permisos.indexOf('CONFIG') >= 0) {
        configuracion = true;
      }
      if (data.role.permisos.indexOf('PROY') >= 0) {
        proyecto = true;
      }

      this.roleForm.reset({
        nombre: nombre,
        descripcion: descripcion,
        administracion: administracion,
        configuracion: configuracion,
        proyecto: proyecto,
      });
    });
  }
  enviarFormulario() {
    if (this.roleForm.valid) {
      let permisos = []; //arreglo de permisos
      let nombre = this.roleForm.get('nombre')?.value;
      let descripcion = this.roleForm.get('descripcion')?.value;

      if (this.roleForm.get('administracion')?.value) {
        permisos.push('ADMIN');
      }
      if (this.roleForm.get('configuracion')?.value) {
        permisos.push('CONFIG');
      }
      if (this.roleForm.get('proyecto')?.value) {
        permisos.push('PROY');
      }

      let body = {
        nombre,
        descripcion,
        permisos,
      };
      if (this.nuevoRole) {
        //Enviar body a la api
        this.roleService.crearRole(body).subscribe(
          (resp) => {
            this.cargarListaRoles();
            this.limpiarFormulario();

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El rol fue creado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error',
              footer: 'No es posible crear el rol.',
            });
            console.warn(err);
          }
        );
      } else {
        //Modificar
        this.roleService.modificarRole(this.idRole, body).subscribe(
          (data) => {
            console.log(data);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El rol fue modificado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error',
              footer: 'No es posible modificar el rol.',
            });

            console.warn(err);
          }
        );
      }
    }
  }
  eliminarRole(id: string) {
    this.roleService.eliminarRole(id).subscribe(
      (data) => {
        console.log(data);
        this.cargarListaRoles();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El rol fue eliminado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error',
          footer: 'No es posible eliminar el rol.',
        });

        console.warn(err);
      }
    );
  }
}
