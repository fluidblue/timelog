import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap, throwError } from 'rxjs';
import API from './API';
import { Time } from './Time';
import { ToastService } from './toast.service';
import { WorkingTime } from './WorkingTime';
import { TimeLogDataIn, TimeLogDataOut } from '../../../electron/src/api';
import CommonFunctions from '../../../electron/src/CommonFunctions';

@Injectable({
  providedIn: 'root'
})
export class WorkingTimesService {

  private readonly apiUri = API.apiUri + "/timelog"

  constructor(private http: HttpClient, private toastService: ToastService) { }

  private convertApiStructureToWorkingTime(workingTime: TimeLogDataOut): WorkingTime {
    return {
      from: Time.fromMinutes(workingTime.from),
      to: Time.fromMinutes(workingTime.to),
    };
  }

  getWorkingTimes(date: Date): Observable<WorkingTime[]> {
    const promise = window.timelogAPI.timeLogGet(CommonFunctions.convertDateToString(date));
    const observable = API.convertPromise2Observable(promise);

    return observable.pipe(
      map((apiWorkingTimes) => {
        if (!apiWorkingTimes) {
          throw new Error("Could not load timelog data.");
        }
        return apiWorkingTimes;
      })
    ).pipe(
      catchError(
        (error) => {
          this.toastService.showError(error);
          return EMPTY;
        }
      )
    ).pipe(
      map((apiWorkingTimes) => apiWorkingTimes.map((apiWorkingTime) => this.convertApiStructureToWorkingTime(apiWorkingTime)))
    );
  }

  addWorkingTime(addTimeData: TimeLogDataIn): Observable<boolean> {
    const promise = window.timelogAPI.timeLogAdd(addTimeData);
    const observable = API.convertPromise2Observable(promise);

    return observable.pipe(
      tap(
        (response) => {
          if (response) {
            this.toastService.showInfo("Successfully added time.");
          } else {
            this.toastService.showError("Failed to add time.");
          }
        }
      )
    );
  }

  removeWorkingTime(removeTimeData: TimeLogDataIn): Observable<boolean> {
    const promise = window.timelogAPI.timeLogRemove(removeTimeData);
    const observable = API.convertPromise2Observable(promise);

    return observable.pipe(
      tap(
        (response) => {
          if (response) {
            this.toastService.showInfo("Successfully removed time.");
          } else {
            this.toastService.showError("Failed to remove time.");
          }
        }
      )
    );
  }

}
