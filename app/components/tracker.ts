import { Component } from 'angular2/core';
import { Title }     from 'angular2/platform/browser';

import { DexComponent }   from './dex';
import { InfoComponent }  from './info';
import { Pokemon }        from '../classes/pokemon';
import { PokemonService } from '../services/pokemon';

const HTML = require('../views/tracker.html');

@Component({
  directives: [DexComponent, InfoComponent],
  providers: [PokemonService, Title],
  selector: 'tracker',
  template: HTML
})
export class TrackerComponent {

  public active: Pokemon;
  public pokemon: Pokemon[] = [];

  constructor (_pokemonService: PokemonService, _title: Title) {
    _title.setTitle('My Pokédex Tracker');

    _pokemonService.list()
    .subscribe((pokemon: Pokemon[]) => {
      this.pokemon = pokemon;
      this.active = pokemon[0];
    });
  }

}
