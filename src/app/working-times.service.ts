import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WORKING_TIMES } from 'src/mock-working-times';
import { WorkingTimes } from 'src/WorkingTimes';

@Injectable({
  providedIn: 'root'
})
export class WorkingTimesService {

  constructor() { }

  getWorkingTimes(): Observable<WorkingTimes> {
    const workingTimes = of(WORKING_TIMES);
    return workingTimes;
  }
}
