// utils-funds.spec.ts
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotDataModalComponent } from '@sharedComponents/not-data-modal/not-data-modal.component';
import { deleteDuplicateFunds, showEmptyReportAlert } from './shared-utils';

describe('Funds Utilities', () => {
  describe('deleteDuplicateFunds', () => {
    it('debería eliminar fondos duplicados por idFund', () => {
      const funds = [
        { idFund: 1, name: 'Fondo A' },
        { idFund: 2, name: 'Fondo B' },
        { idFund: 1, name: 'Fondo A duplicado' },
      ] as any;

      const result = deleteDuplicateFunds(funds);

      expect(result.length).toBe(2);
      expect(result).toEqual([
        { idFund: 1, name: 'Fondo A' },
        { idFund: 2, name: 'Fondo B' },
      ]);
    });

    it('debería devolver el mismo array si no hay duplicados', () => {
      const funds = [
        { idFund: 1, name: 'Fondo A' },
        { idFund: 2, name: 'Fondo B' },
      ] as any;

      const result = deleteDuplicateFunds(funds);

      expect(result.length).toBe(2);
      expect(result).toEqual(funds);
    });
  });

  describe('showEmptyReportAlert', () => {
    let modalService: jasmine.SpyObj<NgbModal>;
    let modalRefMock: any;

    beforeEach(() => {
      modalRefMock = {
        componentInstance: {
          title: '',
          description: '',
          type: '',
          showBackBtn: false,
        },
      };

      modalService = jasmine.createSpyObj('NgbModal', ['open']);
      modalService.open.and.returnValue(modalRefMock);
    });

    it('debería abrir un modal con las propiedades correctas', () => {
      showEmptyReportAlert(modalService);

      expect(modalService.open).toHaveBeenCalledWith(NotDataModalComponent, {
        size: 'md',
        centered: true,
        ariaLabelledBy: 'TransactionDetails',
      });

      expect(modalRefMock.componentInstance.title).toBe(
        'Información no disponible',
      );
      expect(modalRefMock.componentInstance.description).toBe(
        'El informe de este portafolio no se encuentra disponible.',
      );
      expect(modalRefMock.componentInstance.type).toBe('error');
      expect(modalRefMock.componentInstance.showBackBtn).toBeTrue();
    });
  });
});
