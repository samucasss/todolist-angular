import * as moment from "moment";
import { ObjectIdentify } from "./objectIdentify";

export class Tarefa implements ObjectIdentify {
    id: string = '';
    data: Date = moment().startOf('day').toDate();
    nome: string = '';
    descricao: string = '';
    done: boolean = false;

    constructor(json: any | null) {
        if (json) {
            Object.assign(this, json);
        }
    }

    public getDataFormatada(): string {
        return moment.utc(this.data).locale('pt-br').format('ddd, DD/MM/YYYY')
    }
    
}