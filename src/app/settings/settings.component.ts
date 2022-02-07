import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { StandardWorkingTimesService } from '../standard-working-times.service';
import { WeekDay } from '../StandardWorkingTimes';
import { Time } from '../Time';
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

  startOfWeek: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday" = "Monday";

  constructor(private settingsService: SettingsService, private standardWorkingTimes: StandardWorkingTimesService) { }

  ngOnInit(): void {
    this.getStandardWorkingTimes();
    this.getSettings();
  }

  getStandardWorkingTimes() {
    this.standardWorkingTimes.getStandardWorkingTimes().subscribe((standardWorkingTimes) => {
      this.workingTimesStrings.monday = standardWorkingTimes[WeekDay.Monday].toString(true);
      this.workingTimes["monday"] = standardWorkingTimes[WeekDay.Monday];

      this.workingTimesStrings.tuesday = standardWorkingTimes[WeekDay.Tuesday].toString(true);
      this.workingTimes["tuesday"] = standardWorkingTimes[WeekDay.Tuesday];

      this.workingTimesStrings.wednesday = standardWorkingTimes[WeekDay.Wednesday].toString(true);
      this.workingTimes["wednesday"] = standardWorkingTimes[WeekDay.Wednesday];

      this.workingTimesStrings.thursday = standardWorkingTimes[WeekDay.Thursday].toString(true);
      this.workingTimes["thursday"] = standardWorkingTimes[WeekDay.Thursday];

      this.workingTimesStrings.friday = standardWorkingTimes[WeekDay.Friday].toString(true);
      this.workingTimes["friday"] = standardWorkingTimes[WeekDay.Friday];

      this.workingTimesStrings.saturday = standardWorkingTimes[WeekDay.Saturday].toString(true);
      this.workingTimes["saturday"] = standardWorkingTimes[WeekDay.Saturday];

      this.workingTimesStrings.sunday = standardWorkingTimes[WeekDay.Sunday].toString(true);
      this.workingTimes["sunday"] = standardWorkingTimes[WeekDay.Sunday];
    });
  }

  parseTime(event: Event): Time | null {
    const value = (event.target as HTMLInputElement).value;
    return Time.fromString(value);
  }

  getSettings(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.startOfWeek = settings.startOfWeek;
    });
  }

  save(): void {
    for (const key in this.workingTimes) {
      if (!this.workingTimes[key]) {
        // One of the values has not been entered correctly. Therefore cancel.
        return;
      }
    }

    this.standardWorkingTimes.setStandardWorkingTimes({
        [WeekDay.Monday]: this.workingTimes["monday"]!,
        [WeekDay.Tuesday]: this.workingTimes["tuesday"]!,
        [WeekDay.Wednesday]: this.workingTimes["wednesday"]!,
        [WeekDay.Thursday]: this.workingTimes["thursday"]!,
        [WeekDay.Friday]: this.workingTimes["friday"]!,
        [WeekDay.Saturday]: this.workingTimes["saturday"]!,
        [WeekDay.Sunday]: this.workingTimes["sunday"]!,
    });
    this.settingsService.setSettings({
      startOfWeek: this.startOfWeek
    });
  }
}
