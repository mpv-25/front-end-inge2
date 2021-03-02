import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetRole, GetRoles, NewRole } from '../models/role';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<GetRoles>('http://localhost:3000/roles');
  }
  getRole(id: string) {
    return this.http.get<GetRole>('http://localhost:3000/role/' + id);
  }
  crearRole(body: NewRole) {
    return this.http.post('http://localhost:3000/role', body);
  }
  modificarRole(id: string, body: NewRole) {
    return this.http.put('http://localhost:3000/role/' + id, body);
  }
  eliminarRole(id: string) {
    return this.http.delete('http://localhost:3000/role/' + id);
  }
}
