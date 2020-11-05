import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

import { POLLING_URL } from '../constats';

interface IUsefulInformation {
  payload: string;
}

/* TASK 1 */
@Injectable({ providedIn: 'root' })
export class PollingService {
  private pollingSource = new Subject();
  private get pollingAdress() {
    return POLLING_URL;
  }

  constructor(
    private readonly http: HttpClient,
  ) {}

  startPolling(): Observable<IUsefulInformation> {
    return this.pollingSource.asObservable().pipe(
      startWith(true),
      switchMap(() => this.http.get<IUsefulInformation>(this.pollingAdress)),
      tap({
        next: () => this.pollingSource.next(),
      }),
    );
  }
}
