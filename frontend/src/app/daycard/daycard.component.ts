import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeLogDataIn } from '../../../../electron/src/api';
import CommonFunctions from '../../../../electron/src/CommonFunctions';
import { RemoveTimeComponent } from '../remove-time/remove-time.component';
import { Settings, StandardWorkingTimes } from '../Settings';
import { SettingsService } from '../settings.service';
import { Time } from '../Time';
import TimeFunctions from '../TimeFunctions';
import { WorkingTimesService } from '../working-times.service';
import { WorkingTime } from '../WorkingTime';

@Component({
  selector: 'app-daycard',
  templateUrl: './daycard.component.html',
  styleUrls: ['./daycard.component.scss']
})
export class DaycardComponent implements OnInit {

  @Input() date?: Date;

  settings?: Settings;
  workingTimes?: WorkingTime[];

  totalTime?: Time;
  underOverTime?: Time;

  getTimeDifference = TimeFunctions.getTimeDifference;

  constructor(
    private settingsService: SettingsService,
    private workingTimesService: WorkingTimesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getSettings();
    this.getWorkingTimes();
  }

  updateView(): void {
    this.totalTime = TimeFunctions.getTotalTime(this.workingTimes);

    if (this.date && this.settings && this.settings.standardWorkingTimes) {
      this.underOverTime = TimeFunctions.getUnderOverTime(this.date, this.settings.standardWorkingTimes, this.totalTime);
    }
  }

  getSettings(): void {
    this.settingsService.getSettings().subscribe(settings => {
      this.settings = settings;
      this.updateView();
    });
  }

  getWorkingTimes(): void {
    if (!this.date) {
      throw new Error("Date is undefined");
    }

    this.workingTimesService.getWorkingTimes(this.date).subscribe(workingTimes => {
      this.workingTimes = workingTimes;
      this.updateView();
    });
  }

  async onRemove(date: Date, from: Time, to: Time) {
    // Show user confirmation dialog
    const modalRef = this.modalService.open(RemoveTimeComponent, { ariaLabelledBy: 'modal-basic-title' });
    try {
      const userConfirmation = await modalRef.result;
      if (!userConfirmation) {
        return;
      }
    } catch (err) {
      // Dialog cancelled
      return;
    }

    const removeTimeDataJson: TimeLogDataIn = {
      date: CommonFunctions.convertDateToString(date),
      from: from.getTotalMinutes(),
      to: to.getTotalMinutes(),
    };

    const observable = this.workingTimesService.removeWorkingTime(removeTimeDataJson);
    observable.subscribe(
      (response: boolean) => {
        this.ngOnInit();
      }
    );
  }

}
