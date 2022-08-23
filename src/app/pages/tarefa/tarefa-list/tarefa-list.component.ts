import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Enum, TipoFiltroEnum } from 'src/app/models/filtro/tipoFiltroEnum';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaListManager } from 'src/app/models/tarefaListManager';
import { PreferenciasService } from 'src/app/services/preferencias.service';
import { TarefaService } from 'src/app/services/tarefa.service';

export interface Periodo {
  inicio: Date;
  fim: Date;
}

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit {

  displayedColumns: string[] = ['data', 'nome', 'descricao', 'acoes'];
  tarefaListManager: TarefaListManager = new TarefaListManager();
  tipoFiltroList: Enum[] = TipoFiltroEnum.values();

  filterForm = new FormGroup({
    tipoFiltro: new FormControl<string>('T'),
    done: new FormControl<boolean>(false)
  });

  constructor(private tarefaService: TarefaService, private preferenciasService: PreferenciasService,
    private _snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.findPreferencias();
  }

  private findPreferencias(): void {
    this.preferenciasService.get().subscribe(preferencias => {
      if (preferencias) {
        this.filterForm.controls.tipoFiltro.setValue(preferencias.tipoFiltro);
        this.filterForm.controls.done.setValue(preferencias.done);
      }

      this.findAllTarefas();
    });

  }

  private findAllTarefas(): void {
    const periodoEssaSemana: Periodo = this.findPeriodoEssaSemana();

    this.tarefaService.findAll(periodoEssaSemana.inicio, periodoEssaSemana.fim)
      .subscribe(objList => {
        const tarefaList = objList.map(obj => new Tarefa(obj));
        this.tarefaListManager.setModelList(tarefaList);

        //verifica se foi informado parametro de busca na toolbar
        this.activateRouter
        .queryParams
        .subscribe(params => {
          const search = params['search']
          console.log('params.search: ' + search);

          if (search) {
            this.tarefaListManager.pesquisar(search);

          } else {
            this.filter();
          }

        });
  
      });
  }

  private findPeriodoEssaSemana(): Periodo {
    const hoje = moment().startOf('day')
    const domingo = moment(hoje).isoWeekday(0)
    const sabado = moment(hoje).isoWeekday(6)

    const ultimoSabado = moment(domingo).add(-1, 'days')
    const proximoDomingo = moment(sabado).add(1, 'days')

    return { inicio: ultimoSabado.toDate(), fim: proximoDomingo.toDate() }
  }

  private success(): void {
    this._snackBar.open('Operação realizada com sucesso', '',
      { verticalPosition: 'top', duration: 5000, panelClass: ['success-snackbar'] });
  }

  private error(message: string): void {
    this._snackBar.open(message, '',
      { verticalPosition: 'top', duration: 5000, panelClass: ['error-snackbar'] });
  }

  filter(): void {
    let tipoFiltro = this.filterForm.controls.tipoFiltro.value;
    let done = this.filterForm.controls.done.value;

    tipoFiltro = tipoFiltro !== null ? tipoFiltro : 'T';
    done = done !== null ? done : false;

    this.tarefaListManager.filter(tipoFiltro, done);
  }

  novo(): void {
    this.tarefaListManager.novo();
  }

  editar(tarefa: Tarefa) {
    this.tarefaListManager.editar(tarefa);
  }

  save(tarefa: Tarefa) {
    this.tarefaListManager.add(tarefa);
    this.success();
    this.filter();
    this.cancelar();
  }

  update(tarefa: Tarefa) {
    this.tarefaListManager.update(tarefa);
    this.success();
    this.filter();
    this.cancelar();
  }

  done(tarefa: Tarefa) {
    this.tarefaService.done(tarefa).subscribe(ok => {
      tarefa.done = true;
      this.tarefaListManager.update(tarefa);
      this.filter();
    });

    this.success();
  }

  cancelar() {
    this.tarefaListManager.reset();
  }

  remove(tarefa: Tarefa): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Tem certeza que deseja excluir o registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        this.removeTarefa(tarefa);
      }
    });
  }

  removeTarefa(tarefa: Tarefa): void {
    this.tarefaService.delete(tarefa)
      .subscribe({
        next: (ok) => {
          this.tarefaListManager.remove(tarefa);
          this.success();
        },
        error: (e) => {
          console.log('erro: ' + JSON.stringify(e))
          this.error("Erro ao remover tarefa")
        }
      });
  }

}
