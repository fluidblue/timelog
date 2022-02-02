import { Component, Input, OnInit } from '@angular/core';
import { StandardWorkingTimesService } from '../standard-working-times.service';
import { StandardWorkingTimes } from '../StandardWorkingTimes';
import { Time } from '../Time';
import { WorkingTimesService } from '../working-times.service';
import { WorkingTime } from '../WorkingTime';

@Component({
  selector: 'app-daycard',
  templateUrl: './daycard.component.html',
  styleUrls: ['./daycard.component.scss']
})
export class DaycardComponent implements OnInit {

  @Input() date?: Date;

  standardWorkingTimes?: StandardWorkingTimes;
  workingTimes?: WorkingTime[];

  totalTime?: Time;
  underOverTime?: Time;

  constructor(private standardWorkingTimesService: StandardWorkingTimesService,
    private workingTimesService: WorkingTimesService) { }

  ngOnInit(): void {
    this.getStandardWorkingTimes();
    this.getWorkingTimes();
  }

  updateView(): void {
    this.totalTime = this.getTotalTime();

    if (this.date && this.standardWorkingTimes) {
      this.underOverTime = this.getUnderOverTime(this.date, this.standardWorkingTimes);
    }
  }

  getStandardWorkingTimes(): void {
    this.standardWorkingTimesService.getStandardWorkingTimes().subscribe(standardWorkingTimes => {
      this.standardWorkingTimes = standardWorkingTimes;
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
    if (!this.workingTimes) {
      return new Time(0, 0);
    }

    const durations = this.workingTimes.map((workingTime) => this.getTimeDifference(workingTime.from, workingTime.to));
    const totalTime = durations.reduce((previousValue, currentValue) => previousValue.add(currentValue))
    return totalTime;
  }

  getUnderOverTime(date: Date, standardWorkingTimes: StandardWorkingTimes): Time {
    return this.getTimeDifference(standardWorkingTimes[date.getDay()], this.getTotalTime());
  }

}
