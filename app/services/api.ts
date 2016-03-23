import { Injectable }                    from 'angular2/core';
import { Headers, Http, RequestOptions } from 'angular2/http';

@Injectable()
export class ApiService {

  private url = 'https://api.pokedextracker.com';
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

  public get (endpoint: string): Promise<Object> {
    return this._http.get(this.url + endpoint, this.options)
    .toPromise()
    .then((res) => res.json())
    .catch((err) => Promise.reject(err.json().error));
  }

  public post (endpoint: string, payload: Object): Promise<Object> {
    return this._http.post(this.url + endpoint, JSON.stringify(payload), this.options)
    .toPromise()
    .then((res) => res.json())
    .catch((err) => Promise.reject(err.json().error));
  }

}
