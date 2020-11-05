import { Inject, Injectable } from '@angular/core';
import { Observable, fromEvent, merge, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, mapTo, startWith } from 'rxjs/operators';
import { NAVIGATOR } from '@ng-web-apis/common';

@Injectable({ providedIn: 'root' })
export class NetworkStatusService {
  private networkStatu$: BehaviorSubject<boolean>;

  constructor(
    @Inject(NAVIGATOR) readonly navigator: Navigator,
  ) {
    const currentStatus = navigator.onLine;
    this.networkStatu$ = new BehaviorSubject(currentStatus);
    const onlineEvent$ = fromEvent(window, 'online').pipe(mapTo(true));
    const offlineEvent$ = fromEvent(window, 'offline').pipe(mapTo(false));

    merge(onlineEvent$, offlineEvent$).pipe(
      startWith(currentStatus),
    ).subscribe(this.networkStatu$);
  }

  getOnlineStatus(): Observable<boolean> {
    return this.networkStatu$.asObservable().pipe(
      distinctUntilChanged(),
    );
  }
}
