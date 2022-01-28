import { Pipe, PipeTransform } from '@angular/core';
import { Time } from './Time';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Time, fullHours: boolean = false): string {
    let result = ""
    if (value.isNegativeTime()) {
      result = "-"
      value.multiply(-1);
    }

    let hours = value.getHours().toString();
    if (fullHours && hours.length <= 1) {
      hours = "0" + hours
    }

    let minutes = value.getMinutes().toString();
    if (minutes.length <= 1) {
      minutes = "0" + minutes
    }

    result += hours + ":" + minutes;
    return result;
  }

}
