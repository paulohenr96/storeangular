import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Constants } from '../constants';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Metrics } from '../model/metrics';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  newPassword(u: User) {
    return this.http.put<String>(Constants.url + '/users/newpassword', u).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(Constants.url + '/users').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }
  deleteById(id: Number): Observable<String> {
    return this.http.delete<String>(Constants.url + '/users/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }
  edit(user: User): Observable<any> {
    console.log(user);
    return this.http.put<any>(Constants.url + '/users', user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  save(user: User): Observable<string> {
    return this.http.post<any>(Constants.url + '/users', user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return error.status === 409 ? of('Invalid username') : of('Error');
      })
    );
  }
  getById(id: Number): Observable<User> {
    return this.http.get<User>(Constants.url + '/users/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }
  confirmPassword(pass: String): Observable<any> {
    return this.http.post<any>(Constants.url + '/users/confirmpassword', pass);
  }
  getMetrics(): Observable<Metrics> {
    return this.http.get<Metrics>(Constants.url + '/users/metrics').pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }

  editMetrics(metrics: any): Observable<String> {
    console.log(metrics);
    return this.http
      .put<String>(Constants.url + '/users/metrics', metrics)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError('Error during httprequest');
        })
      );
  }
}
