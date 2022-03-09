import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Settings, SettingsJson, WeekDay } from './Settings';
import API from './API';
import { Time } from './Time';
import { ResponseJson } from './ResponseJson';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUri = API.apiUri + "/settings"

  constructor(
    private http: HttpClient
  ) { }

  private convertJsonToSettings(settingsJson: SettingsJson): Settings {
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

  private convertSettingsToJson(settings: Settings): SettingsJson {
    return {
      weekStartsOn: settings.startOfWeek,
      workingTimes: {
        monday: settings.standardWorkingTimes[WeekDay.Monday].getTotalMinutes(),
        tuesday: settings.standardWorkingTimes[WeekDay.Tuesday].getTotalMinutes(),
        wednesday: settings.standardWorkingTimes[WeekDay.Wednesday].getTotalMinutes(),
        thursday: settings.standardWorkingTimes[WeekDay.Thursday].getTotalMinutes(),
        friday: settings.standardWorkingTimes[WeekDay.Friday].getTotalMinutes(),
        saturday: settings.standardWorkingTimes[WeekDay.Saturday].getTotalMinutes(),
        sunday: settings.standardWorkingTimes[WeekDay.Sunday].getTotalMinutes()
      }
    };
  }

  getSettings(): Observable<Settings> {
    const observable = this.http.get<SettingsJson>(this.apiUri);
    return observable.pipe(map((settingsJson) => this.convertJsonToSettings(settingsJson)));
  }

  setSettings(settings: Settings): Observable<ResponseJson> {
    const settingsJson = this.convertSettingsToJson(settings);
    return this.http.put<ResponseJson>(this.apiUri, settingsJson);
  }
}
