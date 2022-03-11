import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ResponseJson } from '../ResponseJson';
import { WeekDayJson, WeekDay } from '../Settings';
import { SettingsService } from '../settings.service';
import { Time } from '../Time';
import { ToastService } from '../toast.service';
import { WorkingTimes } from './WorkingTimes';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  readonly workingTimesStrings = {
    "monday": "",
    "tuesday": "",
    "wednesday": "",
    "thursday": "",
    "friday": "",
    "saturday": "",
    "sunday": ""
  };

  readonly workingTimes: WorkingTimes = {
    "monday": null,
    "tuesday": null,
    "wednesday": null,
    "thursday": null,
    "friday": null,
    "saturday": null,
    "sunday": null
  };

  startOfWeek: WeekDayJson = "monday";
  settingsLoaded: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getSettings();
  }

  parseTime(event: Event): Time | null {
    const value = (event.target as HTMLInputElement).value;
    return Time.fromString(value, true);
  }

  getSettings(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.startOfWeek = settings.startOfWeek;

      this.workingTimesStrings.monday = settings.standardWorkingTimes[WeekDay.Monday].toString(true);
      this.workingTimes["monday"] = settings.standardWorkingTimes[WeekDay.Monday];

      this.workingTimesStrings.tuesday = settings.standardWorkingTimes[WeekDay.Tuesday].toString(true);
      this.workingTimes["tuesday"] = settings.standardWorkingTimes[WeekDay.Tuesday];

      this.workingTimesStrings.wednesday = settings.standardWorkingTimes[WeekDay.Wednesday].toString(true);
      this.workingTimes["wednesday"] = settings.standardWorkingTimes[WeekDay.Wednesday];

      this.workingTimesStrings.thursday = settings.standardWorkingTimes[WeekDay.Thursday].toString(true);
      this.workingTimes["thursday"] = settings.standardWorkingTimes[WeekDay.Thursday];

      this.workingTimesStrings.friday = settings.standardWorkingTimes[WeekDay.Friday].toString(true);
      this.workingTimes["friday"] = settings.standardWorkingTimes[WeekDay.Friday];

      this.workingTimesStrings.saturday = settings.standardWorkingTimes[WeekDay.Saturday].toString(true);
      this.workingTimes["saturday"] = settings.standardWorkingTimes[WeekDay.Saturday];

      this.workingTimesStrings.sunday = settings.standardWorkingTimes[WeekDay.Sunday].toString(true);
      this.workingTimes["sunday"] = settings.standardWorkingTimes[WeekDay.Sunday];

      this.settingsLoaded = true;
    });
  }

  save(): void {
    for (const key in this.workingTimes) {
      if (!this.workingTimes[key]) {
        // One of the values has not been entered correctly. Therefore cancel.
        return;
      }
    }

    const settings = {
      startOfWeek: this.startOfWeek,
      standardWorkingTimes: {
        [WeekDay.Monday]: this.workingTimes["monday"]!,
        [WeekDay.Tuesday]: this.workingTimes["tuesday"]!,
        [WeekDay.Wednesday]: this.workingTimes["wednesday"]!,
        [WeekDay.Thursday]: this.workingTimes["thursday"]!,
        [WeekDay.Friday]: this.workingTimes["friday"]!,
        [WeekDay.Saturday]: this.workingTimes["saturday"]!,
        [WeekDay.Sunday]: this.workingTimes["sunday"]!,
      }
    };
    const observable = this.settingsService.setSettings(settings);
    observable.pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return of({
            result: false
          });
        }
      )
    ).subscribe(
      (response: ResponseJson) => {
        if (response.result) {
          this.toastService.showInfo("The settings have been saved.");
        } else {
          this.toastService.showError("The settings could not be saved.");
        }
      }
    );
  }
}
