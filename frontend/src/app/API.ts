import { Observable } from "rxjs";

export default class API {
  public static readonly apiUri = this.getAPIUri();

  private constructor() {}

  private static getAPIUri(): string {
    let uri = '/api';
    if (process.env["NODE_ENV"] === 'development') {
      uri = window.location.protocol + '//' + window.location.hostname + ':9000' + uri;
    }
    return uri;
  }

  static convertDateToString(date: Date): string {
    const pad = (num: number) => ("00" + num).slice(-2);
    return date.getFullYear() + "-" +
      pad(date.getMonth() + 1) + "-" +
      pad(date.getDate());
  }

  static convertPromise2Observable<T>(promise: Promise<T>): Observable<T> {
    return new Observable<T>(subscriber => {
      promise.then(
        (value) => {
          subscriber.next(value);
          subscriber.complete();
        },
        (reason) => {
          subscriber.error(reason);
          subscriber.complete();
        }
      );
    });
  }
}
