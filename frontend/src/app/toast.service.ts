import { Injectable } from '@angular/core';
import { Toast, ToastOptions } from './Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];

  constructor() { }

  private show(header: string, body: string, options: ToastOptions = {}) {
    this.toasts.push({
      header: header,
      body: body,
      options: options
    });
  }

  showInfo(message: string, options: ToastOptions = {}) {
    this.show("Info", message, options);
  }

  showError(message: string, options: ToastOptions = {}) {
    this.show("Error", message, options);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t: Toast) => t != toast);
  }
}
