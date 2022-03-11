import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, ObservableInput, of } from 'rxjs';
import { AddTimeComponent } from './add-time/add-time.component';
import { AddTimeDataResult, AddTimeDataJson } from './add-time/AddTimeData';
import API from './API';
import { ResponseJson } from './ResponseJson';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AddTimeService {

  private readonly apiUri = API.apiUri + "/timelog"

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  openAddTimeDialog() {
    const modalRef = this.modalService.open(AddTimeComponent, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(
      (result: AddTimeDataResult) => {
        const addTimeDataJson: AddTimeDataJson = {
          date: result.date,
          from: result.from.getTotalMinutes(),
          to: result.to.getTotalMinutes(),
        };

        this.http.post<ResponseJson>(this.apiUri, addTimeDataJson).pipe(
          catchError(
            (error): ObservableInput<ResponseJson> => {
              return of({
                result: false
              });
            }
          )
        ).subscribe(
          (reponse: ResponseJson) => {
            if (reponse.result) {
              this.toastService.showInfo("Successfully added time.")
            } else {
              this.toastService.showInfo("Failed to add time.")
            }
          }
        );

        if (result.addAnotherEntry) {
          this.openAddTimeDialog();
        }
      },
      (reason) => {
        // Silently ignore closing of dialog (e.g. by clicking x or clicking on backdrop shadow)
      }
    );
  }
}
