import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './pages/hello/hello.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table'; 
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { TecnologiasComponent } from './pages/tecnologias/tecnologias.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { RegistroComponent } from './pages/usuario/registro/registro.component';
import { MeusDadosComponent } from './pages/usuario/meus-dados/meus-dados.component';
import { PreferenciasComponent } from './pages/preferencias/preferencias.component';
import { TarefaListComponent } from './pages/tarefa/tarefa-list/tarefa-list.component';
import { TarefaFormComponent } from './pages/tarefa/tarefa-form/tarefa-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    TutorialComponent,
    ConfirmDialogComponent,
    ToolbarComponent,
    MainLayoutComponent,
    TecnologiasComponent,
    BreadcrumbComponent,
    LoginComponent,
    UsuarioFormComponent,
    RegistroComponent,
    MeusDadosComponent,
    PreferenciasComponent,
    TarefaListComponent,
    TarefaFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
