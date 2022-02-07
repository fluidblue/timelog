import { Pipe, PipeTransform } from '@angular/core';
import { Time } from './Time';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Time, fullHours: boolean = false, showPlus = false): string {
    return value.toString(fullHours, showPlus);
  }

}
