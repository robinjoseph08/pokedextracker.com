import classNames          from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fragment }        from 'react';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { BOX_SIZE } from '../components/box';
import { padding }  from './formatting';

export function groupBoxes (captures) {
  let lastBox = null;

  return captures.reduce((all, capture, i) => {
    const naturalBox = Math.ceil((i + 1) / BOX_SIZE) - 1;
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
  const male = name.indexOf('♂') > -1;
  const female = name.indexOf('♀') > -1;

  if (!male && !female) {
    return name;
  }

  return (
    <Fragment>
      {name.replace(/[♂♀]/g, '')}
      {male && <FontAwesomeIcon icon={faMars} />}
      {female && <FontAwesomeIcon icon={faVenus} />}
    </Fragment>
  );
}

export function iconClass ({ national_id: nationalId, form }, dex) {
  const classes = {
    'color-shiny': dex.shiny,
    [`form-${form}`]: Boolean(form)
  };

  return classNames('pkicon', `pkicon-${padding(nationalId, 3)}`, classes);
}
