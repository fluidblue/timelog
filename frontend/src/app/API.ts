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
