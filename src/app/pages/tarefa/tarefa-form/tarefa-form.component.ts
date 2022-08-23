import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-tarefa-form',
  templateUrl: './tarefa-form.component.html',
  styleUrls: ['./tarefa-form.component.css']
})
export class TarefaFormComponent implements OnInit {

  @Input('tarefa')
  tarefa: Tarefa | null = null;

  @Output()
  cancelarEmitter = new EventEmitter<string>();

  @Output()
  saveEmitter = new EventEmitter<Tarefa>();

  @Output()
  updateEmitter = new EventEmitter<Tarefa>();

  tarefaForm = new FormGroup({
    data: new FormControl<Date>(new Date(), [Validators.required]),
    nome: new FormControl<string>('', [Validators.required]),
    descricao: new FormControl<string>(''),
    done: new FormControl<boolean>(false)
  });

  constructor(private tarefaService: TarefaService, private _snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt-BR'); //dd/MM/yyyy
  }

  ngOnInit(): void {
    if (this.tarefa) {
      this.tarefaForm.controls.data.setValue(this.tarefa.data);
      this.tarefaForm.controls.nome.setValue(this.tarefa.nome)
      this.tarefaForm.controls.descricao.setValue(this.tarefa.descricao)
      this.tarefaForm.controls.done.setValue(this.tarefa.done)
    }
  }

  private error(message: string): void {
    this._snackBar.open(message, '',
      { verticalPosition: 'top', duration: 5000, panelClass: ['error-snackbar'] });
  }

  private validate(): boolean {
    if (!this.tarefaForm.controls.data.valid) {
      this.error('O campo Data deve ser preenchido')
      return false;
    }

    if (!this.tarefaForm.controls.nome.valid) {
      this.error('O campo Nome deve ser preenchido')
      return false;
    }

    return true;
  }

  ok(): void {
    if (!this.validate()) {
      return;
    }

    const data = this.tarefaForm.controls.data.value;
    const nome = this.tarefaForm.controls.nome.value;
    const descricao = this.tarefaForm.controls.descricao.value;
    const done = this.tarefaForm.controls.done.value;

    const id: string = this.tarefa?.id ? this.tarefa?.id : '';
    if (data !== null && nome !== null && descricao !== null) {
      const json = {id: id, data: data, nome: nome, descricao: descricao, done: done}
      const tarefa: Tarefa = new Tarefa(json);

      this.tarefaService.save(tarefa)
        .subscribe({
          next: (obj) => {
            const tarefaJson: Tarefa = new Tarefa(obj);

            if (!id) {
              this.saveEmitter.emit(tarefaJson);    

            } else {
              this.updateEmitter.emit(tarefaJson);
            }
          },
          error: (e) => {
            console.log('erro: ' + JSON.stringify(e))
            this.error("Erro ao salvar tarefa")
          }
        });
    }


  }

  cancelar(): void {
    this.cancelarEmitter.emit();
  }

}
