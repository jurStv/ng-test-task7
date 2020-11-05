import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as MessagesActions from '../actions/messages.actions';


@Injectable()
export class MessagesEffects {

  constructor(private actions$: Actions) {}

}
