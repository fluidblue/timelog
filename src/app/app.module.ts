import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DaycardComponent } from './daycard/daycard.component';
import { Daycard2Component } from './daycard2/daycard2.component';

@NgModule({
  declarations: [
    AppComponent,
    DaycardComponent,
    Daycard2Component
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
