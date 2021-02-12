import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login } from '../models/loginIterface';
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

}
