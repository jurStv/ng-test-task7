import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMessages from '../reducers/messages.reducer';

export const selectMessagesState = createFeatureSelector<fromMessages.State>(
  fromMessages.messagesFeatureKey
);
