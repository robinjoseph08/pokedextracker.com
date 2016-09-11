import { Injectable }                                     from 'angular2/core';
import { Headers, Http, RequestOptions, URLSearchParams } from 'angular2/http';

import { Config } from '../../config';

@Injectable()
export class ApiService {

  private _http: Http;

  public get options (): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token');

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return new RequestOptions({ headers });
  }

  constructor (_http: Http) {
    this._http = _http;
  }

  public get (endpoint: string, params: Object = {}): Promise<Object> {
    const options = this.options;
    options.search = new URLSearchParams();
    for (let key in params) {
      options.search.set(key, params[key]);
    }

    return this._http.get(Config.API_HOST + endpoint, options)
    .toPromise()
    .then((res) => res.json())
    .catch((err) => Promise.reject(err.json().error));
  }

  public post (endpoint: string, payload: Object = {}): Promise<Object> {
    return this._http.post(Config.API_HOST + endpoint, JSON.stringify(payload), this.options)
    .toPromise()
    .then((res) => res.json())
    .catch((err) => Promise.reject(err.json().error));
  }

  public delete (endpoint: string, payload: Object = {}): Promise<Object> {
    const options = this.options;
    options.body = JSON.stringify(payload);

    return this._http.delete(Config.API_HOST + endpoint, options)
    .toPromise()
    .then((res) => res.json())
    .catch((err) => Promise.reject(err.json().error));
  }

}
