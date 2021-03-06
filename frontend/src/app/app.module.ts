import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DaycardComponent } from './daycard/daycard.component';
import { TimePipe } from './time.pipe';
import { MainViewComponent } from './main-view/main-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { UnderOverTimeComponent } from './under-over-time/under-over-time.component';
import { FormsModule } from '@angular/forms';
import { ToastsComponent } from './toasts/toasts.component';
import { AddTimeComponent } from './add-time/add-time.component';
import { RemoveTimeComponent } from './remove-time/remove-time.component';
import { DateRangeComponent } from './date-range/date-range.component';

@NgModule({
  declarations: [
    AppComponent,
    DaycardComponent,
    TimePipe,
    MainViewComponent,
    NavbarComponent,
    SettingsComponent,
    UnderOverTimeComponent,
    ToastsComponent,
    AddTimeComponent,
    RemoveTimeComponent,
    DateRangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
