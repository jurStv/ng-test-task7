import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { POLLING_URL } from '../constats';
import { PollingService } from './polling.service';

describe('PollingService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PollingService],
    });
  });

  it('should be created', inject(
    [PollingService, HttpTestingController],
    (service: PollingService, httpMock: HttpTestingController) => {
      expect(service).toBeTruthy();
  }));

  it('should make first request', inject(
    [PollingService, HttpTestingController],
    (service: PollingService, httpMock: HttpTestingController) => {
      service.startPolling().subscribe();

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === POLLING_URL
      );
      expect(mockReq).toBeTruthy();

      httpMock.verify();
  }));

  it('should make second request right after first one', inject(
    [PollingService, HttpTestingController],
    (service: PollingService, httpMock: HttpTestingController) => {
      service.startPolling().subscribe();

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === POLLING_URL
      );
      mockReq.flush({ payload: 'Some useful information' });

      const mockReq2 = httpMock.expectOne(
        req => req.method === 'GET' && req.url === POLLING_URL
      );
      expect(mockReq2).toBeTruthy();

      httpMock.verify();
  }));

  it('should stop making requests after unsubscription', inject(
    [PollingService, HttpTestingController],
    (service: PollingService, httpMock: HttpTestingController) => {
      const subscription = service.startPolling().subscribe();

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === POLLING_URL
      );
      expect(mockReq).toBeTruthy();
      subscription.unsubscribe();

      const mockReqs = httpMock.match(
        req => req.method === 'GET' && req.url === POLLING_URL
      );
      expect(mockReqs.length).toEqual(0);

      httpMock.verify();
  }));
});
