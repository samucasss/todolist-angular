import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioSessao } from 'src/app/models/usuarioSessao';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class MeusDadosComponent {

  constructor(private auth: AuthService) {
  }


  getUsuario(): Usuario | null {
    const user: UsuarioSessao | null = this.auth.getUser();

    if (user) {
      const usuario: Usuario = {id: user.id, nome: user.nome, email: user.email, senha: ''};
      return usuario;
    }
    
    return null;
  }
}
