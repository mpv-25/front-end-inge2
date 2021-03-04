import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleBD } from '../../models/role';
import { UsuarioBD } from '../../models/usuario';
import { RoleService } from '../../services/role.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent implements OnInit {
  public Title = 'Usuarios';
  public userForm: FormGroup;
  public listaRoles: Array<RoleBD> = [];
  public listaUsuarios: Array<UsuarioBD> = [];
  public nuevoUsuario: Boolean = true;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private role: RoleService
  ) {
    this.cargarUsuarios();
    this.cargarRoles();
    this.userForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      password: [''],
      role: [''],
    });
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
  eliminarUsuario(id: string) {
    this.usuarioService.deleteUsuario(id).subscribe(
      (resp) => {
        console.log(resp);
        this.cargarUsuarios();
      },
      (err) => {
        console.warn(err);
      }
    );
  }
  mostrarRole(id: string) {
    let role;
    this.listaRoles.map((data) => {
      if (data._id == id) {
        role = data.nombre;
      }
    });
    return role;
  }

  limpiarFormulario() {
    this.nuevoUsuario = true;
    this.userForm.reset({
      nombre: [''],
      apellido: [''],
      email: [''],
      password: [''],
      role: [''],
    });
  }
  cargarUsuario(id: string) {
    this.nuevoUsuario = false;
    let usuario = this.listaUsuarios.find((user) => user._id == id);
    this.userForm.reset({
      nombre: usuario?.nombre,
      apellido: usuario?.apellido,
      email: usuario?.email,
      password: '',
      role: usuario?.role,
    });
  }
  enviarFormulario() {
    if (this.userForm.valid) {
      let nombre = this.userForm.get('nombre')?.value;
      let apellido = this.userForm.get('apellido')?.value;
      let email = this.userForm.get('email')?.value;
      let password = this.userForm.get('password')?.value;
      let role = this.userForm.get('role')?.value;
      let img = '';
      if (this.nuevoUsuario) {
        let body = {
          nombre,
          apellido,
          email,
          password,
          role,
          img,
        };

        this.usuarioService.crearUsuario(body).subscribe(
          (resp) => {
            console.log(resp);
            this.limpiarFormulario();
            this.cargarUsuarios();
          },
          (err) => {
            console.warn(err);
          }
        );
      } else {
        console.log('usuario editado');
      }
    } else {
      console.log('formulario no válido');
    }
  }
}
