import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  isInvestSummaryLoading = signal<boolean>(false);
  isInvestDetailLoading = signal<boolean>(false);
  isInvestAccountsLoading = signal<boolean>(false);
  isInvestTransactionsLoading = signal<boolean>(false);
  isInvestStandingLoading = signal<boolean>(false);
  isInvestCombinationLoading = signal<boolean>(false);
  isInsuranceDetailLoading = signal<boolean>(false);
  isInsurancePaymentHistoryLoading = signal<boolean>(false);
  isInsuranceAutomaticDebitLoading = signal<boolean>(false);
  isDetailedContractLoading = signal<boolean>(false);
  isTransactionFundLoading = signal<boolean>(false);
  isTransactionFundTableLoading = signal<boolean>(false);
  isDataPensionInfoLoading = signal<boolean>(false);
  isInvestmentFicsLoading = signal<boolean>(false);
  isFicSummaryLoading = signal<boolean>(false);
  isPipeline2UrlLoading = signal<boolean>(false);
  isOblDetailsLoading = signal<boolean>(false);
  isOblPensionBonusLoading = signal<boolean>(false);
  isOblWorkHistoryLoading = signal<boolean>(false);
  isOblTransfersLoading = signal<boolean>(false);
  isOblMovementsLoading = signal<boolean>(false);
  isInvestAutomaticDebitLoading = signal<boolean>(false);
  isInvestMovementTransferProfileLoading = signal<boolean>(false);
}
