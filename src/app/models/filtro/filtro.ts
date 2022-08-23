import { Tarefa } from "../tarefa";

export interface Filtro {

    filter(tarefaList: Tarefa[], done: boolean): Tarefa[];
}