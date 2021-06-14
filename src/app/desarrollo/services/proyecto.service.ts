import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  getProyectos,
  Proyecto,
  EstadoTarea,
  EstadoLB,
} from '../models/proyecto.model';
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

  cantTareas() {
    return this.http.get<Array<EstadoTarea>>(
      `${this.url}/proyectos/cant-tareas`
    );
  }
  cantLB() {
    return this.http.get<Array<EstadoLB>>(`${this.url}/proyectos/cant-lb`);
  }
}
