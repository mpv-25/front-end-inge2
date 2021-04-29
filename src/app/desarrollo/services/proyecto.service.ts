import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getProyectos, Proyecto } from '../models/proyecto.model';
@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  //private url = 'http://localhost:3000';
  private url = 'https://back-end-inge2.herokuapp.com';

  constructor(private http: HttpClient) {}

  getProyectos() {
    return this.http.get<getProyectos>(`${this.url}/proyectos`);
  }
  modificarProyecto(_id: string | undefined, body: Proyecto) {
    return this.http.put(`${this.url}/proyecto/${_id}`, body);
  }
  nuevoProyecto(body: Proyecto) {
    return this.http.post(`${this.url}/proyecto`, body);
  }
  borrarProyecto(idProyecto: string) {
    return this.http.delete(`${this.url}/proyecto/${idProyecto}`);
  }
}
