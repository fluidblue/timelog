import { Observable } from "rxjs";

export default class API {
  private constructor() {}

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
