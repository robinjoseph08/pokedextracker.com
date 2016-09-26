import { Injectable }                                     from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import { Config }         from '../../config';
import { VersionService } from './version';

@Injectable()
export class ApiService {

  private _http: Http;
  private _version: VersionService;

  public get options (): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token');

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return new RequestOptions({ headers });
  }

  constructor (_http: Http, _version: VersionService) {
    this._http = _http;
    this._version = _version;
  }

  public get (endpoint: string, params: Object = {}): Promise<Object> {
    const options = this.options;
    options.search = new URLSearchParams();
    for (let key in params) {
      options.search.set(key, params[key]);
    }

    return Promise.all([
      <Promise<any>> this._http.get(Config.API_HOST + endpoint, options).toPromise(),
      this._version.check()
    ])
    .then(([res]) => res.json())
    .catch((err) => Promise.reject(err.json().error));
  }

  public post (endpoint: string, payload: Object = {}): Promise<Object> {
    return Promise.all([
      <Promise<any>> this._http.post(Config.API_HOST + endpoint, JSON.stringify(payload), this.options).toPromise(),
      this._version.check()
    ])
    .then(([res]) => res.json())
    .catch((err) => Promise.reject(err.json().error));
  }

  public delete (endpoint: string, payload: Object = {}): Promise<Object> {
    const options = this.options;
    options.body = JSON.stringify(payload);

    return Promise.all([
      <Promise<any>> this._http.delete(Config.API_HOST + endpoint, options).toPromise(),
      this._version.check()
    ])
    .then(([res]) => res.json())
    .catch((err) => Promise.reject(err.json().error));
  }

}
