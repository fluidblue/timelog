import { Injectable } from '@angular/core';
import { WorkingTime } from './WorkingTime';

@Injectable({
  providedIn: 'root'
})
export class WorkingTimesService {

  constructor() { }

  getWorkingTimes(date: Date): WorkingTime[] {
    // TODO
  }
}
