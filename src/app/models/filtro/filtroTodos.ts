import { Tarefa } from "../tarefa";
import { Filtro } from "./filtro";

export class FiltroTodos implements Filtro {

    public filter(tarefaList: Tarefa[], done: boolean): Tarefa[] {
        const tarefaFilterList: Tarefa[] = tarefaList.filter(tarefa => tarefa.done === done)
        return tarefaFilterList
    }
    
}