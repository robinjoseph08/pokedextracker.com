import { Component } from 'react';
import { connect }   from 'react-redux';

import { ReactGA }                        from '../utils/analytics';
import { createCaptures, deleteCaptures } from '../actions/capture';
import { padding }                        from '../utils/formatting';
import { regionCheck }                    from '../utils/pokemon';

export class MarkAllButton extends Component {

  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

  toggleCaptured = () => {
    const { captures, createCaptures, currentDex, deleteCaptures, dex, region, user } = this.props;
    const deleting = captures.reduce((total, capture) => total + (!regionCheck(capture.pokemon, region) || capture.captured ? 0 : 1), 0) === 0;
    const pokemon = captures.filter((capture) => regionCheck(capture.pokemon, region) && capture.captured === deleting).map((capture) => capture.pokemon.national_id);
    const payload = { dex: dex.id, pokemon };

    Promise.resolve()
    .then(() => {
      this.setState({ loading: true });

      if (deleting) {
        return deleteCaptures({ payload, slug: currentDex, username: user.username });
      }

      return createCaptures({ payload, slug: currentDex, username: user.username });
    })
    .then(() => {
      const event = { category: 'Box', label: `${padding(captures[0].pokemon.national_id, 3)} - ${padding(captures[captures.length - 1].pokemon.national_id, 3)}` };

      if (deleting) {
        ReactGA.event({ ...event, action: 'unmark all' });
      } else {
        ReactGA.event({ ...event, action: 'mark all' });
      }

      this.setState({ loading: false });
    });
  }

  render () {
    const { captures, region, session, user } = this.props;
    const { loading } = this.state;
    const ownPage = session && session.id === user.id;

    if (!ownPage) {
      return null;
    }

    const uncaught = captures.reduce((total, capture) => total + (!regionCheck(capture.pokemon, region) || capture.captured ? 0 : 1), 0);

    return (
      <button className="btn btn-blue" onClick={this.toggleCaptured} disabled={loading}>
        <span className={loading ? 'hidden' : ''}>{uncaught === 0 ? 'Unmark' : 'Mark'} All</span>
        {loading ? <span className="spinner"><i className="fa fa-spinner fa-spin" /></span> : null}
      </button>
    );
  }

}

function mapStateToProps ({ currentDex, currentUser, region, session, users }) {
  return { currentDex, dex: users[currentUser].dexesBySlug[currentDex], region, session, user: users[currentUser] };
}

function mapDispatchToProps (dispatch) {
  return {
    createCaptures: (payload) => dispatch(createCaptures(payload)),
    deleteCaptures: (payload) => dispatch(deleteCaptures(payload))
  };
}

export const MarkAllButtonComponent = connect(mapStateToProps, mapDispatchToProps)(MarkAllButton);
