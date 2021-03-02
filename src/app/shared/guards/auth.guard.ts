import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private login$: Observable<any>;
  public login: boolean;
  constructor(private store: Store<appState>, private router:Router) {
    this.login$ = this.store.select('login');
    this.login = false;
  }
  canActivate(): boolean{
      this.login$.subscribe(data => {
        this.login = data.login;
      });
    if (!this.login) {
      this.router.navigate(['login']);
    }
    return this.login;
  }
  
}
