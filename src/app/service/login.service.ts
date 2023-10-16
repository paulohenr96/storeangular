import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Constants } from '../constants';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(user: User): any {
    console.log(user);
    return this.http.post(Constants.url + '/login', user);
  }
}
