import { Component } from 'react';
import classNames    from 'classnames';
import { connect }   from 'react-redux';

import { ReactGA }                          from '../utils/analytics';
import { createCaptures, deleteCaptures }   from '../actions/capture';
import { htmlName, iconClass, regionCheck } from '../utils/pokemon';
import { padding }                          from '../utils/formatting';
import { setCurrentPokemon }                from '../actions/pokemon';
import { setShowInfo }                      from '../actions/tracker';

export class Pokemon extends Component {

  setCurrentPokemon = () => {
    const { capture, region, setCurrentPokemon, setShowInfo } = this.props;

    if (regionCheck(capture.pokemon, region)) {
      ReactGA.event({ action: 'show info', category: 'Pokemon', label: capture.pokemon.name });

      setCurrentPokemon(capture.pokemon.national_id);
      setShowInfo(true);
    }
  }

  toggleCaptured = () => {
    const { capture, createCaptures, deleteCaptures, region, session, user } = this.props;

    if (!session || session.id !== user.id || !regionCheck(capture.pokemon, region)) {
      return;
    }

    const payload = { pokemon: [capture.pokemon.national_id] };

    Promise.resolve()
    .then(() => {
      if (capture.captured) {
        deleteCaptures({ payload, username: user.username });
      } else {
        createCaptures({ payload, username: user.username });
      }
    })
    .then(() => {
      const event = { category: 'Pokemon', label: capture.pokemon.name };

      if (capture.captured) {
        ReactGA.event({ ...event, action: 'unmark' });
      } else {
        ReactGA.event({ ...event, action: 'mark' });
      }
    });
  }

  render () {
    const { capture, region, session, user } = this.props;

    if (!capture) {
      return (
        <div className="pokemon empty">
          <div className="set-captured" />
          <div className="set-captured-mobile" />
        </div>
      );
    }

    const classes = {
      pokemon: true,
      viewing: !session || session.id !== user.id,
      disabled: !regionCheck(capture.pokemon, region),
      captured: capture.captured
    };

    return (
      <div className={classNames(classes)}>
        <div className="set-captured" onClick={this.toggleCaptured}>
          <h4 dangerouslySetInnerHTML={htmlName(capture.pokemon.name)} />
          <i className={iconClass(capture.pokemon.national_id)} />
          <p>#{padding(capture.pokemon.national_id, 3)}</p>
        </div>
        <div className="set-captured-mobile" onClick={this.toggleCaptured}>
          <i className={iconClass(capture.pokemon.national_id)} />
          <h4 dangerouslySetInnerHTML={htmlName(capture.pokemon.name)} />
          <p>#{padding(capture.pokemon.national_id, 3)}</p>
        </div>
        <div className="set-info" onClick={this.setCurrentPokemon}>
          <i className="fa fa-info" />
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
    createCaptures: (payload) => dispatch(createCaptures(payload)),
    deleteCaptures: (payload) => dispatch(deleteCaptures(payload)),
    setCurrentPokemon: (id) => dispatch(setCurrentPokemon(id)),
    setShowInfo: (show) => dispatch(setShowInfo(show))
  };
}

export const PokemonComponent = connect(mapStateToProps, mapDispatchToProps)(Pokemon);
