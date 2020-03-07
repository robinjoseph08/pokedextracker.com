import uniqBy from 'lodash/uniqBy';

import { capitalize } from '../utils/formatting';

function evolutionKey (evolution) {
  return `${evolution.trigger}:${evolution.level}:${evolution.stone}:${evolution.held_item}:${evolution.notes}`;
}

export function EvolutionsComponent ({ evolutions, pokemonId }) {
  const elements = uniqBy(evolutions, evolutionKey).map((evolution) => {
    const key = evolutionKey(evolution);
    let trigger = null;
    let notes = null;

    switch (evolution.trigger) {
      case 'level':
        trigger = <span>Level Up {evolution.level ? `to ${evolution.level} ` : ''}</span>;
        break;
      case 'stone':
        trigger = <span>{capitalize(evolution.stone)} Stone </span>;
        break;
      case 'candy':
        trigger = <span>{evolution.candy_count} Candies </span>;
        break;
      case 'other':
        break;
      default:
        trigger = <span>{capitalize(evolution.trigger)} </span>;
    }

    if (evolution.notes) {
      if (evolutions.length <= 3) {
        notes = <span>{evolution.notes}</span>;
      } else {
        notes = (
          <div className="tooltip">
            <i className="fa fa-plus-circle" />
            <span className="tooltip-text">{evolution.notes}</span>
          </div>
        );
      }
    }

    return (
      <div className="evolution-trigger" key={key}>
        <i className={`fa ${evolution.trigger === 'breed' ? 'fa-long-arrow-left' : 'fa-long-arrow-right'}`} />
        <div>
          {trigger}
          {evolution.held_item ? <span>holding {capitalize(evolution.held_item)} </span> : null}
          {notes}
        </div>
      </div>
    );
  });

  return (
    // styling hack for mr.rime
    <div className={`evolution-trigger-column ${pokemonId === 866 ? 'push' : ''}`}>{elements}</div>
  );
}
