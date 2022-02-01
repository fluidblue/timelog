import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  daycardDate = new Date(2022, 0, 27);

  constructor() { }

  ngOnInit(): void {
  }

}
