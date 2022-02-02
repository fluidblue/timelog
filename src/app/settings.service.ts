import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DEFAULT_SETTINGS, Settings } from './Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getSettings(): Observable<Settings> {
    return of(DEFAULT_SETTINGS);
  }
}
