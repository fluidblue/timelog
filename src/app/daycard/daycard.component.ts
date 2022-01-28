import { Component, OnInit } from '@angular/core';
import { WorkingTimesService } from '../working-times.service';

@Component({
  selector: 'app-daycard',
  templateUrl: './daycard.component.html',
  styleUrls: ['./daycard.component.scss']
})
export class DaycardComponent implements OnInit {

  constructor(private workingTimesService: WorkingTimesService) { }

  ngOnInit(): void {
  }

}
