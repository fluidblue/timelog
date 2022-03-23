import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AddTimeService } from '../add-time.service';
import { DateRangeComponent } from '../date-range/date-range.component';
import { Settings } from '../Settings';
import { SettingsService } from '../settings.service';
import TimeFunctions from '../TimeFunctions';
import { WEEK_DAYS } from '../WeekDays';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  settings?: Settings;

  dateFrom?: Date;
  dateTo?: Date;

  daycardDates: Date[] = [];

  constructor(private settingsService: SettingsService, public addTimeService: AddTimeService) { }

  ngOnInit(): void {
    this.getSettings();
  }

  setInitialDates(): void {
    const currentDate = new Date();

    this.dateFrom = this.getBeginOfWeek(currentDate);
    this.dateTo = this.getEndOfWeek(currentDate);
  }

  updateView(): void {
    this.daycardDates = TimeFunctions.getListOfDays(this.dateFrom!, this.dateTo!);
  }

  getSettings(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
      this.setInitialDates();
      this.updateView();
    });
  }

  /**
   * Returns a number (0 to 6) corresponding to the day (Sun, Mon, Tue, ..., Sat)
   * at which the week starts.
   */
  getStartDayOfWeek(): number {
    if (!this.settings) {
      throw new Error("Settings have not yet been loaded.");
    }
    return WEEK_DAYS.indexOf(this.settings.startOfWeek);
  }

  /**
   * Returns a number (0 to 6) corresponding to the day (Sun, Mon, Tue, ..., Sat)
   * at which the week ends.
   */
  getEndDayOfWeek(): number {
    return (this.getStartDayOfWeek() + 6) % 7;
  }

  /**
   * Returns a `Date` corresponding to the first day of a week.
   * 
   * Posted to https://stackoverflow.com/a/70957586/2013757
   * 
   * @param startOfWeek Sets an arbitrary start of week (e.g. Sunday = 0, Monday = 1, Tuesday = 2, etc.)
   */
  getBeginOfWeek(date = new Date(), startOfWeek = this.getStartDayOfWeek()): Date {
    const result = new Date(date);
    while (result.getDay() !== startOfWeek) {
      result.setDate(result.getDate() - 1);
    }
    return result;
  }

  /**
   * Similar to `getStartOfWeek()`, but returns the end of the week.
   */
  getEndOfWeek(date = new Date(), endOfWeek = this.getEndDayOfWeek()): Date {
    const result = new Date(date);
    while (result.getDay() !== endOfWeek) {
      result.setDate(result.getDate() + 1);
    }
    return result;
  }

  openAddTimeDialog() {
    this.addTimeService.openAddTimeDialog().then(
      (result) => {
        // Refresh component
        this.ngOnInit();
      }
    );
  }

}
