import { TestBed } from '@angular/core/testing';

import { Crews } from './crews';

describe('Crews', () => {
  let service: Crews;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Crews);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
