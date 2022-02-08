import { TestBed } from '@angular/core/testing';

import { StandardWorkingTimesService } from './standard-working-times.service';

describe('StandardWorkingTimesService', () => {
  let service: StandardWorkingTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardWorkingTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
