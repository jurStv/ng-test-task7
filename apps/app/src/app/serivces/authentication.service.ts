import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private isUserLoggedInSource = new BehaviorSubject<boolean>(false);

  get isUserLoggedIn$() {
    return this.isUserLoggedInSource.asObservable().pipe(
      distinctUntilChanged(),
    );
  }

  constructor() {}

  logIn() {
    this.isUserLoggedInSource.next(true);
  }

  logOut() {
    this.isUserLoggedInSource.next(false);
  }

  toggle() {
    const state = !this.isUserLoggedInSource.getValue();

    this.isUserLoggedInSource.next(state);
  }
}
