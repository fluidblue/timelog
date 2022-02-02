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

  constructor(private standardWorkingTimesService: StandardWorkingTimesService,
    private workingTimesService: WorkingTimesService) { }

  ngOnInit(): void {
    this.getStandardWorkingTimes();
    this.getWorkingTimes();

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
