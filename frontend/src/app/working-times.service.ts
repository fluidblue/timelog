import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap, throwError } from 'rxjs';
import API from './API';
import { Time } from './Time';
import { ToastService } from './toast.service';
import { WorkingTime } from './WorkingTime';
import { TimeLogDataIn, TimeLogDataOut } from '../../../electron/src/api';

@Injectable({
  providedIn: 'root'
})
export class WorkingTimesService {

  private readonly apiUri = API.apiUri + "/timelog"

  constructor(private http: HttpClient, private toastService: ToastService) { }

  private convertDateToString(date: Date): string {
    const pad = (num: number) => ("00" + num).slice(-2);
    return date.getFullYear() + "-" +
      pad(date.getMonth() + 1) + "-" +
      pad(date.getDate());
  }

  private convertApiStructureToWorkingTime(workingTime: TimeLogDataOut): WorkingTime {
    return {
      from: Time.fromMinutes(workingTime.from),
      to: Time.fromMinutes(workingTime.to),
    };
  }

  getWorkingTimes(date: Date): Observable<WorkingTime[]> {
    const promise = window.timelogAPI.timeLogGet(this.convertDateToString(date));
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
        (value) => {
          // TODO: Test message
          if (!value) {
            this.toastService.showError("Could not add working time");
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
        // TODO: Test message
        (value) => {
          if (!value) {
            this.toastService.showError("Could not remove working time");
          }
        }
      )
    );
  }

}
