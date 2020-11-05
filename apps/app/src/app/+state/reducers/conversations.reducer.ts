import { Action, createReducer, on } from '@ngrx/store';
import { IConversation } from '../../interfaces';
import * as ConversationsActions from '../actions/conversations.actions';

export const conversationsFeatureKey = 'conversations';

export type State = IConversation[];

export const initialState: State = [];


export const reducer = createReducer(
  initialState,

  on(ConversationsActions.loadConversationss, state => state),

);

