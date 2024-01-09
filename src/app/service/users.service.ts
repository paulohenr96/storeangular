import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Constants } from '../constants';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
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
  edit(user: User): Observable<String> {
    console.log(user);
    return this.http.put<String>(Constants.url + '/users', user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('Error during httprequest');
      })
    );
  }

  save(user: User): Observable<String> {
    console.log(user);
    return this.http.post<String>(Constants.url + '/users', user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError('Error during httprequest');
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
}
