import { Pipe, PipeTransform } from '@angular/core';
import { Time } from './Time';
import { WorkingTime } from './WorkingTime';

@Pipe({
  name: 'totalTime'
})
export class TotalTimePipe implements PipeTransform {

  transform(workingTimes?: WorkingTime[]): Time {
    if (!workingTimes) {
      return new Time(0, 0);
    }

    const durations = workingTimes.map((workingTime) => workingTime.to.substract(workingTime.from));
    const totalTime = durations.reduce((previousValue, currentValue) => previousValue.add(currentValue))
    return totalTime;
  }
}
