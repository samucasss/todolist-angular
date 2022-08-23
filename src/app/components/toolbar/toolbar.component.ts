import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  search: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  isLogged(): boolean {
    return this.auth.isLogged();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/')
  }

  getUsername(): string | null {
    return this.auth.getUserName();
  }

  pesquisar(): void {
    this.router.navigate(['/tarefas'], { queryParams: { search: this.search} });
  }

}
