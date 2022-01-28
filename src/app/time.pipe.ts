import { Pipe, PipeTransform } from '@angular/core';
import { Time } from './Time';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Time, fullHours: boolean = false): string {
    let hours = value.hours.toString();
    if (fullHours && hours.length <= 1) {
      hours = "0" + hours
    }

    let minutes = value.minutes.toString();
    if (minutes.length <= 1) {
      minutes = "0" + minutes
    }

    return hours + ":" + minutes;
  }

}
