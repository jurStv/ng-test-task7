import { TestBed, inject } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { isNumber } from 'util';

import { NumbersService } from './numbers.service';

describe('NumbersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumbersService],
    });
  });

  it('should be created', inject(
    [NumbersService],
    (service: NumbersService) => {
      expect(service).toBeTruthy();
  }));

  it('should provide list of numbers each 2s', inject(
    [NumbersService],
    async (service: NumbersService) => {
      const t1 = performance.now();
      const numbers = await service.getListOfNumbers().pipe(take(1)).toPromise();
      const t2 = performance.now();
      expect(t2 - t1).toBeLessThan(2010);
      expect(t2 - t1).toBeGreaterThanOrEqual(2000);
      expect(numbers).toBeInstanceOf(Array);
      expect(isNumber(numbers[0])).toBeTruthy();
  }));
});
