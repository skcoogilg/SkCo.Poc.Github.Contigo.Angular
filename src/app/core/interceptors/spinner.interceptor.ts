import type { HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '@services/spinner.service';
import { inject, Signal } from '@angular/core';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  const urlSpinnerMap: { [key: string]: Signal<boolean> } = {
    'MFUND-Summary': spinnerService.isInvestSummaryLoading,
    'MFUND-Detail': spinnerService.isInvestDetailLoading,
    'MFUND-Accounts': spinnerService.isInvestAccountsLoading,
    'MFUND-Transactions': spinnerService.isInvestTransactionsLoading,
    'MFUND-Standing': spinnerService.isInvestStandingLoading,
    'Insurance-detail': spinnerService.isInsuranceDetailLoading,
    'Insurance-premiums': spinnerService.isInsurancePaymentHistoryLoading,
    'Insurance-AutomaticDebit': spinnerService.isInsuranceAutomaticDebitLoading,
    GetDetailedContract: spinnerService.isDetailedContractLoading,
    GettransactionFund: spinnerService.isTransactionFundLoading,
    GetTransactionFundTable: spinnerService.isTransactionFundTableLoading,
    invoke: spinnerService.isDataPensionInfoLoading,
    'FICS-Detail': spinnerService.isInvestmentFicsLoading,
    'FICS-summary': spinnerService.isFicSummaryLoading,
    GenerateUrlPipelineContract: spinnerService.isPipeline2UrlLoading,
    'FPOB-details': spinnerService.isOblDetailsLoading,
    'FPOB-pensionBond': spinnerService.isOblPensionBonusLoading,
    'FPOB-WorkHistory': spinnerService.isOblWorkHistoryLoading,
    'FPOB-FpobTransfers': spinnerService.isOblTransfersLoading,
    'FPOB-Movements': spinnerService.isOblMovementsLoading,
    'MFUND-Combination': spinnerService.isInvestCombinationLoading,
    'MFUND-AutomaticDebit': spinnerService.isInvestAutomaticDebitLoading,
    'MFUND-TransferProfile':
      spinnerService.isInvestMovementTransferProfileLoading,
  };
  for (const key in urlSpinnerMap) {
    if (req.url.includes(key)) {
      const spinner = urlSpinnerMap[key];
      (spinner as any).set(true);
      return next(req).pipe(finalize(() => (spinner as any).set(false)));
    }
  }
  return next(req).pipe(finalize(() => false));
};
