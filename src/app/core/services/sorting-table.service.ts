import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingTableService {
  private readonly INFO_PORTF = 'infoPortf';
  private readonly INFO_TABLE = 'infoTable';
  private readonly INFO_PORTF_HISTORIC = 'infoPortfHistoric';
  private readonly NAME_FONDO_MONITOR = 'nombreFondo';
  private readonly NAME_FONDO_CONTRACTS = 'nameFund';
  private readonly FIRST_TRANSACTION = 'firstTransaction';
  private readonly LAST_TRANSACTION = 'lastTransaction';
  private readonly DATE_FORMAT_DD_MM_YYYY = 'DD/MM/YYYY';
  private readonly DATE_FORMAT_MM_DD_YYYY = 'MM/DD/YYYY';

  constructor() {}

  /**
   * Funcion que permite ordenar en función a los datos que se le proporcionen
   * @param {string} by  Nombre/Identificador que permite buscar dentro de getProp() la propiedad dentro del array que se pretende ordenar
   * @param {string} type tipo de dato q se pretende ordenar: 'String' | 'Number' | 'Date'
   * @param {boolean} isAscending Permite saber si el ordenamiento se debe hacer ascendente o descendente
   * @param {number} valueSelect Si los datos provienen de un filtro, indicar el value de dicho filtro
   * @returns Devuelve una función de ordenación en función del tipo de datos
   */
  getSortFunction(
    by: string,
    type: 'String' | 'Number' | 'Date',
    isAscending: boolean,
    valueSelect?: number
  ) {
    const sortFunctions: any = {
      String: (a: any, b: any) =>
        this.sortByString(a, b, by, isAscending, valueSelect),
      Number: (a: any, b: any) =>
        this.sortByNumber(a, b, by, isAscending, valueSelect),
      Date: (a: any, b: any) =>
        this.sortByDate(a, b, by, isAscending, valueSelect),
    };
    return sortFunctions[type];
  }

  /**
   * Permite ordenar una cadena
   * @param a El primer objeto a comparar.
   * @param b El segundo objeto a comparar.
   * @param by Nombre/Identificador que permite buscar dentro de getProp() la propiedad dentro del array que se pretende ordenar
   * @param isAscending Indica si el ordenamiento es ascendente o descendente
   * @param valueSelect Si los datos provienen de un filtro, indicar el value de dicho filtro
   * @returns El resultado de la comparación de las cadenas.
   */
  private sortByString(
    a: any,
    b: any,
    by: string,
    isAscending: boolean,
    valueSelect?: number
  ) {
    let nameA;
    let nameB;
    if (valueSelect !== undefined) {
      nameA =
        valueSelect === 0
          ? a[this.INFO_PORTF][this.NAME_FONDO_MONITOR]
          : a[this.INFO_PORTF_HISTORIC][this.NAME_FONDO_MONITOR];
      nameB =
        valueSelect === 0
          ? b[this.INFO_PORTF][this.NAME_FONDO_MONITOR]
          : b[this.INFO_PORTF_HISTORIC][this.NAME_FONDO_MONITOR];
    } else {
      nameA = a[this.NAME_FONDO_CONTRACTS];
      nameB = b[this.NAME_FONDO_CONTRACTS];
    }
    return this.compareStrings(nameA, nameB, isAscending);
  }

  /**
   * Permite ordenar números
   * @param a El primer objeto a comparar.
   * @param b El segundo objeto a comparar.
   * @param by Nombre/Identificador que permite buscar dentro de getProp() la propiedad dentro del array que se pretende ordenar
   * @param isAscending Indica si el ordenamiento es ascendente o descendente
   * @param valueSelect Si los datos provienen de un filtro, indicar el value de dicho filtro
   * @returns El resultado de la comparación de los números.
   */
  private sortByNumber(
    a: any,
    b: any,
    by: string,
    isAscending: boolean,
    valueSelect?: number
  ) {
    const prop = this.getProp(by);
    let valueA, valueB;
    if (valueSelect !== undefined) {
      if (valueSelect === 0 && by === '%Monitor') {
        valueA = a[this.INFO_PORTF][prop];
        valueB = b[this.INFO_PORTF][prop];
      } else if (
        valueSelect === 0 ||
        (valueSelect === 5 && by !== '%Monitor' && by !== 'Transacciones')
      ) {
        valueA = a[this.INFO_TABLE][prop];
        valueB = b[this.INFO_TABLE][prop];
      } else if (
        valueSelect === 5 &&
        (by === '%Monitor' || by === 'Transacciones')
      ) {
        valueA = a[this.INFO_PORTF_HISTORIC][prop];
        valueB = b[this.INFO_PORTF_HISTORIC][prop];
      } else {
        throw new Error(`Unsupported comparison`);
      }
    } else {
      valueA = a[prop];
      valueB = b[prop];
    }
    return this.compareNumbers(valueA, valueB, isAscending);
  }

  /**
   * Permite ordenar fechas
   * @param a El primer objeto a comparar.
   * @param b El segundo objeto a comparar.
   * @param by Nombre/Identificador que permite buscar dentro de getProp() la propiedad dentro del array que se pretende ordenar
   * @param isAscending Indica si el ordenamiento es ascendente o descendente
   * @param valueSelect Si los datos provienen de un filtro, indicar el value de dicho filtro
   * @returns El resultado de la comparación de fechas.
   */
  private sortByDate(
    a: any,
    b: any,
    by: string,
    isAscending: boolean,
    valueSelect?: number
  ) {
    let dateA, dateB;
    if (valueSelect === 0) {
      dateA = new Date(
        a[this.INFO_TABLE][by === 'FechaInicial' ? 'idate' : 'fdate']
      );
      dateB = new Date(
        b[this.INFO_TABLE][by === 'FechaFinal' ? 'fdate' : 'idate']
      );
    } else {
      dateA = new Date(
        a[this.INFO_PORTF_HISTORIC][
          by === 'FechaInicial' ? this.FIRST_TRANSACTION : this.LAST_TRANSACTION
        ]
      );
      dateB = new Date(
        b[this.INFO_PORTF_HISTORIC][
          by === 'FechaInicial' ? this.FIRST_TRANSACTION : this.LAST_TRANSACTION
        ]
      );
    }
    return this.compareDates(dateA, dateB, isAscending);
  }

  /**
   * Devuelve la propiedad correspondiente a la cadena dada.
   * @param {string} by String que permite buscar la propiedad correspondiente.
   * @returns La propiedad correspondiente a la cadena dada. Si no se encuentra ninguna correspondencia, devuelve una cadena vacía.
   */
  private getProp(by: string): string {
    const props: any = {
      //Monitor
      '%Monitor': 'porcentFondo',
      NumUnidades: 'numunit',
      ValUnInicial: 'ivalue',
      SaldoInicial: 'ivaluetotal',
      ValUniFinal: 'fvalue',
      SaldoActual: 'fvaluetotal',
      RendimientoPesos: 'performancevalue',
      RendimientoPorcentaje: 'performance',
      TEA: 'tea',
      RetornoPond: 'returnpond',
      Transacciones: 'numTransaction',
      //Contracts
      '%Contracts': 'Procentage',
      valUnidad: 'ValueUnid',
      rentabilidad: 'Performance',
      saldo: 'TotalValue',
    };
    return props[by] || '';
  }

  /**
   * Compara dos cadenas
   * @param a La primera cadena a comparar.
   * @param b La segunda cadena a comparar.
   * @param isAscending Indica si la comparación es en orden ascendente o descendente.
   * @returns El resultado de la comparación de las cadenas. Si 'isAscending' es verdadero, se compara 'a' con 'b'. De lo contrario, se compara 'b' con 'a'.
   */
  public compareStrings(a: string, b: string, isAscending: boolean) {
    return isAscending ? a.localeCompare(b) : b.localeCompare(a);
  }

  /**
   * Compara dos numeros
   * @param a El primer número a comparar.
   * @param b El segundo número a comparar.
   * @param isAscending Indica si la comparación es en orden ascendente o descendente.
   * @returns El resultado de la comparación de los números. Si 'isAscending' es verdadero, se resta 'b' de 'a'. De lo contrario, se resta 'a' de 'b'.
   */
  public compareNumbers(a: number, b: number, isAscending: boolean) {
    return isAscending ? a - b : b - a;
  }

  /**
   * Compara dos fechas
   * @param a El primera fecha a comparar.
   * @param b El segunda fecha a comparar.
   * @param isAscending Indica si la comparación es en orden ascendente o descendente.
   * @returns El resultado de la comparación de las fechas. Si 'isAscending' es verdadero, se resta 'b' de 'a'. De lo contrario, se resta 'a' de 'b'.
   */
  public compareDates(a: Date, b: Date, isAscending: boolean) {
    return isAscending ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
  }
}
