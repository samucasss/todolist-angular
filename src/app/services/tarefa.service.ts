import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa';
import { AuthService } from './auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public findAll(inicio: Date, fim: Date): Observable<Tarefa[]> {
    const inicioParam: string = moment(inicio).format('YYYY/MM/DD');
    const fimParam: string = moment(fim).format('YYYY/MM/DD');

    return this.http.get<Tarefa[]>(`/api/tarefas?inicio=${inicioParam}&fim=${fimParam}`, 
      this.auth.getHeaderBearer());
  }

  public save(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>('/api/tarefas', tarefa, this.auth.getHeaderBearer())
  }

  public delete(tarefa: Tarefa): Observable<string> {
    return this.http.delete<string>(`/api/tarefas/${tarefa.id}`, this.auth.getHeaderBearer());
  }

  public done(tarefa: Tarefa): Observable<Tarefa> {
    const json = {done: !tarefa.done};
    return this.http.post<Tarefa>(`/api/tarefas/done/${tarefa.id}`, json, 
      this.auth.getHeaderBearer())
  }

}
