import {Component, OnInit} from '@angular/core';
import {ITransaction} from './transaction';
import {HttpClient} from '@angular/common/http';
import {TransactionService} from './transaction.service';

@Component({
  selector: 'pm-transactions',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  ENTER_EVENT_CODE = 13;

  pageTitle = 'transaction list';
  _placeHolder: string;
  _listFilter = '';
  filteredTransactions: ITransaction[];
  transactions: ITransaction[];

  constructor(private http: HttpClient,
              private transactionService: TransactionService) {
    this.filteredTransactions = this.transactions;
    this._placeHolder = 'Search by email, reference, name, amount, last 4...';
  }

  ngOnInit(): void {
    console.log('just a hello');
    this.getTransactions();
    this.filteredTransactions = this.transactions;
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(it => this.transactions = it);
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTransactions = this.listFilter ? this.performFilter(this.listFilter) : this.transactions;
  }

  get placeHolder(): string {
    return this._placeHolder;
  }

  set placeHolder(value: string) {
    this._placeHolder = value;
  }

  onLabelSuggestionClick(text: string): void {
    // if (this._value.includes(text)) {
      this.addAndIfNecesary();
      this._listFilter += (text + ':');
      document.getElementById('searchBox').focus();
    // }
  }

  private addAndIfNecesary() {
    if (this._listFilter !== '') {
      this._listFilter += ' AND ';
    }
  }

  onSearchBoxKeyPress($event) {
    if ($event.which === this.ENTER_EVENT_CODE) {
      this.filteredTransactions = this.listFilter ? this.performFilter(this.listFilter) : this.transactions;
    }
  }

  performFilter(filterBy: string): ITransaction[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.transactions;
    // return this.transactions.filter((transaction: ITransaction) =>
    //         transaction.price.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

}
