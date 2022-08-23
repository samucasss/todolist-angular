import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { MeusDadosComponent } from './pages/usuario/meus-dados/meus-dados.component';
import { PreferenciasComponent } from './pages/preferencias/preferencias.component';
import { RegistroComponent } from './pages/usuario/registro/registro.component';
import { TarefaListComponent } from './pages/tarefa/tarefa-list/tarefa-list.component';
import { TecnologiasComponent } from './pages/tecnologias/tecnologias.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: AppComponent }
    ]
  },
  {
    path: 'tecnologias',
    component: MainLayoutComponent,
    children: [
      { path: '', component: TecnologiasComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'register', component: RegistroComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'meusdados', component: MeusDadosComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'preferences', component: PreferenciasComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'tarefas', component: TarefaListComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
