import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTimeComponent } from './add-time/add-time.component';
import { AddTimeDataResult } from './add-time/AddTimeDataResult';
import API from './API';
import { ResponseJson } from './ResponseJson';
import { TimeDataJson } from './TimeData';
import { ToastService } from './toast.service';
import { WorkingTimesService } from './working-times.service';

@Injectable({
  providedIn: 'root'
})
export class AddTimeService {

  private readonly apiUri = API.apiUri + "/timelog"

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private toastService: ToastService,
    private workingTimesService: WorkingTimesService
  ) { }

  openAddTimeDialog(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const modalRef = this.modalService.open(AddTimeComponent, { ariaLabelledBy: 'modal-basic-title' });

      modalRef.result.then(
        (result: AddTimeDataResult) => {
          const addTimeDataJson: TimeDataJson = {
            date: result.date,
            from: result.from.getTotalMinutes(),
            to: result.to.getTotalMinutes(),
          };

          const observable = this.workingTimesService.addWorkingTime(addTimeDataJson);
          observable.subscribe(
            (reponse: ResponseJson) => {
              if (reponse.result) {
                this.toastService.showInfo("Successfully added time.");
                resolve(true);
              } else {
                this.toastService.showInfo("Failed to add time.");
                resolve(false);
              }
            }
          );

          if (result.addAnotherEntry) {
            this.openAddTimeDialog();
          }
        },
        (reason) => {
          // Silently ignore closing of dialog (e.g. by clicking x or clicking on backdrop shadow)
          resolve(false);
        }
      );
    });
  }
}
