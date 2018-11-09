export interface ITransaction {
  paymentAmount: string;
  customerFullName: string;
  customerEmail: string;
  paymentCurrencyCd: number;
  eventCustomerDatetime: string;
  cardAcquirerReference: string;
  eventStatusName: string;
}
