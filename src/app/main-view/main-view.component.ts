import { Component, OnInit } from '@angular/core';
import { DEFAULT_SETTINGS, Settings } from '../Settings';
import { SettingsService } from '../settings.service';
import { WEEK_DAYS } from '../WeekDays';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  settings: Settings = DEFAULT_SETTINGS;

  dateFrom?: Date;
  dateTo?: Date;

  daycardDate = new Date(2022, 0, 27); // TODO: Remove

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.getSettings();
  }

  updateView(): void {
    this.dateFrom = this.getBeginOfWeek();
    this.dateTo = new Date();
  }

  getSettings(): void {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
      this.updateView();
    });
  }

  /**
   * Returns a number (0 to 6) corresponding to the day (Sun, Mon, Tue, ..., Sat)
   * at which the week starts.
   */
  getStartOfWeek(): number {
    return WEEK_DAYS.indexOf(this.settings.startOfWeek);
  }

  /**
   * Returns a `Date` corresponding to the first day of a week.
   * 
   * Posted to https://stackoverflow.com/a/70957586/2013757
   * 
   * @param startOfWeek Sets an arbitrary start of week (e.g. Sunday = 0, Monday = 1, Tuesday = 2, etc.)
   */
  getBeginOfWeek(date = new Date(), startOfWeek = this.getStartOfWeek()): Date {
    const result = new Date(date);
    while (result.getDay() !== startOfWeek) {
      result.setDate(result.getDate() - 1);
    }
    return result;
  }

  parseDateEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    return this.parseDate(value);
  }

  parseDate(dateString?: string): Date | undefined {
    if (!dateString) {
      return undefined;
    }
    return new Date(dateString);
  }

}
