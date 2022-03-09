import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import API from './API';
import { Time } from './Time';
import { WorkingTime, WorkingTimeJson } from './WorkingTime';

@Injectable({
  providedIn: 'root'
})
export class WorkingTimesService {

  private apiUri = API.apiUri + "/timelog"

  constructor(private http: HttpClient) { }

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
    return observable.pipe(map((workingTimesJson) => workingTimesJson.map((workingTimeJson) => this.convertJsonToWorkingTime(workingTimeJson))));
  }
}
