export interface Enum {
    id: string;
    name: string;
}

export class TipoFiltroEnum {

    static TODOS: Enum = {id: 'T', name: 'Todos'}
    static HOJE: Enum = {id: 'H', name: 'Hoje'}
    static AMANHA: Enum = {id: 'A', name: 'Amanhã'}
    static SEMANA: Enum = {id: 'S', name: 'Semana'}

    public static values():Enum[] {
        return [this.TODOS, this.HOJE, this.AMANHA, this.SEMANA]
    }
}