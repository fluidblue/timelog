import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Settings } from '../Settings';
import { SettingsService } from '../settings.service';
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

  constructor(private settingsService: SettingsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSettings();
  }

  setInitialDates(): void {
    const currentDate = new Date();

    this.dateFrom = this.getBeginOfWeek(currentDate);
    this.dateTo = this.getEndOfWeek(currentDate);
  }

  updateView(): void {
    this.setDaycardDates();
  }

  setDaycardDates(): void {
    this.daycardDates = [];
    const date = new Date(this.dateFrom!);
    while (date <= this.dateTo!) {
      this.daycardDates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
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

  openAddTimeDialog(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed with: ${reason}`);
    });
  }

}
