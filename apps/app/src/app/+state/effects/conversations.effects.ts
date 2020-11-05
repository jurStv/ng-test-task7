import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as ConversationsActions from '../actions/conversations.actions';


@Injectable()
export class ConversationsEffects {
  constructor(private actions$: Actions) {}
}
