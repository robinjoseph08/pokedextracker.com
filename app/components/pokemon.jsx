import { Component } from 'react';
import classNames    from 'classnames';
import { connect }   from 'react-redux';

import { ReactGA }                        from '../utils/analytics';
import { createCaptures, deleteCaptures } from '../actions/capture';
import { htmlName, iconClass }            from '../utils/pokemon';
import { padding }                        from '../utils/formatting';
import { setCurrentPokemon }              from '../actions/pokemon';
import { setShowInfo }                    from '../actions/tracker';

export class Pokemon extends Component {

  setCurrentPokemon = () => {
    const { capture, setCurrentPokemon, setShowInfo } = this.props;

    ReactGA.event({ action: 'show info', category: 'Pokemon', label: capture.pokemon.name });

    setCurrentPokemon(capture.pokemon.id);
    setShowInfo(true);
  }

  toggleCaptured = () => {
    const { capture, createCaptures, currentDex, deleteCaptures, dex, session, user } = this.props;

    console.log(JSON.stringify(capture));

    if (!session || session.id !== user.id) {
      return;
    }

    const payload = { dex: dex.id, pokemon: [capture.pokemon.id] };

    Promise.resolve()
    .then(() => {
      if (capture.captured) {
        deleteCaptures({ payload, slug: currentDex, username: user.username });
      } else {
        createCaptures({ payload, slug: currentDex, username: user.username });
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
    const { capture, dex, session, user } = this.props;

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
      captured: capture.captured
    };

    return (
      <div className={classNames(classes)}>
        <div className="set-captured" onClick={this.toggleCaptured}>
          <h4 dangerouslySetInnerHTML={htmlName(capture.pokemon.name)} />
          <i className={iconClass(capture.pokemon, dex)} />
          <p>#{padding(capture.pokemon.national_id, 3)}</p>
        </div>
        <div className="set-captured-mobile" onClick={this.toggleCaptured}>
          <i className={iconClass(capture.pokemon, dex)} />
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

function mapStateToProps ({ currentDex, currentUser, session, users }) {
  return { currentDex, dex: users[currentUser].dexesBySlug[currentDex], session, user: users[currentUser] };
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
