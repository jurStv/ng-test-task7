import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { PollingInterceptor, MessageInterceptor } from './interceptors';
import { StoreModule } from '@ngrx/store';
import * as fromMessages from './+state/reducers/messages.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects } from './+state/effects/messages.effects';
import * as fromConversations from './+state/reducers/conversations.reducer';
import { ConversationsEffects } from './+state/effects/conversations.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(fromMessages.messagesFeatureKey, fromMessages.reducer),
    StoreModule.forFeature(fromConversations.conversationsFeatureKey, fromConversations.reducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MessagesEffects, ConversationsEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PollingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MessageInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
