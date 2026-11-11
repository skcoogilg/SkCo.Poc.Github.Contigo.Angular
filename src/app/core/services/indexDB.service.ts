import { Injectable } from '@angular/core';
import {
  TableFicsTransactions,
  TableFundTransactions,
  TablePortfoliosCriteriaHistoric,
  TablePortfoliosCriteriaLastMove,
  TablePortfoliosCriteriaTimeFrame,
} from '@interfaces/checkbox.interface';
import {
  TablePortfolioSummary,
  TableContractsComposition,
} from '@interfaces/filter.interface';
import Dexie from 'dexie';

const CONFIG_VERSION = 1;

@Injectable({
  providedIn: 'root',
})
export class IndexDBService extends Dexie {
  monitorTableProperties: Dexie.Table<
    {
      id: number;
      value:
        | TablePortfoliosCriteriaLastMove
        | TablePortfoliosCriteriaHistoric
        | TablePortfoliosCriteriaTimeFrame
        | TablePortfolioSummary
        | TableContractsComposition
        | TableFundTransactions
        | TableFicsTransactions;
    },
    number
  >;

  constructor() {
    super('ClientProfileDataBase');
    this.cleanAndCreateBD(CONFIG_VERSION);
    // Referencia a la tabla
    this.monitorTableProperties = this.table('monitorTableProperties');

    //Ids de las tablas el cual quieres que se limpie al cambiar la version.
    //Quitar los Ids que no requieren limpieza al cambiar la version y agregar los nuevos Ids que quieras limpiar.
    this.clearSpecificIdsIfVersionChanged([7]);
  }

  cleanAndCreateBD(version: number) {
    for (let index = 1; index < version; index++) {
      this.version(index).stores({
        monitorTableProperties: null, // Borra versión anterior
      });
    }
    this.version(version).stores({
      monitorTableProperties: 'id, value', // Definir la estructura de la tabla
    });
  }

  /**
   * Limpia IDs específicos si la versión ha cambiado.
   * @param idsToClear
   */
  private async clearSpecificIdsIfVersionChanged(idsToClear: number[]) {
    const VERSION_CONTROL_ID = -1;

    const versionRecord =
      await this.monitorTableProperties.get(VERSION_CONTROL_ID);

    const currentVersion = (versionRecord?.value as any)?.version;

    if (!versionRecord || currentVersion !== CONFIG_VERSION) {
      for (const id of idsToClear) {
        await this.monitorTableProperties.delete(id);
        console.info(`[IndexedDB] ID eliminado: ${id}`);
      }

      await this.monitorTableProperties.put({
        id: VERSION_CONTROL_ID,
        value: { version: CONFIG_VERSION } as any,
      });

      console.info('[IndexedDB] Nueva versión guardada.');
    }
  }

  async addPropertyInMonitorTable(
    id: number,
    value:
      | TablePortfoliosCriteriaLastMove
      | TablePortfoliosCriteriaHistoric
      | TablePortfoliosCriteriaTimeFrame
      | TablePortfolioSummary
      | TableContractsComposition
      | TableFundTransactions
      | TableFicsTransactions,
  ) {
    return await this.monitorTableProperties.add({ id, value });
  }

  async updatePropertyInMonitorTable(
    id: number,
    value:
      | TablePortfoliosCriteriaLastMove
      | TablePortfoliosCriteriaHistoric
      | TablePortfoliosCriteriaTimeFrame
      | TablePortfolioSummary
      | TableContractsComposition
      | TableFundTransactions
      | TableFicsTransactions,
  ) {
    return await this.monitorTableProperties.update(
      { id, value },
      { id, value },
    );
  }

  async getAllPropertiesOfMonitorTable() {
    return await this.monitorTableProperties.toArray();
  }

  async getSpecificPropertyOfMonitorTable(miId: number) {
    return await this.monitorTableProperties
      .where({
        id: miId,
      })
      .toArray();
  }

  async deletePropertyInMonitorTable(id: number) {
    return await this.monitorTableProperties.delete(id);
  }

  async updatePropertyTable(
    id: number,
    updatedValue:
      | TablePortfoliosCriteriaLastMove
      | TablePortfoliosCriteriaHistoric
      | TablePortfoliosCriteriaTimeFrame
      | TablePortfolioSummary
      | TableContractsComposition
      | TableFundTransactions
      | TableFicsTransactions,
  ) {
    const record = await this.monitorTableProperties.get(id);
    if (!record) {
      return;
    }

    const updatedRecord = {
      ...record,
      value: {
        ...record.value,
        ...updatedValue,
      },
    };
    return await this.monitorTableProperties.update(id, updatedRecord);
  }
}
