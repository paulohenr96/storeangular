import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Constants } from '../constants';
import { Sale } from '../model/sale';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}

  getSales(page: Number): any {
    return sessionStorage.getItem('admin') === 'true'
      ? this.http.get(Constants.url_sales + '?page=' + page)
      : this.http.get(Constants.url_sales + '/username?page=' + page);
  }

  getMonthlyTotal(month: Number): any {
    return this.http.get(Constants.url_sales + '/income/' + month);
  }
  saveSales(sale: Sale): any {
    return this.http.post(Constants.url_sales, sale).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error on savesale() => ', error.message);
        console.error(error);
        alert('Error saving sale...');
        return throwError('Error during httprequest');
      })
    );
  }
  getChart(year: number): any {
    return this.http.get(Constants.url_sales + '/chart?year=' + year);
  }
  getChartByUsername(year: number, username: string): any {
    console.log('username => ', username);
    return this.http.get(
      Constants.url_sales +
        '/chart/username?year=' +
        year +
        '&username=' +
        username
    );
  }
  deleteSale(id: Number): any {
    return this.http.delete(Constants.url_sales + '/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error on deleteSale() => ', error.message);
        console.error(error);
        alert('Error deleting sale...');
        return throwError('Error during httprequest');
      })
    );
  }
}
