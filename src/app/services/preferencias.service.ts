import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preferencias } from '../models/preferencias';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreferenciasService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public get(): Observable<Preferencias> {
    return this.http.get<Preferencias>('/api/preferencia', this.auth.getHeaderBearer());
  }

  public save(preferencias: Preferencias): Observable<Preferencias> {
    return this.http.post<Preferencias>('/api/preferencias', preferencias, this.auth.getHeaderBearer())
  }

  public delete(): Observable<string> {
    return this.http.delete<string>('/api/preferencia', this.auth.getHeaderBearer());
  }

}
