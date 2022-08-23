import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioSessao } from 'src/app/models/usuarioSessao';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  @Input('usuario')
  usuario: Usuario | null = null;

  usuarioForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthService, private router: Router, 
    private _snackBar: MatSnackBar, private usuarioService: UsuarioService, 
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.usuario) {
      this.usuarioForm.controls.nome.setValue(this.usuario.nome);
      this.usuarioForm.controls.email.setValue(this.usuario.email);
    }
  }

  getNome(): FormControl {
    return this.usuarioForm.controls.nome;
  }

  getEmail(): FormControl {
    return this.usuarioForm.controls.email;
  }

  getSenha(): FormControl {
    return this.usuarioForm.controls.senha;
  }

  getErrorEmail(): string {
    const email = this.getEmail();

    if (email.hasError('required')) {
      return 'O campo e-mail deve ser preenchido';
    }

    return email.hasError('email') ? 'E-mail inválido' : '';
  }

  private getErrorRequired(formControl: FormControl, name: string): string {
    if (formControl.hasError('required')) {
      return 'O campo ' + name + ' deve ser preenchido';
    }

    return '';
  }

  getErrorNome(): string {
    return this.getErrorRequired(this.getNome(), 'Nome');
  }

  getErrorSenha(): string {
    return this.getErrorRequired(this.getSenha(), 'Senha');
  }

  success(): void {
    this._snackBar.open('Operação realizada com sucesso', '',
      { verticalPosition: 'top', duration: 5000, panelClass: ['success-snackbar'] });
  }

  private error(message: string): void {
    this._snackBar.open(message, '',
      { verticalPosition: 'top', duration: 5000, panelClass: ['error-snackbar'] });
  }

  private validate(): boolean {
    const nome = this.getNome();
    const email = this.getEmail();
    const senha = this.getSenha();

    if (nome.hasError('required')) {
      this.error('O campo Nome deve ser preenchido')
      return false;
    }

    if (email.hasError('required')) {
      this.error('O campo E-mail deve ser preenchido')
      return false;
    }

    if (senha.hasError('required')) {
      this.error('O campo Senha deve ser preenchido')
      return false;
    }

    return true;
  }

  ok(): void {
    if (!this.validate()) {
      return;
    }

    const nome = this.getNome();
    const email = this.getEmail();
    const senha = this.getSenha();

    const id: string = this.usuario?.id ? this.usuario.id : ''

    const usuario: Usuario = {
      id: id, nome: nome.value, email: email.value,
      senha: senha.value
    };

    if (usuario.id) {
      this.save(usuario);

    } else {
      this.register(usuario);
    }

  }

  private register(usuario: Usuario): void {
    this.auth.register(usuario)
      .subscribe({
        next: (user) => {
          this.login(usuario.email, usuario.senha)
        },
        error: (e) => {
          console.log('erro: ' + JSON.stringify(e))
          this.error("Erro ao salvar usuário")
        }
      });
  }

  private login(email: string, senha: string): void {
    this.auth.autentica(email, senha)
      .subscribe({
        next: (success) => {
          this.router.navigateByUrl('/')
        },
        error: (e) => {
          console.log('erro: ' + JSON.stringify(e))
          this.error("Usuário inválido")
        }
      });

  }

  private save(usuario: Usuario): void {
    this.usuarioService.save(usuario)
      .subscribe({
        next: (user) => {
          this.success();
        },
        error: (e) => {
          console.log('erro: ' + JSON.stringify(e))
          this.error("Erro ao salvar usuário")
        }
      });
  }

  remove(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {width: '250px', 
      data: {message: 'Tem certeza que deseja excluir o registro?'} });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.removeUsuario();
      }
    });

  }

  removeUsuario(): void {
    this.usuarioService.delete()
    .subscribe({
      next: (ok) => {
        this.success();

        this.auth.logout();
        this.router.navigateByUrl('/')
      },
      error: (e) => {
        console.log('erro: ' + JSON.stringify(e))
        this.error("Erro ao remover usuário")
      }
    });
  }
  
}
