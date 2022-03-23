import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-time',
  templateUrl: './remove-time.component.html',
  styleUrls: ['./remove-time.component.scss']
})
export class RemoveTimeComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
