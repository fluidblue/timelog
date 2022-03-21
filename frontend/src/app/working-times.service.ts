import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { TimeDataJson } from './TimeData';
import API from './API';
import { ResponseJson } from './ResponseJson';
import { Time } from './Time';
import { ToastService } from './toast.service';
import { WorkingTime } from './WorkingTime';
import { TimeLogDataOut } from '../../../electron/src/api';

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

  addWorkingTime(addTimeDataJson: TimeDataJson): Observable<ResponseJson> {
    const observable = this.http.post<ResponseJson>(this.apiUri, addTimeDataJson);
    observable.pipe(
      catchError(
        (error) => {
          return of({
            result: false
          });
        }
      )
    );
    return observable;
  }

  removeWorkingTime(removeTimeDataJson: TimeDataJson): Observable<ResponseJson> {
    const observable = this.http.post<ResponseJson>(this.apiUri + "/delete", removeTimeDataJson);
    observable.pipe(
      catchError(
        (error) => {
          return of({
            result: false
          });
        }
      )
    );
    return observable;
  }

}
