import { capitalize } from '../utils/formatting';

export function EvolutionsComponent ({ evolutions }) {
  const elements = evolutions.map((evolution) => {
    const key = `${evolution.trigger}:${evolution.level}:${evolution.stone}:${evolution.held_item}:${evolution.notes}`;
    let trigger = null;
    let notes = null;

    switch (evolution.trigger) {
      case 'level':
        trigger = <span>Level Up {evolution.level ? `to ${evolution.level} ` : ''}</span>;
        break;
      case 'stone':
        trigger = <span>{capitalize(evolution.stone)} Stone </span>;
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
      <div key={key} className="evolution-trigger">
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
    <div className="evolution-trigger-column">{elements}</div>
  );
}
