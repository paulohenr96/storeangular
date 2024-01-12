import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product';
import { Constants } from '../constants';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  saveproduct(product: Product): any {
    console.log(product);
    return this.http.post(Constants.url_products, product).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error on saveproduct() => ', error.message);
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }
  getInfo(): any {
    return this.http.get(Constants.url_products + '/infos').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error on count() => ', error.message);
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }

  deleteProduct(id: number): any {
    return this.http.delete(Constants.url_products + '/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error on delete() => ', error.message);
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }

  getProducts(page: number): any {
    return this.http
      .get(Constants.url_products + '?page=' + page + '&size=5')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error on getProducts() => ', error.message);
          console.error(error);
          return throwError('Error during httprequest');
        })
      );
  }
  checkQuantity(): Observable<Product[]> {
    return this.http
      .get<Product[]>(Constants.url_products + '/checkquantity')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error on getProducts() => ', error.error);
          console.error(error);
          return throwError('Error during httprequest');
        })
      );
  }

  getProduct(id: Number): any {
    return this.http.get(Constants.url_products + '/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error on getProduct() => ', error.message);
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }

  editProduct(p: Product) {
    alert('Editando ' + p.id);
    return this.http.put(Constants.url_products + '/' + p.id, p).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error on editProduct() => ', error.message);
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }
}
