import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTimeComponent } from './add-time/add-time.component';

@Injectable({
  providedIn: 'root'
})
export class AddTimeService {

  constructor(private modalService: NgbModal) { }

  openAddTimeDialog() {
    const modalRef = this.modalService.open(AddTimeComponent, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(
      (result) => {
        console.log("Closed with:", result);
      },
      (reason) => {
        // Silently ignore closing of dialog.
      }
    );
  }
}
