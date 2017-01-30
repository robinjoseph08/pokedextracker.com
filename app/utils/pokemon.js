import classNames from 'classnames';

import { padding } from './formatting';

export function htmlName (name) {
  return { __html: name.replace('♀', '<i class="fa fa-venus"></i>').replace('♂', '<i class="fa fa-mars"></i>') };
}

export function iconClass ({ national_id: nationalId }, dex) {
  const classes = {
    'color-shiny': dex.shiny,
    'form-alola': dex.generation === 7
  };

  return classNames('pkicon', `pkicon-${padding(nationalId, 3)}`, classes);
}

export function regionCheck (pokemon, region) {
  if (region === 'kalos') {
    return Boolean(pokemon.central_kalos_id || pokemon.coastal_kalos_id || pokemon.mountain_kalos_id);
  }
  return Boolean(pokemon[`${region}_id`]);
}
