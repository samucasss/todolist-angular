import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Enum, TipoFiltroEnum } from 'src/app/models/filtro/tipoFiltroEnum';
import { Preferencias } from 'src/app/models/preferencias';
import { PreferenciasService } from 'src/app/services/preferencias.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent implements OnInit {
  tipoFiltroList: Enum[] = TipoFiltroEnum.values();

  preferenciasForm = new FormGroup({
    tipoFiltro: new FormControl('', [Validators.required]),
    done: new FormControl<boolean>(false, [Validators.required])
  });

  constructor(private preferenciasService: PreferenciasService, private _snackBar: MatSnackBar, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.preferenciasService.get().subscribe(preferencias => {
      if (preferencias) {
        this.preferenciasForm.controls.tipoFiltro.setValue(preferencias.tipoFiltro)
        this.preferenciasForm.controls.done.setValue(preferencias.done)
      }
    });
  }

  private success(): void {
    this._snackBar.open('Operação realizada com sucesso', '',
      { verticalPosition: 'top', duration: 5000, panelClass: ['success-snackbar'] });
  }

  private error(message: string): void {
    this._snackBar.open(message, '',
      { verticalPosition: 'top', duration: 5000, panelClass: ['error-snackbar'] });
  }

  ok(): void {
    if (!this.preferenciasForm.controls.tipoFiltro.valid) {
      this.error('O campo Tipo filtro deve ser preenchido')
      return;
    }

    const tipoFiltro = this.preferenciasForm.controls.tipoFiltro.value;
    const done = this.preferenciasForm.controls.done.value;

    if (tipoFiltro && done != null) {
      const preferencias: Preferencias = {tipoFiltro: tipoFiltro, done: done}

      this.preferenciasService.save(preferencias)
        .subscribe({
          next: (obj) => {
            this.success();
          },
          error: (e) => {
            console.log('erro: ' + JSON.stringify(e))
            this.error("Erro ao salvar preferências")
          }
        });
    }

  }

  remove(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {width: '250px', 
      data: {message: 'Tem certeza que deseja excluir o registro?'} });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.removePreferencia();
      }
    });

  }

  removePreferencia(): void {
    this.preferenciasService.delete()
    .subscribe({
      next: (ok) => {
        this.success();

        this.preferenciasForm.controls.tipoFiltro.setValue('');
        this.preferenciasForm.controls.done.setValue(false);
      },
      error: (e) => {
        console.log('erro: ' + JSON.stringify(e))
        this.error("Erro ao remover preferências")
      }
    });

  }

}
