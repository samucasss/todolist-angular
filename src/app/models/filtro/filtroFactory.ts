import { Filtro } from "./filtro"
import { FiltroAmanha } from "./FiltroAmanha"
import { FiltroHoje } from "./filtroHoje"
import { FiltroSemana } from "./filtroSemana"
import { FiltroTodos } from "./filtroTodos"

export class FiltroFactory {

    public static createFiltro(tipo: string): Filtro {
        switch(tipo) {
          case 'T': return new FiltroTodos()
          case 'H': return new FiltroHoje()
          case 'A': return new FiltroAmanha()
          case 'S': return new FiltroSemana()
          default: return new FiltroTodos();
        }
      }    
}