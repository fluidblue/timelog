import { TestBed } from '@angular/core/testing';

import { AddTimeService } from './add-time.service';

describe('AddTimeService', () => {
  let service: AddTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
