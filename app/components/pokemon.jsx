import PropTypes                    from 'prop-types';
import classNames                   from 'classnames';
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome';
import { faInfo }                   from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { ReactGA }                        from '../utils/analytics';
import { createCaptures, deleteCaptures } from '../actions/capture';
import { htmlName, iconClass }            from '../utils/pokemon';
import { padding }                        from '../utils/formatting';
import { setCurrentPokemon }              from '../actions/pokemon';
import { setShowInfo }                    from '../actions/tracker';
import { useDelayedRender } from '../hooks/use-delayed-render';

export function Pokemon ({ capture, delay }) {
  const render = useDelayedRender(delay);

  const dispatch = useDispatch();

  const currentDex = useSelector(({ currentDex }) => currentDex);
  const dex = useSelector(({ currentDex, currentUser, users }) => users[currentUser].dexesBySlug[currentDex]);
  const session = useSelector(({ session }) => session);
  const user = useSelector(({ currentUser, users }) => users[currentUser]);

  if (!render || !capture) {
    return (
      <div className="pokemon empty">
        <div className="set-captured" />
        <div className="set-captured-mobile" />
      </div>
    );
  }

  const handleSetCapturedClick = async () => {
    if (!session || session.id !== user.id) {
      return;
    }

    const payload = { dex: dex.id, pokemon: [capture.pokemon.id] };

    if (capture.captured) {
      await dispatch(deleteCaptures({ payload, slug: currentDex, username: user.username }));
      ReactGA.event({ category: 'Pokemon', label: capture.pokemon.name, action: 'unmark' });
    } else {
      await dispatch(createCaptures({ payload, slug: currentDex, username: user.username }));
      ReactGA.event({ category: 'Pokemon', label: capture.pokemon.name, action: 'mark' });
    }
  };

  const handleSetInfoClick = () => {
    ReactGA.event({ action: 'show info', category: 'Pokemon', label: capture.pokemon.name });

    dispatch(setCurrentPokemon(capture.pokemon.id));
    dispatch(setShowInfo(true));
  };

  const classes = {
    pokemon: true,
    viewing: !session || session.id !== user.id,
    captured: capture.captured
  };

  return (
    <div className={classNames(classes)}>
      <div className="set-captured" onClick={handleSetCapturedClick}>
        <h4>{htmlName(capture.pokemon.name)}</h4>
        <div className="icon-wrapper">
          <i className={iconClass(capture.pokemon, dex)} />
        </div>
        <p>#{padding(capture.pokemon.national_id, 3)}</p>
      </div>
      <div className="set-captured-mobile" onClick={handleSetCapturedClick}>
        <div className="icon-wrapper">
          <i className={iconClass(capture.pokemon, dex)} />
        </div>
        <h4>{htmlName(capture.pokemon.name)}</h4>
        <p>#{padding(capture.pokemon.national_id, 3)}</p>
      </div>
      <div className="set-info" onClick={handleSetInfoClick}>
        <FontAwesomeIcon icon={faInfo} />
      </div>
    </div>
  );
}

Pokemon.defaultProps = {
  delay: 0
};

Pokemon.propTypes = {
  capture: PropTypes.object,
  delay: PropTypes.number
};
