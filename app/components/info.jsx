import { FontAwesomeIcon }                                from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector }                       from 'react-redux';
import { useEffect }                                      from 'react';

import { EvolutionFamily }     from './evolution-family';
import { InfoLocations }       from './info-locations';
import { ReactGA }             from '../utils/analytics';
import { htmlName, iconClass } from '../utils/pokemon';
import { padding }             from '../utils/formatting';
import { retrievePokemon }     from '../actions/pokemon';
import { setShowInfo }         from '../actions/tracker';

export function Info () {
  const dispatch = useDispatch();

  const currentPokemon = useSelector(({ currentPokemon }) => currentPokemon);
  const dex = useSelector(({ currentDex, currentUser, users }) => users[currentUser].dexesBySlug[currentDex]);
  const pokemon = useSelector(({ currentPokemon, pokemon }) => pokemon[currentPokemon]);
  const showInfo = useSelector(({ showInfo }) => showInfo);

  useEffect(() => {
    if (!pokemon) {
      dispatch(retrievePokemon(currentPokemon, {
        game_family: dex.game.game_family.id,
        regional: dex.regional
      }));
    }
  }, [currentPokemon, dex, pokemon]);

  const handleInfoClick = () => {
    ReactGA.event({ action: showInfo ? 'collapse' : 'uncollapse', category: 'Info' });
    dispatch(setShowInfo(!showInfo));
  };

  let serebiiPath = 'pokedex-swsh';
  if (dex.game.game_family.generation === 6) {
    serebiiPath = 'pokedex-xy';
  } else if (dex.game.game_family.generation === 7) {
    serebiiPath = 'pokedex-sm';
  }

  if (!pokemon) {
    return (
      <div className={`info ${showInfo ? '' : 'collapsed'}`}>
        <div className="info-collapse" onClick={handleInfoClick}>
          <FontAwesomeIcon icon={showInfo ? faCaretRight : faCaretLeft} />
        </div>

        <div className="info-main" />
      </div>
    );
  }

  return (
    <div className={`info ${showInfo ? '' : 'collapsed'}`}>
      <div className="info-collapse" onClick={handleInfoClick}>
        <FontAwesomeIcon icon={showInfo ? faCaretRight : faCaretLeft} />
      </div>

      <div className="info-main">
        <div className="info-header">
          <i className={iconClass(pokemon, dex)} />
          <h1>{htmlName(pokemon.name)}</h1>
          <h2>#{padding(pokemon.national_id, 3)}</h2>
        </div>

        <InfoLocations locations={pokemon.locations} />

        <EvolutionFamily family={pokemon.evolution_family} />

        <div className="info-footer">
          <a
            href={`http://bulbapedia.bulbagarden.net/wiki/${encodeURI(pokemon.name)}_(Pok%C3%A9mon)`}
            onClick={() => ReactGA.event({ action: 'open Bulbapedia link', category: 'Info', label: pokemon.name })}
            rel="noopener noreferrer"
            target="_blank"
          >
            Bulbapedia <FontAwesomeIcon icon={faLongArrowAltRight} />
          </a>
          <a
            href={`http://www.serebii.net/${serebiiPath}/${padding(pokemon.national_id, 3)}.shtml`}
            onClick={() => ReactGA.event({ action: 'open Serebii link', category: 'Info', label: pokemon.name })}
            rel="noopener noreferrer"
            target="_blank"
          >
            Serebii <FontAwesomeIcon icon={faLongArrowAltRight} />
          </a>
        </div>
      </div>
    </div>
  );
}
