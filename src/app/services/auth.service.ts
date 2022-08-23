import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioSessao } from '../models/usuarioSessao';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public autentica(email: string, senha: string): Observable<boolean> {
    const observable: Observable<boolean> = new Observable(observer => {

      this.login(email, senha)
        .subscribe({
          next: (json) => {
            const data = JSON.parse(JSON.stringify(json));
            this.findUser(data.token, observer);
          },
          error: (e) => {
            observer.error(e);
          }
        });

    })

    return observable;
  }

  private findUser(token: string, observer: Observer<boolean>): void {
    this.user(token)
      .subscribe({
        next: (json) => {
          const data = JSON.parse(JSON.stringify(json));
          const usuario = data.user;
          const user: UsuarioSessao = {id: usuario.id, nome: usuario.nome, email: usuario.email, 
            token: token};
          this.storeUser(user);

          observer.next(true);
          observer.complete()
        },
        error: (e) => {
          console.log('erro: ' + JSON.stringify(e))
          observer.error(e);
        }
      });

  }

  private login(email: string, senha: string): Observable<string> {
    return this.http.post<string>('/api/auth/login', { email: email, senha: senha })
  }

  private user(token: string): Observable<Usuario> {
    var header = {
      headers: new HttpHeaders()
       .set('Authorization',  `Bearer ${token}`)
    }
    
    return this.http.get<Usuario>('/api/auth/user', header);
  }

  private storeUser(user: UsuarioSessao): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  public register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('/api/auth/register', usuario)
  }

  public logout(): void {
    localStorage.removeItem('user')
  }

  public isLogged(): boolean {
    return localStorage.getItem('user') !== null
  }

  public getUser(): UsuarioSessao | null {
    const json = localStorage.getItem('user');

    if (typeof json === 'string') {
      const userLocal = JSON.parse(json);
      const user: UsuarioSessao = {
        id: userLocal.id, nome: userLocal.nome, email: userLocal.email,
        token: userLocal.token
      }

      return user;
    }

    return null;
  }

  private getToken(): string | null {
    const user: UsuarioSessao | null = this.getUser();
    if (user) {
      return user.token;
    }

    return null;
  }

  public getUserName(): string | null {
    const user: UsuarioSessao | null = this.getUser();
    if (user) {
      return user.nome.toUpperCase();
    }

    return null;
  }

  public getHeaderBearer() {
    const token: string | null = this.getToken();

    const header = {
      headers: new HttpHeaders()
       .set('Authorization',  `Bearer ${token}`)
    }

    return header;
  }

}
