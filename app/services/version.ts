import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

let VERSION: String = null;
let RELOAD_PAGE: boolean = false;

@Injectable()
export class VersionService {

  private _http: Http;

  constructor (_http: Http) {
    this._http = _http;
  }

  public check (): Promise<void> {
    return this._http.get('/version')
    .toPromise()
    .then((res: Response) => {
      const version = res.text();

      if (!VERSION) {
        VERSION = version;
      } else if (VERSION !== version) {
        RELOAD_PAGE = true;
      }
    })
    .catch(() => {}); // tslint:disable-line
  }

  public get reloadPage (): boolean {
    return RELOAD_PAGE;
  }

}
