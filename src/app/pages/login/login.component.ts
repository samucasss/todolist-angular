import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioSessao } from 'src/app/models/usuarioSessao';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthService, private router: Router, private _snackBar: MatSnackBar) {
  }

  getEmail(): FormControl {
    return this.loginForm.controls.email;
  }

  getSenha(): FormControl {
    return this.loginForm.controls.senha;
  }

  getErrorEmail(): string {
    const email = this.getEmail();

    if (email.hasError('required')) {
      return 'O campo e-mail deve ser preenchido';
    }

    return email.hasError('email') ? 'E-mail inválido' : '';
  }

  getErrorSenha(): string {
    const senha = this.getSenha();

    if (senha.hasError('required')) {
      return 'O campo senha deve ser preenchido';
    }

    return '';
  }

  private error(message: string): void {
    this._snackBar.open(message, '',
      { verticalPosition: 'top', duration: 5000, panelClass: ['error-snackbar'] });
  }

  private validate(): boolean {
    const email = this.getEmail();
    const senha = this.getSenha();

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

    const email = this.getEmail();
    const senha = this.getSenha();

    this.auth.autentica(email.value, senha.value)
      .subscribe({
        next: (success) => {
          this.router.navigateByUrl('/tarefas')
        },
        error: (e) => {
          console.log('erro: ' + JSON.stringify(e))
          this.error("Usuário inválido")
        }
      });

  }

}
