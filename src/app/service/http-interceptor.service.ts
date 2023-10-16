import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = sessionStorage.getItem('token') + '';
    if (token == 'null' || token.trim() == '') {
      console.log('Sem Token No Interceptor');
      return next.handle(req);
    }
    var authRequest = req.clone({
      headers: req.headers.set('Authorization', token),
    });

    console.log(authRequest);
    return next.handle(authRequest);
  }
}
