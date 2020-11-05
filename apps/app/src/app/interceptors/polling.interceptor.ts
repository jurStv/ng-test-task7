import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of,  } from 'rxjs';
import { delay } from 'rxjs/operators';

import { POLLING_URL } from '../constats';
import { randomIntFromInterval } from '../utils';

@Injectable()
export class PollingInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes(POLLING_URL) || request.method !== 'GET') {
      return next.handle(request);
    }

    return of(new HttpResponse({ status: 200, body: { payload: 'Some useful information' } })).pipe(
      delay(randomIntFromInterval(1000, 3000))
    );
  }
}
