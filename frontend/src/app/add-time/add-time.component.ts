import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonFunctions } from '../CommonFunctions';
import { Time } from '../Time';
import { ToastService } from '../toast.service';
import { AddTimeDataResult } from './AddTimeData';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.scss']
})
export class AddTimeComponent implements OnInit {

  date?: Date = new Date();
  from: Time | null = null;
  to: Time | null = null;
  addAnotherEntry: number = 0;

  saveClicked: boolean = false;

  @ViewChild('focusElement') focusElement?: ElementRef<HTMLInputElement>; 

  parseDateEvent = CommonFunctions.parseDateEvent;
  parseTimeEvent = CommonFunctions.parseTimeEvent;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.focusElement?.nativeElement.focus();
  }

  isValidTimeRange(): boolean {
    if (!this.from || !this.to) {
      return true;
    }
    return this.from.substract(this.to).isNegativeTime();
  }

  save() {
    this.saveClicked = true;

    if (!this.date || !this.from || !this.to) {
      // Form not filled -> cancel
      return;
    }

    // Assure that from > to
    if (!this.isValidTimeRange()) {
      return;
    }

    const addTimeData: AddTimeDataResult = {
      date: this.date,
      from: this.from,
      to: this.to,
      addAnotherEntry: this.addAnotherEntry ? true : false
    };
    this.activeModal.close(addTimeData);
  }

}
