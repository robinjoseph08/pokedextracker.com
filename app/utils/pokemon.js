import classNames from 'classnames';

import { STANDARD_BOX_SIZE } from '../components/box';
import { padding }  from './formatting';

export function groupBoxes (captures) {
  let lastBox = null;

  return captures.reduce((all, capture, i) => {
    const naturalBox = Math.ceil((i + 1) / STANDARD_BOX_SIZE) - 1;
    let box = Math.max(naturalBox, all.length - 1);

    if (capture.pokemon.box !== lastBox) {
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
