import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MESSAGES_URL } from '../constats';
import { IMessage } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class MessageService {

  constructor(
    private readonly http: HttpClient,
  ) {}

  searchMessages(query = ''): Observable<IMessage[]> {
    return this.http.get<IMessage[]>(MESSAGES_URL, { params: { query } });
  }
}
