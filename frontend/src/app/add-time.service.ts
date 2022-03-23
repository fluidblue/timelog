import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeLogDataIn } from '../../../electron/src/api';
import CommonFunctions from '../../../electron/src/CommonFunctions';
import { AddTimeComponent } from './add-time/add-time.component';
import { AddTimeDataResult } from './add-time/AddTimeDataResult';
import { WorkingTimesService } from './working-times.service';

@Injectable({
  providedIn: 'root'
})
export class AddTimeService {

  constructor(
    private modalService: NgbModal,
    private workingTimesService: WorkingTimesService
  ) { }

  openAddTimeDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const modalRef = this.modalService.open(AddTimeComponent, { ariaLabelledBy: 'modal-basic-title' });

      modalRef.result.then(
        (result: AddTimeDataResult) => {
          const addTimeData: TimeLogDataIn = {
            date: CommonFunctions.convertDateToString(result.date),
            from: result.from.getTotalMinutes(),
            to: result.to.getTotalMinutes(),
          };

          const observable = this.workingTimesService.addWorkingTime(addTimeData);
          observable.subscribe(
            (response: boolean) => {
              if (response) {
                if (result.addAnotherEntry) {
                  resolve(this.openAddTimeDialog());
                } else {
                  resolve(true);
                }
              } else {
                resolve(false);
              }
            }
          );
        },
        (reason) => {
          // Silently ignore closing of dialog (e.g. by clicking x or clicking on backdrop shadow)
          resolve(false);
        }
      );
    });
  }
}
