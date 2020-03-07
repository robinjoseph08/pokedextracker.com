import { useDispatch, useSelector } from 'react-redux';
import { useEffect }                from 'react';

import { EvolutionFamilyComponent } from './evolution-family';
import { InfoLocationsComponent }   from './info-locations';
import { ReactGA }                  from '../utils/analytics';
import { htmlName, iconClass }      from '../utils/pokemon';
import { padding }                  from '../utils/formatting';
import { retrievePokemon }          from '../actions/pokemon';
import { setShowInfo }              from '../actions/tracker';

export function InfoComponent () {
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
          <i className={`fa ${showInfo ? 'fa-caret-right' : 'fa-caret-left'}`} />
        </div>

        <div className="info-main" />
      </div>
    );
  }

  return (
    <div className={`info ${showInfo ? '' : 'collapsed'}`}>
      <div className="info-collapse" onClick={handleInfoClick}>
        <i className={`fa ${showInfo ? 'fa-caret-right' : 'fa-caret-left'}`} />
      </div>

      <div className="info-main">
        <div className="info-header">
          <i className={iconClass(pokemon, dex)} />
          <h1 dangerouslySetInnerHTML={htmlName(pokemon.name)} />
          <h2>#{padding(pokemon.national_id, 3)}</h2>
        </div>

        <InfoLocationsComponent pokemon={pokemon} />

        <EvolutionFamilyComponent family={pokemon.evolution_family} />

        <div className="info-footer">
          <a
            href={`http://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(pokemon.name)}_(Pok%C3%A9mon)`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => ReactGA.event({ action: 'open Bulbapedia link', category: 'Info', label: pokemon.name })}
          >
            Bulbapedia <i className="fa fa-long-arrow-right" />
          </a>
          <a
            href={`http://www.serebii.net/${serebiiPath}/${padding(pokemon.national_id, 3)}.shtml`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => ReactGA.event({ action: 'open Serebii link', category: 'Info', label: pokemon.name })}
          >
            Serebii <i className="fa fa-long-arrow-right" />
          </a>
        </div>
      </div>
    </div>
  );
}
