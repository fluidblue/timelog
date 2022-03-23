import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import CommonFunctions from '../../../../electron/src/CommonFunctions';
import { SettingsService } from '../settings.service';
import { Time } from '../Time';
import TimeFunctions from '../TimeFunctions';
import { WorkingTimesService } from '../working-times.service';

@Component({
  selector: 'app-under-over-time',
  templateUrl: './under-over-time.component.html',
  styleUrls: ['./under-over-time.component.scss']
})
export class UnderOverTimeComponent implements OnInit {

  dateFrom?: Date;
  dateTo?: Date;

  underOverTime?: Time;

  constructor(
    private settingsService: SettingsService,
    private workingTimesService: WorkingTimesService
  ) { }

  async ngOnInit() {
    await this.setDateTo();
    await this.setDateFrom();

    if (this.dateFrom && this.dateTo && this.dateFrom > this.dateTo) {
      this.dateFrom = this.dateTo;
    }

    this.updateView();
  }

  async setDateTo() {
    this.dateTo = this.getDateYesterday();
  }

  async setDateFrom() {
    const firstRecordDate = await window.timelogAPI.timeLogGetFirstRecordDate();
    if (!firstRecordDate) {
      this.dateFrom = this.getDateYesterday();
      return;
    }
    const dateFrom = CommonFunctions.convertStringToDate(firstRecordDate);
    this.dateFrom = dateFrom ? dateFrom : undefined;
  }

  getDateYesterday(): Date {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  }

  async calculateUnderOverTime() {
    const settings = await firstValueFrom(this.settingsService.getSettings());

    let days = TimeFunctions.getListOfDays(this.dateFrom!, this.dateTo!);
    let underOverTimeTotal: Time = new Time(0, 0);
    for (const day of days) {
      const workingTimes = await firstValueFrom(this.workingTimesService.getWorkingTimes(day));
      const workingTimeTotal = TimeFunctions.getTotalTime(workingTimes);
      const underOverTime = TimeFunctions.getUnderOverTime(day, settings.standardWorkingTimes, workingTimeTotal);
      underOverTimeTotal = underOverTimeTotal.add(underOverTime);
    }

    return underOverTimeTotal;
  }

  async updateView() {
    this.underOverTime = await this.calculateUnderOverTime();
  }

}
