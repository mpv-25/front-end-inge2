import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleBD } from '../../models/role';
import { ActualizarRole, UsuarioBD } from '../../models/usuario';
import { RoleService } from '../../services/role.service';
import { UsuarioService } from '../../services/usuario.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-usuarios',
  templateUrl: './roles-usuarios.component.html',
  styleUrls: ['./roles-usuarios.component.css'],
})
export class RolesUsuariosComponent implements OnInit {
  public Title = 'Asignar Rol a Usuarios';
  public formulario: FormGroup;
  public listaRoles: Array<RoleBD> = [];
  public listaUsuarios: Array<UsuarioBD> = [];
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private role: RoleService
  ) {
    this.formulario = this.fb.group({
      role: ['', Validators.required],
    });
    this.cargarRoles();
    this.cargarUsuarios();
  }

  ngOnInit(): void {}

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (data) => {
        this.listaUsuarios = data.usuarios;
      },
      (err) => {
        console.warn(err);
      }
    );
  }
  cargarRoles() {
    this.role.getRoles().subscribe(
      (data) => {
        this.listaRoles = data.roles;
        console.log(this.listaRoles);
      },
      (err) => {
        console.warn(err);
      }
    );
  }
  enviarFormulario(id: string) {
    if (this.formulario.valid) {
      let role: string = this.formulario.get('role')?.value;
      let body: ActualizarRole = {
        role,
      };
      this.usuarioService.asignarRole(id, body).subscribe(
        (resp) => {
          console.log(resp);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El rol fue actualizado con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error',
            footer: 'No es posible actualizar el rol.',
          });
          console.log(err);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error',
        footer: 'No es posible actualizar el rol.',
      });
    }
  }
}
