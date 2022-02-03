import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { SettingsComponent } from './settings/settings.component';
import { UnderOverTimeComponent } from './under-over-time/under-over-time.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'overview', component: MainViewComponent },
  { path: 'underovertime', component: UnderOverTimeComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
