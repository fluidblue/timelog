
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
}
