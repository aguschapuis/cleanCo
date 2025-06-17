import { TestBed } from '@angular/core/testing';

import { Arrivals } from './arrivals';

describe('Arrivals', () => {
  let service: Arrivals;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arrivals);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
