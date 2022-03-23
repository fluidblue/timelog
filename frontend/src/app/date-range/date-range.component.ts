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

  @Output() dateFromChanged = new EventEmitter<Date>();
  @Output() dateToChanged = new EventEmitter<Date>();

  parseDateEvent = CommonFunctions.parseDateEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
