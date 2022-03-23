import { Component, OnInit } from '@angular/core';
import CommonFunctions from '../../../../electron/src/CommonFunctions';

@Component({
  selector: 'app-under-over-time',
  templateUrl: './under-over-time.component.html',
  styleUrls: ['./under-over-time.component.scss']
})
export class UnderOverTimeComponent implements OnInit {

  dateFrom?: Date;
  dateTo?: Date;

  constructor() { }

  async ngOnInit() {
    await this.setDateTo();
    await this.setDateFrom();

    if (this.dateFrom && this.dateTo && this.dateFrom > this.dateTo) {
      this.dateFrom = this.dateTo;
    }
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

  updateView(): void {
    console.log('Update view'); // TODO: Remove console output
  }

}
