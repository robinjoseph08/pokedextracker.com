import { Component, OnInit } from 'angular2/core';
import { RouteParams }       from 'angular2/router';
import { Title }             from 'angular2/platform/browser';

import { DexComponent }   from './dex';
import { InfoComponent }  from './info';
import { NavComponent }   from './nav';
import { Pokemon }        from '../classes/pokemon';
import { PokemonService } from '../services/pokemon';
import { SessionService } from '../services/session';
import { User }           from '../classes/user';
import { UserService }    from '../services/user';

const HTML = require('../views/tracker.html');

@Component({
  directives: [DexComponent, InfoComponent, NavComponent],
  providers: [PokemonService, SessionService, Title, UserService],
  selector: 'tracker',
  template: HTML
})
export class TrackerComponent implements OnInit {

  public active: Pokemon;
  public pokemon: Pokemon[] = [];
  public _session: SessionService;
  public user: User;

  private _pokemon: PokemonService;
  private _routeParams: RouteParams;
  private _title: Title;
  private _user: UserService;

  constructor (_pokemon: PokemonService, _routeParams: RouteParams, _session: SessionService, _title: Title, _user: UserService) {
    this._pokemon = _pokemon;
    this._routeParams = _routeParams;
    this._session = _session;
    this._title = _title;
    this._user = _user;
  }

  public ngOnInit () {
    this._user.retrieve(this._routeParams.get('username'))
    .then((user) => {
      this._title.setTitle(`${this._routeParams.get('username')}'s Pokédex Tracker`);

      this.user = user;

      return this._pokemon.list();
    })
    .then((pokemon) => {
      this.pokemon = pokemon;
      this.active = pokemon[0];
    });
  }

}
