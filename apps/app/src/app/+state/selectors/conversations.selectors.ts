import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConversations from '../reducers/conversations.reducer';

export const selectConversationsState = createFeatureSelector<fromConversations.State>(
  fromConversations.conversationsFeatureKey
);
