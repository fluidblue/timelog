import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonFunctions } from '../CommonFunctions';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  @Input() dateFrom?: Date;
  @Input() dateTo?: Date;

  @Output() dateFromChange = new EventEmitter<Date>();
  @Output() dateToChange = new EventEmitter<Date>();

  parseDateEvent = CommonFunctions.parseDateEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
