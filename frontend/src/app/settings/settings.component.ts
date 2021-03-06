import { Component, OnInit } from '@angular/core';
import { CommonFunctions } from '../CommonFunctions';
import { WeekDay } from '../Settings';
import { WeekDay as ApiWeekDay } from '../../../../electron/src/api'; 
import { SettingsService } from '../settings.service';
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

  startOfWeek: ApiWeekDay = "monday";
  settingsLoaded: boolean = false;

  parseTimeEvent = CommonFunctions.parseTimeEvent;

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings(): void {
    const observable = this.settingsService.getSettings();
    observable.subscribe(
      (settings) => {
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
      }
    );
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
    this.settingsService.setSettings(settings);
  }
}
