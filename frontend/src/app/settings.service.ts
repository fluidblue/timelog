import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Settings, SettingsJson, WeekDay } from './Settings';
import API from './API';
import { Time } from './Time';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  private convertSettings(settingsJson: SettingsJson): Settings {
    return {
      startOfWeek: settingsJson.weekStartsOn,
      standardWorkingTimes: {
        [WeekDay.Monday]: Time.fromMinutes(settingsJson.workingTimes.monday),
        [WeekDay.Tuesday]: Time.fromMinutes(settingsJson.workingTimes.tuesday),
        [WeekDay.Wednesday]: Time.fromMinutes(settingsJson.workingTimes.wednesday),
        [WeekDay.Thursday]: Time.fromMinutes(settingsJson.workingTimes.thursday),
        [WeekDay.Friday]: Time.fromMinutes(settingsJson.workingTimes.friday),
        [WeekDay.Saturday]: Time.fromMinutes(settingsJson.workingTimes.saturday),
        [WeekDay.Sunday]: Time.fromMinutes(settingsJson.workingTimes.sunday)
      }
    };
  }

  getSettings(): Observable<Settings> {
    const observable = this.http.get<SettingsJson>(API.apiUri + "/settings");
    return observable.pipe(map((settingsJson) => this.convertSettings(settingsJson)));
  }

  setSettings(settings: Settings): void {
    // TODO
    console.log("Saving settings: ", settings);
  }
}
