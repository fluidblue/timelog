import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { TimeDataJson } from './TimeData';
import API from './API';
import { ResponseJson } from './ResponseJson';
import { Time } from './Time';
import { ToastService } from './toast.service';
import { WorkingTime, WorkingTimeJson } from './WorkingTime';

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

  private convertJsonToWorkingTime(json: WorkingTimeJson): WorkingTime {
    return {
      from: Time.fromMinutes(json.from),
      to: Time.fromMinutes(json.to),
    };
  }

  getWorkingTimes(date: Date): Observable<WorkingTime[]> {
    const observable = this.http.get<WorkingTimeJson[]>(this.apiUri + "/" + this.convertDateToString(date));
    return observable.pipe(
      catchError(
        (error: HttpErrorResponse) => {
          this.toastService.showError("Could not load timelog data.");
          return EMPTY;
        }
      )
    ).pipe(
      map((workingTimesJson) => workingTimesJson.map((workingTimeJson) => this.convertJsonToWorkingTime(workingTimeJson)))
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
