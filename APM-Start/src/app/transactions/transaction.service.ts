import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITransaction} from './transaction';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TransactionService {

  private transactionsUrl = 'api/transactions';

  constructor(private http: HttpClient) {
  }

  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<any[]>(this.transactionsUrl).pipe(
      map(it =>
        it.map(it1 => {
          return {
            paymentAmount: it1.payment_amount,
            customerFullName: it1.customer_full_name,
            customerEmail: it1.customer_email,
            paymentCurrencyCd: it1.payment_currency_cd,
            eventCustomerDatetime: it1.event_customer_datetime,
            cardAcquirerReference: it1.card_acquirer_reference,
            eventStatusName: it1.event_status_name
          } as ITransaction;
        })
      ));
  }
}
