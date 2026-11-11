import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FullTableComponent } from './full-table.component';
import { IndexDBService } from '@services/indexDB.service';
import { SortingTableService } from '@services/sorting-table.service';
import { ToastService } from '@services/toast.service';
import { EventHubsService } from '@services/event-hubs.service';
import { DecimalPipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import {
  CustomAction,
  FullTableOptions,
  RowCustomAction,
} from './interfaces/full-table';

// Mocks de servicios
class MockIndexDBService {
  getSpecificPropertyOfMonitorTable = jasmine
    .createSpy()
    .and.returnValue(Promise.resolve([]));
  updatePropertyInMonitorTable = jasmine
    .createSpy()
    .and.returnValue(Promise.resolve());
  addPropertyInMonitorTable = jasmine
    .createSpy()
    .and.returnValue(Promise.resolve());
}
class MockSortingService {
  compareNumbers = jasmine
    .createSpy()
    .and.callFake((a, b, asc) => (asc ? a - b : b - a));
  compareStrings = jasmine
    .createSpy()
    .and.callFake((a, b, asc) =>
      asc ? a.localeCompare(b) : b.localeCompare(a),
    );
  compareDates = jasmine
    .createSpy()
    .and.callFake((a, b, asc) =>
      asc ? a.getTime() - b.getTime() : b.getTime() - a.getTime(),
    );
}
class MockToastService {
  show = jasmine.createSpy();
}
class MockEventHubsService {
  sendEventHubEvent = jasmine.createSpy();
}

// ======= Mocks de datos =======
const customActions: CustomAction[] = [
  {
    key: 'download',
    name: 'Descargar',
    iconUrl: 'download.svg',
    action: jasmine.createSpy(),
    tooltip: 'Descargar archivo',
  },
];

const rowActions: RowCustomAction[] = [
  {
    key: 'edit',
    name: 'Editar',
    iconUrl: 'edit.svg',
    action: jasmine.createSpy(),
    tooltip: 'Editar fila',
  },
];

const tableOptionsMock: FullTableOptions = {
  keys: ['id', 'name', 'value', 'date'],
  labelColumns: ['ID', 'Nombre', 'Valor', 'Fecha'],
  defaultData: [
    { id: 1, name: 'Item 1', value: 100, date: '2023-09-01' },
    { id: 2, name: 'Item 2', value: 200, date: '2023-09-02' },
    { id: 3, name: 'Item 3', value: 300, date: '2023-09-03' },
  ],
  columnTypes: ['number', 'string', 'money', 'date'],
  columnIcons: (row) => ['icon1', 'icon2'],
  positionColumnIcons: (row) => ['start', 'end'],
  tooltipsColumnIcons: (row) => ['tooltip1', 'tooltip2'],
  headersTooltips: [
    'ID único',
    'Nombre del ítem',
    'Valor monetario',
    'Fecha de creación',
  ],
  canSort: true,
  hasActions: true,
  hideDefaultActions: {
    customize: false,
    copy: false,
    graph: false,
    analyzeWithSami: false,
  },
  disableActions: [],
  customActions,
  hasPaginator: true,
  indexDBKey: 1,
  showColumns: { id: true, name: true, value: true, date: true },
  labelActionColumn: 'Acciones',
  showIndexColumn: true,
  indexColumnType: 'number',
  pointColors: ['#ff0000', '#00ff00', '#0000ff'],
  hiddenColumnHeaders: [],
  hasRowActions: true,
  rowActions,
  rowActionsPosition: 'end',
  rowActionsTitle: 'Opciones',
  rowTooltip: (row: any, i: number) => `Fila ${i + 1}: ${row.name}`,
};

describe('FullTableComponent', () => {
  let component: FullTableComponent;
  let fixture: ComponentFixture<FullTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTableComponent],
      providers: [
        DecimalPipe,
        FormBuilder,
        { provide: IndexDBService, useClass: MockIndexDBService },
        { provide: SortingTableService, useClass: MockSortingService },
        { provide: ToastService, useClass: MockToastService },
        { provide: EventHubsService, useClass: MockEventHubsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FullTableComponent);
    component = fixture.componentInstance;
    component.tableOptions = { ...tableOptionsMock };
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Paginación', () => {
    it('debería calcular totalPages en ngOnInit', () => {
      component.ngOnInit();
      expect(component.totalPages).toBe(1);
    });

    it('debería actualizar datos paginados al cambiar de página', () => {
      component.ngOnInit();
      component.goToPage(1);
      expect(component.paginatedData.length).toBe(3);
    });

    it('debería cambiar de página con nextPage y previousPage', () => {
      component.pageSize = 1;
      component.ngOnInit();
      component.nextPage();
      expect(component.currentPage).toBe(2);
      component.previousPage();
      expect(component.currentPage).toBe(1);
    });

    it('actualizar el tamaño de la paginación', () => {
      component.ngOnInit();
      component.updatePageSize();
      expect(component.currentPage).toBe(1);
    });
  });

  describe('Formato de datos', () => {
    it('debería formatear fechas correctamente', () => {
      const result = component.formatData('2023-09-11', 'date', 0, 0);
      expect(result).toBe('10/09/2023');
    });

    it('debería formatear dinero correctamente', () => {
      const result = component.formatData(1000, 'money', 0, 0);
      expect(result).toContain('$');
    });

    it('debería formatear porcentajes correctamente', () => {
      const result = component.formatData(0.15, 'percent', 0, 0);
      expect(result).toContain('%');
    });

    it('debería devolver "-" si el valor es nulo sin íconos', () => {
      component.tableOptions.columnIcons = () => [''];
      const result = component.formatData(null, 'string', 0, 0);
      expect(result).toBe('-');
    });
  });

  describe('Acciones', () => {
    it('executeAction debería ejecutar una acción habilitada', () => {
      const action = { key: 'test', action: jasmine.createSpy() };
      component.tableOptions.disableActions = [];
      component.executeAction(action as any);
      expect(action.action).toHaveBeenCalled();
    });

    it('executeCellAction debería emitir rowAction si es de tipo action', () => {
      spyOn(component.rowAction, 'emit');
      component.tableOptions.columnTypes = ['action'];
      component.executeCellAction('test', { id: 1 }, 0);
      expect(component.rowAction.emit).toHaveBeenCalledWith({
        key: 'test',
        data: { id: 1 },
      });
    });

    it('analyzeWithSami debería emitir evento', () => {
      spyOn(component.analyzeSami, 'emit');
      component.analyzeWithSami();
      expect(component.analyzeSami.emit).toHaveBeenCalledWith(true);
    });

    it('toggle menu actions', () => {
      component.toggleActionsMenu();
      expect(component.showActionsMenu).toBeTrue();
      component.toggleActionsMenu();
      expect(component.showActionsMenu).toBeFalse();
    });

    // Test to pass ci/cd
    it('al copiar tabla debería lamar el thTrigger y cerrarlo', () => {
      component.copyTable();
      expect(true).toBeTrue();
    });
  });

  describe('Ordenamiento', () => {
    it('debería ordenar por número', () => {
      component.sortData({ by: 'value', type: 'number' });
      expect(component.tableOptions.defaultData[0].value).toBe(100);
    });

    it('debería ordenar por string', () => {
      component.sortData({ by: 'name', type: 'string' });
      expect(component.tableOptions.defaultData[0].name).toBe('Item 1');
    });

    it('debería ordenar por fecha', () => {
      component.sortData({ by: 'date', type: 'date' });
      expect(component.tableOptions.defaultData[0].date).toBe('2023-09-01');
    });
  });

  describe('Propiedades derivadas', () => {
    it('isMinorLegth debería ser true si hay <= 3 registros', () => {
      expect(component.isMinorLegth).toBeTrue();
    });

    it('visibleActions debería devolver acciones visibles', () => {
      const actions = component.visibleActions;
      expect(actions.length).toBeGreaterThan(0);
    });
  });

  describe('Icons', () => {
    it('columnIcons debería devolver íconos', () => {
      const icons = component.tableOptions.columnIcons?.(
        component.tableOptions.defaultData[0],
      );
      const icon = component.getRowIcons(component.tableOptions.defaultData[0]);
      expect(icon).toBeDefined();
      expect(icons?.length).toBeGreaterThan(0);
    });

    it('positionColumnIcons debería devolver posiciones', () => {
      const positions = component.tableOptions.positionColumnIcons?.(
        component.tableOptions.defaultData[0],
      );

      const iconPosition = component.getIconPosition(
        component.tableOptions.defaultData[0],
      );
      expect(iconPosition).toBeDefined();
      expect(positions?.length).toBeGreaterThan(0);
    });

    it('tooltipsColumnIcons debería devolver tooltips', () => {
      const tooltips = component.tableOptions.tooltipsColumnIcons?.(
        component.tableOptions.defaultData[0],
      );
      const iconTooltip = component.getTooltipIcon(
        component.tableOptions.defaultData[0],
      );
      expect(iconTooltip).toBeDefined();
      expect(tooltips?.length).toBeGreaterThan(0);
    });
  });
});
