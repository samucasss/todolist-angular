import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  retornoConfirmacao: string = '';

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  success(): void {
    this._snackBar.open('Operação realizada com sucesso', '', 
      {verticalPosition: 'top', duration: 5000, panelClass: ['success-snackbar']});
  }  

  error(): void {
    this._snackBar.open('Erro ao salvar o objeto', '', 
      {verticalPosition: 'top', duration: 5000, panelClass: ['error-snackbar']});
  }  

  confirm(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {width: '250px', 
      data: {message: 'Tem certeza que deseja excluir o registro?'} });

    dialogRef.afterClosed().subscribe(result => {
      this.retornoConfirmacao = result;
    });
  }  

}
