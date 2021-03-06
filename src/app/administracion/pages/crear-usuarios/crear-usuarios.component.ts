import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleBD } from '../../models/role';
import { UsuarioBD } from '../../models/usuario';
import { RoleService } from '../../services/role.service';
import { UsuarioService } from '../../services/usuario.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

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
  private idUsuario: string = '';
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
    this.idUsuario = '';
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
    this.idUsuario = id;
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
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El usuario fue creado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error',
              footer: 'No es posible crear el usuario.',
            });
            console.warn(err);
          }
        );
      } else {
        let body = {
          nombre,
          apellido,
          email,
          role,
          img,
        };
        this.usuarioService.actualizarUsuario(this.idUsuario, body).subscribe(
          (resp) => {
            if (resp.ok) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El usuario fue modificado con éxito',
                showConfirmButton: false,
                timer: 1500,
              });

              this.cargarUsuarios();
            } else {
              console.log('No se actualizo el usuario');
            }
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrió un error',
              footer: 'No es posible modificar el usuario.',
            });

            console.warn(err);
          }
        );
      }
    } else {
      console.log('formulario no válido');
    }
  }
  eliminarUsuario(id: string) {
    this.usuarioService.deleteUsuario(id).subscribe(
      (resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El usuario fue eliminado con éxito',
          showConfirmButton: false,
          timer: 1500,
        });

        this.cargarUsuarios();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error',
          footer: 'No es posible eliminar el usuario.',
        });

        console.warn(err);
      }
    );
  }
}
