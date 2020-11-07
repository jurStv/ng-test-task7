import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of,  } from 'rxjs';
import { delay } from 'rxjs/operators';

import { MESSAGES_URL } from '../constats';
import { randomIntFromInterval } from '../utils';
import { MESSAGES } from './message.data';

@Injectable()
export class MessageInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes(MESSAGES_URL) || request.method !== 'GET') {
      return next.handle(request);
    }
    const query = request.params.get('query') || '';
    const body = MESSAGES.filter(({ text }) => text.includes(query));

    return of(new HttpResponse({ status: 200, body})).pipe(
      delay(randomIntFromInterval(500, 1500))
    );
  }
}
