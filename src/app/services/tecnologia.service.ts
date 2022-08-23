import { Injectable } from '@angular/core';
import { Tecnologia } from '../models/tecnologia';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {

  constructor(private http: HttpClient) {

  }

  findAll(): Observable<Tecnologia[]> {
    const tecnologiaList = this.http.get<Tecnologia[]>('api/tecnologias')
  
    return tecnologiaList
  }
}
