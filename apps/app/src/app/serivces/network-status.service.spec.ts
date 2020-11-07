import { TestBed, inject } from '@angular/core/testing';
import { NAVIGATOR } from '@ng-web-apis/common';
import { take } from 'rxjs/operators';

import { NetworkStatusService } from './network-status.service';

describe('NetworkStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkStatusService],
    });
  });

  it('should be created', inject(
    [NetworkStatusService, NAVIGATOR],
    (service: NetworkStatusService, navigator: Navigator) => {
      expect(service).toBeTruthy();
  }));

  it('should have valid initial network status value', inject(
    [NetworkStatusService, NAVIGATOR],
    async (service: NetworkStatusService, navigator: Navigator) => {
      const currentStatus = navigator.onLine;
      const initialStatus = await service.getOnlineStatus().pipe(take(1)).toPromise();
      expect(initialStatus).toEqual(currentStatus);
  }));

  it('should change from initial network status to offline', inject(
    [NetworkStatusService, NAVIGATOR],
    async (service: NetworkStatusService, navigator: Navigator) => {
      window.dispatchEvent(new Event('offline'));
      const currentStatus = await service.getOnlineStatus().pipe(take(1)).toPromise();
      expect(currentStatus).toBeFalsy();
  }));

  it('should change from offline network status to online', inject(
    [NetworkStatusService, NAVIGATOR],
    async (service: NetworkStatusService, navigator: Navigator) => {
      window.dispatchEvent(new Event('offline'));
      window.dispatchEvent(new Event('online'));
      const currentStatus = await service.getOnlineStatus().pipe(take(1)).toPromise();
      expect(currentStatus).toBeTruthy();
  }));
});
