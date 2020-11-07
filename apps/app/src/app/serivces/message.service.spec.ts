import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MESSAGES_URL } from '../constats';
import { MessageService } from './message.service';

describe('MessageService', () => {
  const query = 'query';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService],
    });
  });

  it('should be created', inject(
    [MessageService, HttpTestingController],
    (service: MessageService, httpMock: HttpTestingController) => {
      expect(service).toBeTruthy();
  }));

  it('should make request with valid params', inject(
    [MessageService, HttpTestingController],
    (service: MessageService, httpMock: HttpTestingController) => {
      service.searchMessages(query).subscribe();

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === MESSAGES_URL
      );
      expect(mockReq).toBeTruthy();
      expect(mockReq.request.params.get('query')).toEqual(query);

      httpMock.verify();
  }));
});
