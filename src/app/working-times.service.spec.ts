import { TestBed } from '@angular/core/testing';

import { WorkingTimesService } from './working-times.service';

describe('WorkingTimesService', () => {
  let service: WorkingTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
