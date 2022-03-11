import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DaycardComponent } from './daycard/daycard.component';
import { Daycard2Component } from './daycard2/daycard2.component';
import { TimePipe } from './time.pipe';
import { MainViewComponent } from './main-view/main-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { UnderOverTimeComponent } from './under-over-time/under-over-time.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastsComponent } from './toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    DaycardComponent,
    Daycard2Component,
    TimePipe,
    MainViewComponent,
    NavbarComponent,
    SettingsComponent,
    UnderOverTimeComponent,
    ToastsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
