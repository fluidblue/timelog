import { Component, Input, OnInit } from '@angular/core';
import { StandardWorkingTimesService } from '../standard-working-times.service';
import { StandardWorkingTimes } from '../StandardWorkingTimes';
import { WorkingTimesService } from '../working-times.service';
import { WorkingTime } from '../WorkingTime';
import { WEEK_DAYS } from '../WeekDays';

@Component({
  selector: 'app-daycard',
  templateUrl: './daycard.component.html',
  styleUrls: ['./daycard.component.scss']
})
export class DaycardComponent implements OnInit {

  @Input() date?: Date;
  dateString?: string;

  private standardWorkingTimes?: StandardWorkingTimes;
  workingTimes?: WorkingTime[];

  constructor(private standardWorkingTimesService: StandardWorkingTimesService,
    private workingTimesService: WorkingTimesService) { }

  ngOnInit(): void {
    this.getStandardWorkingTimes();
    this.getWorkingTimes();
    this.setDateString();

    // TODO: Check if values from above calls are updated when `date` is changed.
  }

  getStandardWorkingTimes(): void {
    this.standardWorkingTimesService.getStandardWorkingTimes().subscribe(standardWorkingTimes => {
      this.standardWorkingTimes = standardWorkingTimes;
    });
  }

  getWorkingTimes(): void {
    if (!this.date) {
      this.workingTimes = undefined;
      return;
    }

    this.workingTimesService.getWorkingTimes(this.date).subscribe(workingTimes => {
      this.workingTimes = workingTimes;
    });
  }

  setDateString(): void {
    if (!this.date) {
      this.dateString = undefined;
      return;
    }

    const weekDay = WEEK_DAYS[this.date.getDay()];
    const year = this.date.getFullYear().toString();
    let month = (this.date.getMonth() + 1).toString();
    if (month.length <= 1) {
      month = "0" + month;
    }
    let day = this.date.getDate().toString();
    if (day.length <= 1) {
      day = "0" + day;
    }

    this.dateString = weekDay + ", " +
      year + "-" +
      month + "-" +
      day;
  }

}
