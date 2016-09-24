import { Component } from 'react';
import { connect }   from 'react-redux';

import { htmlName, iconClass, regionCheck } from '../utils/pokemon';
import { padding }                          from '../utils/formatting';
import { setCurrentPokemon }                from '../actions/pokemon';
import { setInfoOpen }                      from '../actions/tracker';

export class Pokemon extends Component {

  setCurrentPokemon = (id) => {
    const { setCurrentPokemon, setInfoOpen } = this.props;

    setCurrentPokemon(id);
    setInfoOpen(true);
  }

  render () {
    const { capture, region, session, user } = this.props;

    if (!capture) {
      return (
        <div className="pokemon empty">
          <div className="set-captured"></div>
          <div className="set-captured-mobile"></div>
        </div>
      );
    }

    const ownPage = session && session.id === user.id;
    const classes = ['pokemon'];

    if (!ownPage) {
      classes.push('viewing');
    }

    if (!regionCheck(capture.pokemon, region)) {
      classes.push('disabled');
    }

    if (capture.captured) {
      classes.push('captured');
    }

    return (
      <div className={classes.join(' ')}>
        <div className="set-captured" onClick={this.toggleCaptured}>
          <h4 dangerouslySetInnerHTML={htmlName(capture.pokemon.name)}></h4>
          <i className={iconClass(capture.pokemon.national_id)}></i>
          <p>#{padding(capture.pokemon.national_id, 3)}</p>
        </div>
        <div className="set-captured-mobile" onClick={this.toggleCaptured}>
          <i className={iconClass(capture.pokemon.national_id)}></i>
          <h4 dangerouslySetInnerHTML={htmlName(capture.pokemon.name)}></h4>
          <p>#{padding(capture.pokemon.national_id, 3)}</p>
        </div>
        <div className="set-info" onClick={() => this.setCurrentPokemon(capture.pokemon.national_id)}>
          <i className="fa fa-info"></i>
        </div>
      </div>
    );
  }

}

function mapStateToProps ({ currentUser, region, session, users }) {
  return { region, session, user: users[currentUser] };
}

function mapDispatchToProps (dispatch) {
  return {
    setCurrentPokemon: (id) => dispatch(setCurrentPokemon(id)),
    setInfoOpen: (open) => dispatch(setInfoOpen(open))
  };
}

export const PokemonComponent = connect(mapStateToProps, mapDispatchToProps)(Pokemon);
