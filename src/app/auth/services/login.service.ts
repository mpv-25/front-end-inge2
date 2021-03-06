import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from '../models/loginIterface';
import {RoleBD} from 'src/app/administracion/models/role';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private url = 'http://localhost:3000';
  private url = 'https://back-end-inge2.herokuapp.com';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<login> {
    let body = {email, password}
    return this.http.post<login>(`${this.url}/login`, body);
  }
  role(id:string){
    return this.http.get<RoleBD>(`${this.url}/role/${id}`);
  }

}
