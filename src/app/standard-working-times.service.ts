import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { STANDARD_WORKING_TIMES } from 'src/app/mock-working-times';
import { StandardWorkingTimes } from 'src/app/StandardWorkingTimes';

@Injectable({
  providedIn: 'root'
})
export class StandardWorkingTimesService {

  constructor() { }

  getStandardWorkingTimes(): Observable<StandardWorkingTimes> {
    const workingTimes = of(STANDARD_WORKING_TIMES);
    return workingTimes;
  }
}
