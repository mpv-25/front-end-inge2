import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUsuarios, NewUsuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  crearUsuario(body: NewUsuario) {
    return this.http.post(`${this.url}/usuario`, body);
  }
  getUsuarios(): Observable<GetUsuarios> {
    return this.http.get<GetUsuarios>(`${this.url}/usuarios?desde=0&limite=20`);
  }
  deleteUsuario(id: string) {
    return this.http.delete(`${this.url}/usuario/${id}`);
  }
}
