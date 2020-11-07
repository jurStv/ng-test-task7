import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed, OnDestroy$ } from '@pdtec/ngx-observable-lifecycle';
import { combineLatest, merge, NEVER } from 'rxjs';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { IMessage } from './interfaces';

import {
  AuthenticationService, NetworkStatusService, MessageService, NumbersService, PollingService,
} from './serivces';

@Component({
  selector: 'test-task-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends OnDestroy$ implements OnInit {
  @HostBinding('class.dark-theme') isDarkThemeOn = false;

  searchResults: IMessage[] = [];
  searchControl = new FormControl('');

  get authenticationButtonText$() {
    return this.auth.isUserLoggedIn$.pipe(
      map((isLoggedIn) => isLoggedIn ? 'Log out' : 'Log in'),
    );
  }

  get themeButtonText() {
    return this.isDarkThemeOn ? 'Switch to light theme' : 'Switch to dark theme';
  }

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly auth: AuthenticationService,
    private readonly network: NetworkStatusService,
    private readonly message: MessageService,
    private readonly numbers: NumbersService,
    private readonly polling: PollingService,
  ) {
    super();
  }

  ngOnInit() {
    const message$ = this.searchControl.valueChanges.pipe(
      debounceTime(250),
      startWith(''),
      /* TASK 4 */
      switchMap((query) => this.message.searchMessages(query)),
      tap({
        next: (messages) => this.searchResults = messages,
      }),
      tap({
        next: () => this.cd.detectChanges(),
      }),
    );
    const networkStatuse$ = this.network.getOnlineStatus().pipe(
      tap({
        next: (isOnline) => console.log(isOnline ? 'Online' : 'Offline'),
      }),
    );
    const number$ = this.numbers.getListOfNumbers().pipe(
      tap({
        next: (numbers) => console.log(`Numbers: ${JSON.stringify(numbers)}`),
      }),
    );
    const polling$ = this.network.getOnlineStatus().pipe(
      switchMap((isOnline) => {
        if (!isOnline) {
          console.log('Polling turned off!')
          return NEVER;
        }

        return this.polling.startPolling().pipe(
          tap({
            next: ({ payload }) => console.log(`Got some useful information through polling: ${payload}`),
          }),
        );
      }),
    );
    /* TASK 2 */
    const onlineAndLoggedIn$ = combineLatest([this.network.getOnlineStatus() , this.auth.isUserLoggedIn$]).pipe(
      tap({
        next: ([isOnline, isLoggedIn]) => {
          if (isOnline && isLoggedIn) {
            console.log('User is online and logged in');
          }
        },
      }),
    );


    merge(message$, networkStatuse$, number$, polling$, onlineAndLoggedIn$).pipe(
      takeUntilDestroyed(this),
    ).subscribe();
  }

  toggleAuthentication() {
    this.auth.toggle();
  }

  toggleDarkTheme() {
    this.isDarkThemeOn = !this.isDarkThemeOn;
  }
}
