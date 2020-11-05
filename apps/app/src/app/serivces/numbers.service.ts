import { Injectable } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { bufferTime, tap } from 'rxjs/operators';

/* TASK 3 */
@Injectable({ providedIn: 'root' })
export class NumbersService {
  private myNumber$= new Subject<number>();

  constructor() {
    interval(500).pipe(
      tap({
        next: () => this.myNumber$.next(Math.random()),
      }),
    ).subscribe();
  }

  getNumber(): Observable<number> {
    return this.myNumber$.asObservable();
  }

  getListOfNumbers(): Observable<number[]> {
    return this.getNumber().pipe(
      bufferTime(2000),
    );
  }
}
