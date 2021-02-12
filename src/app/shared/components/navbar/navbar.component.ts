import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, DoCheck {

  public dato$: Observable<any>;
  public usuarioLogin = false;

  constructor(private store: Store<appState>, private router:Router) { 
    this.dato$ = store.select('login');
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void{
    this.dato$ = this.store.select('login');
    this.dato$.subscribe(data => {
      this.usuarioLogin = data.login;
    });
  }

  cerrarSesion() {
    //Cambiamos el estado de loginUsuario
    this.store.dispatch({ type: 'cerrarLogin' });
    //re dirigimos a login
    this.router.navigate(['login']);
  }

}
