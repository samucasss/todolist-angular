import * as moment from "moment";
import { Tarefa } from "../tarefa";
import { Filtro } from "./filtro";

export class FiltroAmanha implements Filtro {

    public filter(tarefaList: Tarefa[], done: boolean): Tarefa[] {
        const hoje = moment.utc().startOf('day')
        const amanha = moment(hoje).add(1, 'days')
        const depoisDeAmanha = moment(amanha).add(1, 'days')
    
        const inicio = moment(amanha).add(-1, 'seconds')
        const fim = moment(depoisDeAmanha).add(-1, 'seconds')
    
        const tarefaDoneList: Tarefa[] = tarefaList.filter(tarefa => tarefa.done === done)
        const tarefaFilterList: Tarefa[] = tarefaDoneList.filter(tarefa => moment.utc(tarefa.data).
          isBetween(inicio, fim))
    
        return tarefaFilterList
    }
    
}