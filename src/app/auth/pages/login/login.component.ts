import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/app.reducer';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RoleBD } from 'src/app/administracion/models/role';
import { RoleService } from 'src/app/administracion/services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public formularioLogin: FormGroup;

  public listaRoles: Array<RoleBD> = [];
  constructor(
    private router: Router,
    private login: LoginService,
    private store: Store<appState>,
    private fb: FormBuilder,
    private role: RoleService
  ) {
    this.formularioLogin = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarRoles();
    this.subirInicio();
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

  permisos(id: string) {
    let permisos: string;
    this.listaRoles.map((data) => {
      if (data._id == id) {
        permisos = data.permisos.toString();
	console.log(permisos);
        localStorage.setItem('permisos', permisos);
      }
    });
  }

  get errorEmail() {
    return (
      this.formularioLogin.get('email')?.invalid &&
      this.formularioLogin.get('email')?.touched
    );
  }

  get errorPassword() {
    return (
      this.formularioLogin.get('password')?.invalid &&
      this.formularioLogin.get('password')?.touched
    );
  }

  iniciarSesion() {
    if (this.formularioLogin.valid) {
      let email = this.formularioLogin.get('email')?.value;
      let password = this.formularioLogin.get('password')?.value;
      this.login.login(email, password).subscribe(
        (resp) => {
          this.borrarFormulario();
	  //Guardamos los permisos en el local storage
	  this.permisos(resp.usuario.role);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Inicio sesión con éxito!!!',
            showConfirmButton: false,
            timer: 1500,
          });
          //Si la respuesta de la api es ok = true, cambiamos el estado del login en ngrx a true
          if (resp.ok) {
            this.store.dispatch({ type: 'iniciarLogin' });
            this.router.navigate(['home']);
          }
        },
        (error) => {
          console.warn(error);
          Swal.fire({
            allowOutsideClick: false, //para que no pueda dar click en otro lugar
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo iniciar sesión!',
            footer: 'Sus credenciales no son válidas ',
          });
        }
      );
    } else {
      this.verificarInputVacio();
    }
  }
  verificarInputVacio() {
    //si forma es invalido se recorre todos sus objetos con forEach
    if (this.formularioLogin.invalid) {
      //cuando guardamos marcamos todos los inputs como touched de esa forma se dispara la validacion, de invalido y que fue editado
      //this.forma.get('elemento').invalid && this.forma.get('elemento').touched
      return Object.values(this.formularioLogin.controls).forEach((control) => {
        //marcamos los inputs para que lancen error si estan en blanco
        control.markAsTouched();
      });
    }
  }
  borrarFormulario() {
    this.formularioLogin.reset({
      email: '',
      password: '',
    });
  }
  // Funcion para subir al inicio
  subirInicio(): void {
    window.scroll(0, 0);
  }
}
