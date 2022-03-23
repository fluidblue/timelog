import { Component, Input, OnInit } from '@angular/core';
import { TimeLogDataIn } from '../../../../electron/src/api';
import API from '../API';
import { Settings, StandardWorkingTimes } from '../Settings';
import { SettingsService } from '../settings.service';
import { Time } from '../Time';
import { ToastService } from '../toast.service';
import { WorkingTimesService } from '../working-times.service';
import { WorkingTime } from '../WorkingTime';

@Component({
  selector: 'app-daycard',
  templateUrl: './daycard.component.html',
  styleUrls: ['./daycard.component.scss']
})
export class DaycardComponent implements OnInit {

  @Input() date?: Date;

  settings?: Settings;
  workingTimes?: WorkingTime[];

  totalTime?: Time;
  underOverTime?: Time;

  constructor(
    private settingsService: SettingsService,
    private workingTimesService: WorkingTimesService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getSettings();
    this.getWorkingTimes();
  }

  updateView(): void {
    this.totalTime = this.getTotalTime();

    if (this.date && this.settings && this.settings.standardWorkingTimes) {
      this.underOverTime = this.getUnderOverTime(this.date, this.settings.standardWorkingTimes);
    }
  }

  getSettings(): void {
    this.settingsService.getSettings().subscribe(settings => {
      this.settings = settings;
      this.updateView();
    });
  }

  getWorkingTimes(): void {
    if (!this.date) {
      throw new Error("Date is undefined");
    }

    this.workingTimesService.getWorkingTimes(this.date).subscribe(workingTimes => {
      this.workingTimes = workingTimes;
      this.updateView();
    });
  }

  getTimeDifference(from: Time, to: Time): Time {
    return to.substract(from);
  }

  getTotalTime(): Time {
    if (!this.workingTimes || this.workingTimes.length === 0) {
      return new Time(0, 0);
    }

    const durations = this.workingTimes.map((workingTime) => this.getTimeDifference(workingTime.from, workingTime.to));
    const totalTime = durations.reduce((previousValue, currentValue) => previousValue.add(currentValue))
    return totalTime;
  }

  getUnderOverTime(date: Date, standardWorkingTimes: StandardWorkingTimes): Time {
    return this.getTimeDifference(standardWorkingTimes[date.getDay()], this.getTotalTime());
  }

  onRemove(date: Date, from: Time, to: Time) {
    const removeTimeDataJson: TimeLogDataIn = {
      date: API.convertDateToString(date),
      from: from.getTotalMinutes(),
      to: to.getTotalMinutes(),
    };

    const observable = this.workingTimesService.removeWorkingTime(removeTimeDataJson);
    observable.subscribe(
      (response: boolean) => {
        this.ngOnInit();
      }
    );
  }

}
