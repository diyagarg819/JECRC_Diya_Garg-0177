import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { TransactionFilter } from '../../features/filter-bar/filter-bar.component';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly apiUrl = 'http://localhost:5000/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(filter?: TransactionFilter): Observable<Transaction[]> {
    let params = new HttpParams();
    if (filter?.date) params = params.set('date', filter.date);
    if (filter?.type !== undefined) params = params.set('type', filter.type.toString());
    if (filter?.search) params = params.set('search', filter.search);
    return this.http.get<Transaction[]>(this.apiUrl, { params });
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  createTransaction(tx: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, tx);
  }

  updateTransaction(id: number, tx: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, tx);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
