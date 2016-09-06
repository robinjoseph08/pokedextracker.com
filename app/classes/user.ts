const FRIEND_CODE_REGEX = /(\d{4})(?=\d)/g;

export class User {

  public id: number;
  public username: string;
  public password: string;
  public password_confirm: string;
  public referrer: string;

  private _friend_code: string;

  public get friend_code (): string {
    return this._friend_code;
  };

  public set friend_code (_friend_code: string) {
    this._friend_code = _friend_code && _friend_code.replace(FRIEND_CODE_REGEX, '$1-');
  }

  constructor (params) {
    this.id = params.id;
    this.username = params.username;
    this.friend_code = params.friend_code;
  }

  public toJSON (): Object {
    return {
      friend_code: this.friend_code,
      id: this.id,
      password: this.password,
      referrer: this.referrer,
      username: this.username
    };
  }

}
