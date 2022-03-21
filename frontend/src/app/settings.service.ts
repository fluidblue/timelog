import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { Settings, WeekDay } from './Settings';
import { Settings as ApiSettings } from '../../../electron/src/api'; 
import API from './API';
import { Time } from './Time';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings?: Settings;

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  private convertApiStructureToSettings(apiSettings: ApiSettings): Settings {
    return {
      startOfWeek: apiSettings.weekStartsOn,
      standardWorkingTimes: {
        [WeekDay.Monday]: Time.fromMinutes(apiSettings.workingTimes.monday),
        [WeekDay.Tuesday]: Time.fromMinutes(apiSettings.workingTimes.tuesday),
        [WeekDay.Wednesday]: Time.fromMinutes(apiSettings.workingTimes.wednesday),
        [WeekDay.Thursday]: Time.fromMinutes(apiSettings.workingTimes.thursday),
        [WeekDay.Friday]: Time.fromMinutes(apiSettings.workingTimes.friday),
        [WeekDay.Saturday]: Time.fromMinutes(apiSettings.workingTimes.saturday),
        [WeekDay.Sunday]: Time.fromMinutes(apiSettings.workingTimes.sunday)
      }
    };
  }

  private convertSettingsToApiStructure(settings: Settings): ApiSettings {
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

    const promise: Promise<ApiSettings> = window.timelogAPI.settingsGet();
    const observable = API.convertPromise2Observable(promise);
    return observable.pipe(
      catchError(
        (error) => {
          this.toastService.showError("Could not load settings.");
          return EMPTY;
        }
      )
    ).pipe(
      map((apiSettings) => this.convertApiStructureToSettings(apiSettings))
    ).pipe(
      tap((settings) => this.settings = settings)
    );
  }

  setSettings(settings: Settings): Observable<boolean> {
    this.settings = settings;

    const apiSettings = this.convertSettingsToApiStructure(settings);
    const promise = window.timelogAPI.settingsSet(apiSettings);
    const observable = API.convertPromise2Observable(promise);
    observable.pipe(
      catchError(
        (error) => {
          return of(false);
        }
      )
    ).subscribe(
      (response: boolean) => {
        if (response) {
          this.toastService.showInfo("The settings have been saved.");
        } else {
          this.toastService.showError("The settings could not be saved.");
        }
      }
    );
    return observable;
  }
}
