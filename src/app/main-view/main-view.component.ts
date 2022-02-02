import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  dateFrom?: Date = this.getBeginOfWeek()
  dateTo?: Date = new Date()

  daycardDate = new Date(2022, 0, 27); // TODO: Remove

  constructor() { }

  ngOnInit(): void {
  }

  getBeginOfWeek(): Date {
    // TODO: Implement
    return new Date(2022, 0, 27);
  }

  parseDateEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    return this.parseDate(value);
  }

  parseDate(dateString?: string): Date | undefined {
    if (!dateString) {
      return undefined;
    }
    return new Date(dateString);
  }

}
