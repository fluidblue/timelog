import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WorkingTime } from './WorkingTime';
import { WORKING_TIMES } from './mock-working-times';

@Injectable({
  providedIn: 'root'
})
export class WorkingTimesService {

  constructor() { }

  getWorkingTimes(date: Date): Observable<WorkingTime[]> {
    const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const workingTimes = of(WORKING_TIMES[dateDay.valueOf()]);
    return workingTimes;
  }
}
