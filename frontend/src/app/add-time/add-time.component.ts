import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonFunctions } from '../CommonFunctions';
import { Time } from '../Time';
import { AddTimeData } from './AddTimeData';

@Component({
  selector: 'app-add-time',
  templateUrl: './add-time.component.html',
  styleUrls: ['./add-time.component.scss']
})
export class AddTimeComponent implements OnInit {

  date?: Date = new Date();
  from: Time | null = null;
  to: Time | null = null;

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

  save() {
    this.saveClicked = true;

    if (!this.date || !this.from || !this.to) {
      // Form not filled -> cancel
      return;
    }

    const addTimeData: AddTimeData = {
      date: this.date,
      from: this.from,
      to: this.to
    };
    this.activeModal.close(addTimeData);
  }

}
