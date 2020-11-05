import { Action, createReducer, on } from '@ngrx/store';

import { IMessage } from '../../interfaces';
import * as MessagesActions from '../actions/messages.actions';

export const messagesFeatureKey = 'messages';

export type State = IMessage[];

export const initialState: State = [];


export const reducer = createReducer(
  initialState,
  on(MessagesActions.loadMessagess, state => state),
);

