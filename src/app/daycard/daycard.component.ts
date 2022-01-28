import { Component, OnInit } from '@angular/core';
import { StandardWorkingTimesService } from '../standard-working-times.service';
import { WorkingTimesService } from '../working-times.service';

@Component({
  selector: 'app-daycard',
  templateUrl: './daycard.component.html',
  styleUrls: ['./daycard.component.scss']
})
export class DaycardComponent implements OnInit {

  constructor(private standardWorkingTimesService: StandardWorkingTimesService,
    private workingTimesService: WorkingTimesService) { }

  ngOnInit(): void {
  }

}
