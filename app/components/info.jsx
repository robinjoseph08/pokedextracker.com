import { Component } from 'react';
import { connect }   from 'react-redux';

import { EvolutionFamilyComponent } from './evolution-family';
import { htmlName, iconClass }      from '../utils/pokemon';
import { padding }                  from '../utils/formatting';
import { retrievePokemon }          from '../actions/pokemon';
import { setShowInfo }              from '../actions/tracker';

export class Info extends Component {

  componentDidMount () {
    this.reset();
  }

  componentDidUpdate () {
    this.reset();
  }

  reset () {
    const { currentPokemon, pokemon, retrievePokemon } = this.props;

    if (!pokemon) {
      retrievePokemon(currentPokemon);
    }
  }

  render () {
    const { pokemon, setShowInfo, showInfo } = this.props;

    if (!pokemon) {
      return (
        <div className={`info ${showInfo ? '' : 'collapsed'}`}>
          <div className="info-collapse" onClick={() => setShowInfo(!showInfo)}>
            <i className={`fa ${showInfo ? 'fa-caret-right' : 'fa-caret-left'}`}></i>
          </div>

          <div className="info-main"></div>
        </div>
      );
    }

    return (
      <div className={`info ${showInfo ? '' : 'collapsed'}`}>
        <div className="info-collapse" onClick={() => setShowInfo(!showInfo)}>
          <i className={`fa ${showInfo ? 'fa-caret-right' : 'fa-caret-left'}`}></i>
        </div>

        <div className="info-main">
          <div className="info-header">
            <i className={iconClass(pokemon.national_id)}></i>
            <h1 dangerouslySetInnerHTML={htmlName(pokemon.name)}></h1>
            <h2>#{padding(pokemon.national_id, 3)}</h2>
          </div>

          <div className="info-locations">
            <h3>Pokémon Omega Ruby</h3>
            <ul>
              {pokemon.or_locations.map((location, i) => <li key={i}>{location}</li>)}
            </ul>
            <h3>Pokémon Alpha Sapphire</h3>
            <ul>
              {pokemon.as_locations.map((location, i) => <li key={i}>{location}</li>)}
            </ul>
            <h3>Pokémon X</h3>
            <ul>
              {pokemon.x_locations.map((location, i) => <li key={i}>{location}</li>)}
            </ul>
            <h3>Pokémon Y</h3>
            <ul>
              {pokemon.y_locations.map((location, i) => <li key={i}>{location}</li>)}
            </ul>
          </div>

          <EvolutionFamilyComponent family={pokemon.evolution_family}></EvolutionFamilyComponent>

          <div className="info-footer">
            <a href={pokemon.bulbapedia_url} target="_blank">Bulbapedia <i className="fa fa-long-arrow-right"></i></a>
            <a href={pokemon.serebii_url} target="_blank">Serebii <i className="fa fa-long-arrow-right"></i></a>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps ({ currentPokemon, pokemon, showInfo }) {
  return { currentPokemon, pokemon: pokemon[currentPokemon], showInfo };
}

function mapDispatchToProps (dispatch) {
  return {
    retrievePokemon: (id) => dispatch(retrievePokemon(id)),
    setShowInfo: (show) => dispatch(setShowInfo(show))
  };
}

export const InfoComponent = connect(mapStateToProps, mapDispatchToProps)(Info);
