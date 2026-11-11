import { CommonModule, DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  NgbPopover,
  NgbPopoverModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { IndexDBService } from '@services/indexDB.service';
import { SortingTableService } from '@services/sorting-table.service';
import { CustomAction, FullTableOptions } from './interfaces/full-table';
import { CheckboxComponent } from '@sharedComponents/checkbox/checkbox.component';
import { ToastService } from '@services/toast.service';
import { EventHubsService } from '@services/event-hubs.service';

const COMPONENTS = [CheckboxComponent];
const MODULES = [CommonModule, NgbTooltipModule, FormsModule, NgbPopoverModule];

@Component({
  selector: 'app-full-table',
  standalone: true,
  imports: [COMPONENTS, MODULES],
  providers: [DecimalPipe],
  templateUrl: './full-table.component.html',
  styleUrl: './full-table.component.scss',
})
export class FullTableComponent implements OnInit {
  @ViewChild('tableElement', { static: false }) tableElement!: ElementRef;
  @ViewChild('thActions', { read: NgbPopover }) thActionsTrigger!: NgbPopover;
  @ViewChild('popoverTrigger', { read: NgbPopover }) popover!: NgbPopover;
  @ViewChild('popoverTriggerCustomize', { read: NgbPopover })
  popoverTriggerCustomize!: NgbPopover;

  @Input({ required: true }) tableOptions!: FullTableOptions;
  @Input() pageSize: number = 5; // Tamaño de página inicial
  @Input() pageSizes: number[] = [5, 10, 20, 100]; // Tamaños de página disponibles
  @Output() rowDefaultAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAction: EventEmitter<{ key: string; data: any }> =
    new EventEmitter<{ key: string; data: any }>();
  @Output() analyzeSami: EventEmitter<any> = new EventEmitter<any>();

  private readonly indexDBSvc = inject(IndexDBService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly sortingService = inject(SortingTableService);
  private readonly decimalPipe = inject(DecimalPipe);
  private readonly toastService = inject(ToastService);
  private readonly eventHubService = inject(EventHubsService);

  defaultActions: CustomAction[] = [
    {
      key: 'customize',
      iconUrl:
        'https://skcoblobresources.blob.core.windows.net/digital-assets/images/sk-solar_pen-bold.svg',
      name: 'Personalizar',
      action: () => this.customize(),
      tooltip: 'Personaliza las columnas que quieres visualizar en la tabla',
    },
    {
      key: 'copy',
      iconUrl:
        'https://skcoblobresources.blob.core.windows.net/digital-assets/images/sk-mingcute_copy-fill.svg',
      name: 'Copiar tabla',
      action: () => this.copyTable(),
    },
    {
      key: 'graph',
      iconUrl:
        'https://skcoblobresources.blob.core.windows.net/digital-assets/images/sk-fa-solid_chart-line.svg',
      name: 'Graficar tabla',
      action: () => this.graph(),
      disableText: 'Muy pronto podrás graficar los portafolios en la gráfica',
    },
    {
      key: 'analyzeWithSami',
      iconUrl:
        'https://skcoblobresources.blob.core.windows.net/digital-assets/animations/sk-sami-contigo.gif',
      name: 'Analizar con Sami',
      action: () => this.analyzeWithSami(),
      disableText:
        'Muy pronto podrás usar la inteligencia artifical de SamiGPT para analizar esta información',
    },
  ];
  isAscending: boolean = false;
  showActionsMenu: boolean = false; // Controla la visibilidad del menú de acciones
  currentPage: number = 1;
  totalPages: number = 0;
  paginatedData!: any[];
  showMorePages: boolean = false;
  menuActionsPosition: { top: string; right: string } = {
    top: '0px',
    right: '0px',
  };
  showColumns!: { [key: string]: boolean };
  form!: FormGroup;
  customizeDropdownPosition: {
    top: string;
    left: string;
    bottom: string;
    height: string;
  } = {
    top: '0px',
    left: '0px',
    bottom: '0px',
    height: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.totalPages = Math.ceil(
      this.tableOptions.defaultData.length / this.pageSize,
    );
    if (!this.pageSizes.includes(this.tableOptions.defaultData.length)) {
      this.pageSizes.push(this.tableOptions.defaultData.length);
    }
    this.pageSizes.sort((a, b) => a - b);
    this.updatePaginatedData();
    this.getShowColumns();
  }

  async getShowColumns() {
    if (this.tableOptions.indexDBKey) {
      const showColumns =
        await this.indexDBSvc.getSpecificPropertyOfMonitorTable(
          this.tableOptions.indexDBKey,
        );
      if (showColumns.length > 0) {
        this.showColumns = showColumns[0].value as any;
        this.form = this.formBuilder.group(this.showColumns);
      } else if (this.tableOptions.showColumns) {
        this.form = this.formBuilder.group(this.tableOptions.showColumns);
        setTimeout(() => {
          this.getIdColumns();
        }, 0);
      }
    }
  }

  updatePaginatedData(): void {
    const start = Number((this.currentPage - 1) * this.pageSize);
    const end = Number(start + Number(this.pageSize));
    this.paginatedData = this.tableOptions.hasPaginator
      ? this.tableOptions.defaultData.slice(start, end)
      : this.tableOptions.defaultData;
  }

  goToPage(page: number | string): void {
    this.currentPage = Number(page);
    this.updatePaginatedData();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  updatePageSize(): void {
    this.totalPages = Math.ceil(
      this.tableOptions.defaultData.length / this.pageSize,
    );
    this.currentPage = 1; // Resetea a la primera página al cambiar el tamaño
    this.updatePaginatedData();
  }

  getPaginatorPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalPages = this.totalPages;

    // Mostrar las páginas dependiendo de la página actual
    if (totalPages <= 3) {
      // Si hay 3 páginas o menos, mostramos todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar la primera página
      if (this.currentPage > 2) {
        pages.push(1);
      }

      // Mostrar puntos intermedios si la página actual es mayor a 2
      if (this.currentPage > 2) {
        pages.push('...');
      }

      // Mostrar la página anterior si no estamos en la primera página
      if (this.currentPage > 1) {
        pages.push(this.currentPage - 1);
      }

      // Siempre mostrar la página actual
      pages.push(this.currentPage);

      // Mostrar la página siguiente si no estamos en la última página
      if (this.currentPage < totalPages) {
        pages.push(this.currentPage + 1);
      }

      // Mostrar puntos intermedios si la página actual es menor que la penúltima
      if (this.currentPage < totalPages - 1) {
        pages.push('...');
      }

      // Siempre mostrar la última página
      if (this.currentPage < totalPages - 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }

  toggleMorePages(): void {
    this.showMorePages = !this.showMorePages; // Cambia el estado al hacer clic en "..."
  }

  // Evento para cerrar el menú cuando el mouse sale
  handleMouseLeave(): void {
    this.showActionsMenu = false; // Cierra el menú
  }

  formatData(
    value: any,
    type: 'string' | 'number' | 'money' | 'percent' | 'date' | 'action',
    index: number,
    rowIndex: number,
  ): string {
    if (value === '-') {
      return value;
    }
    if (!value) {
      return this.tableOptions.columnIcons?.(
        this.tableOptions.defaultData[index],
      )[rowIndex]
        ? ''
        : '-';
    }
    switch (type) {
      case 'date':
        const tmpDate = new Date(value);
        const day =
          tmpDate.getDate() < 10 ? `0${tmpDate.getDate()}` : tmpDate.getDate();
        const month =
          tmpDate.getMonth() + 1 < 10
            ? `0${tmpDate.getMonth() + 1}`
            : tmpDate.getMonth() + 1;
        const year = tmpDate.getFullYear();
        // Formatear usando defaultFormatDate
        return `${day}/${month}/${year}`;
      case 'money':
        // Formatear usando defaultFormatMoney
        return '$ ' + this.decimalPipe.transform(value || 0, '1.2-2');
      case 'percent':
        return this.decimalPipe.transform(value || 0, '1.0-3') + ' %';
      case 'number':
        // Formatear usando defaultFormatNumber
        return `${this.decimalPipe.transform(value || 0, '1.0-2')}`;
      default:
        return value;
    }
  }

  // Método para obtener los íconos según la fila
  getRowIcons(row: any) {
    return this.tableOptions.columnIcons
      ? this.tableOptions.columnIcons(row)
      : [];
  }

  getIconPosition(row: any) {
    return this.tableOptions.positionColumnIcons
      ? this.tableOptions.positionColumnIcons(row)
      : null;
  }

  getTooltipIcon(row: any) {
    return this.tableOptions.tooltipsColumnIcons
      ? this.tableOptions.tooltipsColumnIcons(row)
      : null;
  }

  onRowAction(row: any, t: any) {
    t.close();
    this.rowDefaultAction.emit(row); // Emite el evento cuando se hace clic en ">"
  }

  toggleActionsMenu() {
    this.showActionsMenu = !this.showActionsMenu; // Alterna la visibilidad del menú
  }

  executeAction(action: CustomAction) {
    if (this.tableOptions.disableActions?.includes(action.key)) {
      return;
    }
    this.showActionsMenu = false; // Oculta el menú después de ejecutar la acción
    action.action(); // Ejecuta la acción definida en el objeto de acción
  }

  /**
   * Ordena el portafolio en ventanas de tiempo diferentes
   * a desde el último movimiento y desde el inicio
   * @param by - Llave del objeto
   * @param type - Tipo de dato
   */
  sortData(sortOptions: { by: string; type: string }) {
    if (!this.tableOptions.canSort) {
      return; // Si no se permite el ordenamiento, salir de la función
    }

    const by = sortOptions.by;
    const type = sortOptions.type;

    this.isAscending = !this.isAscending;
    this.tableOptions.defaultData.sort((a: any, b: any) => {
      if (type === 'number' || type === 'money' || type === 'percent') {
        return this.sortingService.compareNumbers(
          Number(a[by]) as number,
          Number(b[by]) as number,
          this.isAscending,
        );
      }
      if (type === 'string' || type === 'action') {
        return this.sortingService.compareStrings(
          a[by].toString(),
          b[by].toString(),
          this.isAscending,
        );
      }
      if (type === 'date') {
        const tmpA =
          a[by] === '-' || a[by] === '' ? new Date() : new Date(a[by]);
        const tmpB =
          b[by] === '-' || b[by] === '' ? new Date() : new Date(b[by]);
        return this.sortingService.compareDates(tmpA, tmpB, this.isAscending);
      }
      return this.isAscending ? 1 : 0;
    });

    // Actualizar la paginación después de ordenar
    this.totalPages = Math.ceil(
      this.tableOptions.defaultData.length / this.pageSize,
    );
    this.currentPage = 1; // Reiniciar a la primera página
    this.updatePaginatedData();
  }

  get visibleActions() {
    return this.defaultActions
      .filter((action) => !this.tableOptions.hideDefaultActions?.[action.key])
      .concat(this.tableOptions.customActions || []);
  }

  customize() {
    if (this.popoverTriggerCustomize) {
      this.thActionsTrigger.close();
      this.popoverTriggerCustomize.open();
    }
  }

  copyTable() {
    this.thActionsTrigger?.close();
    let tableData: string = '';

    // 1. Seleccionamos los encabezados de la tabla actual, ignorando la columna de acciones
    const headers =
      this.tableElement.nativeElement.querySelectorAll('thead th');
    const headerData: string[] = [];

    headers.forEach((header: any, index: number) => {
      const isActionStart =
        ((this.tableOptions.hasRowActions &&
          this.tableOptions.rowActionsPosition === 'start') ||
          this.tableOptions.indexColumnType) &&
        index === 0;
      const isActionEnd =
        this.tableOptions.hasRowActions &&
        this.tableOptions.rowActionsPosition === 'end' &&
        index === headers.length - 1;

      if (isActionStart || isActionEnd) return;

      headerData.push(header.innerText.trim()); // Recogemos el texto de cada encabezado
    });

    // Agregamos los encabezados al principio de la cadena de datos
    tableData += headerData.join('\t') + '\n';

    // 2. Seleccionamos todas las filas de la tabla actual (body)
    const rows = this.tableElement.nativeElement.querySelectorAll('tbody tr');

    // Iteramos sobre cada fila
    rows.forEach((row: any) => {
      const cells = row.querySelectorAll('td');
      const rowData: string[] = [];

      // Iteramos sobre cada celda, ignorando la columna de acciones
      cells.forEach((cell: any, index: number) => {
        const isActionStart =
          ((this.tableOptions.hasRowActions &&
            this.tableOptions.rowActionsPosition === 'start') ||
            this.tableOptions.indexColumnType) &&
          index === 0;
        const isActionEnd =
          this.tableOptions.hasRowActions &&
          this.tableOptions.rowActionsPosition === 'end' &&
          index === cells.length - 1;

        if (isActionStart || isActionEnd) return;

        const cellValue = cell.innerText.trim();
        let isPercent = false;

        if (cellValue.includes('%')) {
          isPercent = true;
        }

        const numberValue = cellValue.replace(/[$\s%]/g, '').replace(/\,/g, '');

        const parsedNumber = Number(numberValue);
        if (!isNaN(parsedNumber)) {
          const formattedNumber = isPercent
            ? (parsedNumber / 100).toString()
            : parsedNumber.toString();
          rowData.push(formattedNumber);
        } else {
          rowData.push(cellValue);
        }
      });

      // Convertimos la fila a un string separado por tabulaciones
      tableData += rowData.join('\t') + '\n';
    });

    // 3. Usamos la API de portapapeles para copiar el contenido
    if (!navigator.clipboard) {
      console.error('La API de portapapeles no está disponible.');
      return;
    }

    navigator.clipboard
      .writeText(tableData)
      .then(() => {
        this.toastService.show(
          "La tabla ha sido copiada al portapapeles, presiona las teclas 'ctrl+ v' para pegarla en cualquier aplicación.",
          'success',
          5000,
        );
        this.eventHubService.sendEventHubEvent('Copiar tabla');
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles: ', err);
      });
  }

  graph() {
    // Lógica para la acción de graficar
  }

  analyzeWithSami() {
    this.thActionsTrigger.close();
    this.analyzeSami.emit(true);
  }

  executeCellAction(key: string, row: any, index: number) {
    if (this.tableOptions.columnTypes?.[index] === 'action') {
      this.rowAction.emit({
        key: key,
        data: row,
      });
    }
  }

  getIdColumns() {
    if (!this.tableOptions.indexDBKey) {
      return;
    }

    this.eventHubService.sendEventHubEvent('Personalizar vista');

    this.showColumns = { ...this.form.value };
    this.indexDBSvc
      .getSpecificPropertyOfMonitorTable(this.tableOptions.indexDBKey)
      .then((monitorTable) => {
        if (monitorTable.length > 0) {
          if (this.tableOptions.indexDBKey) {
            this.indexDBSvc
              .updatePropertyInMonitorTable(
                this.tableOptions.indexDBKey,
                this.showColumns as any,
              )
              .then(() => {})
              .catch((error) => {
                console.error('updatePropertyInMonitorTable error,', error);
              });
          }
        } else {
          if (this.tableOptions.indexDBKey) {
            this.indexDBSvc
              .addPropertyInMonitorTable(
                this.tableOptions.indexDBKey,
                this.showColumns as any,
              )
              .then(() => {})
              .catch((error) => {
                console.error('addPropertyInMonitorTable error,', error);
              });
          }
        }
      });

    if (this.popoverTriggerCustomize) {
      this.popoverTriggerCustomize.close();
    }
  }

  /**
   * Verifica si la tabla tiene menos de 3 columnas dispositivos móviles
   */
  get isMinorLegth(): boolean {
    return this.tableOptions?.defaultData.length <= 3;
  }

  openPopOver() {
    this.popover.open();
    this.thActionsTrigger.close();
  }

  closePopOver() {
    this.popover.close();
  }
}
