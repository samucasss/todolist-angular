import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public save(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('/api/usuario', usuario, this.auth.getHeaderBearer());
  }

  public delete(): Observable<string> {
    return this.http.delete<string>('/api/usuario', this.auth.getHeaderBearer());
  }

}
