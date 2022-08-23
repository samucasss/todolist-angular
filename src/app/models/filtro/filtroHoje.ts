import * as moment from "moment";
import { Tarefa } from "../tarefa";
import { Filtro } from "./filtro";

export class FiltroHoje implements Filtro {

    public filter(tarefaList: Tarefa[], done: boolean): Tarefa[] {
        const hoje = moment.utc().startOf('day')
        const amanha = moment(hoje).add(1, 'days')
    
        const inicio = moment(hoje).add(-1, 'seconds')
        const fim = moment(amanha).add(-1, 'seconds')
    
        const tarefaDoneList: Tarefa[] = tarefaList.filter(tarefa => tarefa.done === done)
        const tarefaFilterList: Tarefa[] = tarefaDoneList.filter(tarefa => 
            moment(tarefa.data).isBetween(inicio, fim))
    
        return tarefaFilterList
    
    }
    
}