import * as moment from "moment";
import { AbstractListManager } from "./abstractListManager";
import { Filtro } from "./filtro/filtro";
import { FiltroFactory } from "./filtro/filtroFactory";
import { Tarefa } from "./tarefa";

export class TarefaListManager extends AbstractListManager<Tarefa> {
    private tarefaFilterList: Tarefa[] = [];

    public getTarefaFilterList(): Tarefa[] {
        return this.tarefaFilterList;
    }

    public createModel(): Tarefa {
        return new Tarefa(null);
    }

    public filter(tipo: string, done: boolean): void {
        const filtro: Filtro = FiltroFactory.createFiltro(tipo)
        this.tarefaFilterList = filtro.filter(this.getModelList(), done)
    }

    public pesquisar(search: string): void {
        this.tarefaFilterList = this.getModelList().filter(obj => obj.nome.toUpperCase()
            .includes(search.toUpperCase()))
    }

}