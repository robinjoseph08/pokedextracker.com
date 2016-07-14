import { Component, EventEmitter } from 'angular2/core';
import { DecimalPipe }             from 'angular2/common';
import { Angulartics2On }          from 'angulartics2';

import { EvolutionFamilyComponent } from './evolution-family';
import { Pokemon }                  from '../classes/pokemon';
import { PokemonService }           from '../services/pokemon';

const HTML = require('../views/info.html');

@Component({
  directives: [Angulartics2On, EvolutionFamilyComponent],
  events: ['collapsedChange'],
  inputs: ['active', 'collapsed'],
  pipes: [DecimalPipe],
  selector: 'info',
  template: HTML
})
export class InfoComponent {

  public loading: boolean = true;

  public collapsedChange = new EventEmitter<boolean>();

  private _active: Pokemon;
  private _pokemon: PokemonService;

  constructor (_pokemon: PokemonService) {
    this._pokemon = _pokemon;
  }

  public get active (): Pokemon {
    return this._active;
  }

  public set active (active: Pokemon) {
    this._active = active;
    if (!active.bulbapedia_url) {
      this.loading = true;
      this._pokemon.retrieve(active.national_id)
      .then((pokemon) => {
        this._active = pokemon;
        this.loading = false;
      });
    }
  }

}
