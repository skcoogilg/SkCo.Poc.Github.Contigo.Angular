import { Funds } from '@interfaces/comparation-filter.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotDataModalComponent } from '@sharedComponents/not-data-modal/not-data-modal.component';

export const deleteDuplicateFunds = (funds: Funds[]): any[] => {
  return funds.filter(
    (value, index, self) =>
      index === self.findIndex((obj) => obj.idFund === value.idFund),
  );
};

export const showEmptyReportAlert = (modalService: NgbModal) => {
  const modalRef = modalService.open(NotDataModalComponent, {
    size: 'md',
    centered: true,
    ariaLabelledBy: 'TransactionDetails',
  });
  modalRef.componentInstance.title = 'Información no disponible';
  modalRef.componentInstance.description =
    'El informe de este portafolio no se encuentra disponible.';
  modalRef.componentInstance.type = 'error';
  modalRef.componentInstance.showBackBtn = true;
};
