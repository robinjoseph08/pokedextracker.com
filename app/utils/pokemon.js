import classNames from 'classnames';

import { BOX_SIZE } from '../components/box';
import { padding }  from './formatting';

export function groupBoxes (captures, dex) {
  let lastBox = null;

  return captures.reduce((all, capture, i) => {
    const naturalBox = Math.ceil((i + 1) / BOX_SIZE) - 1;
    let box = Math.max(naturalBox, all.length - 1);

    if (dex.region === 'national' && capture.pokemon.box !== lastBox) {
      box++;
    }

    lastBox = capture.pokemon.box;

    all[box] = all[box] || [];
    all[box].push(capture);
    return all;
  }, []);
}

export function htmlName (name) {
  return { __html: name.replace('♀', '<i class="fa fa-venus"></i>').replace('♂', '<i class="fa fa-mars"></i>') };
}

export function iconClass ({ national_id: nationalId, form }, dex) {
  const classes = {
    'color-shiny': dex.shiny,
    [`form-${form}`]: Boolean(form)
  };

  return classNames('pkicon', `pkicon-${padding(nationalId, 3)}`, classes);
}

export function regionCheck (pokemon, region) {
  if (region === 'kalos') {
    return Boolean(pokemon.central_kalos_id || pokemon.coastal_kalos_id || pokemon.mountain_kalos_id);
  }
  return Boolean(pokemon[`${region}_id`]);
}
