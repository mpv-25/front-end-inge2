import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetRole, GetRoles, NewRole } from '../models/role';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = 'https://back-end-inge2.herokuapp.com';
  //private url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getRoles(): Observable<GetRoles> {
    return this.http.get<GetRoles>(`${this.url}/roles`);
  }
  getRole(id: string) {
    return this.http.get<GetRole>(`${this.url}/role/${id}`);
  }
  crearRole(body: NewRole) {
    return this.http.post(`${this.url}/role`, body);
  }
  modificarRole(id: string, body: NewRole) {
    return this.http.put(`${this.url}/role/${id}`, body);
  }
  eliminarRole(id: string) {
    return this.http.delete(`${this.url}/role/${id}`);
  }
}
