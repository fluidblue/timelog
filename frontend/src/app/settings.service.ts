import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Settings, SettingsJson, WeekDay } from './Settings';
import API from './API';
import { Time } from './Time';
import { ResponseJson } from './ResponseJson';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly apiUri = API.apiUri + "/settings"

  private settings?: Settings;

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
    if (this.settings) {
      return of(this.settings);
    }

    const observable = this.http.get<SettingsJson>(this.apiUri);
    return observable.pipe(
      map((settingsJson) => this.convertJsonToSettings(settingsJson))
    ).pipe(
      tap((settings) => this.settings = settings)
    );
  }

  setSettings(settings: Settings): Observable<ResponseJson> {
    this.settings = settings;

    const settingsJson = this.convertSettingsToJson(settings);
    return this.http.put<ResponseJson>(this.apiUri, settingsJson);
  }
}
