import { Component } from 'react';
import { connect }   from 'react-redux';

import { createCaptures, deleteCaptures } from '../actions/capture';
import { regionCheck }                    from '../utils/pokemon';

export class MarkAllButton extends Component {

  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

  toggleCaptured = () => {
    const { captures, createCaptures, deleteCaptures, region, user } = this.props;
    const deleting = captures.reduce((total, capture) => total + (!regionCheck(capture.pokemon, region) || capture.captured ? 0 : 1), 0) === 0;
    const pokemon = captures.filter((capture) => regionCheck(capture.pokemon, region) && capture.captured === deleting).map((capture) => capture.pokemon.national_id);
    const payload = { pokemon };

    Promise.resolve()
    .then(() => {
      this.setState({ loading: true });

      if (deleting) {
        return deleteCaptures({ payload, username: user.username });
      }

      return createCaptures({ payload, username: user.username });
    })
    .then(() => {
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
        {loading ? <span className="spinner"><i className="fa fa-spinner fa-spin"></i></span> : null}
      </button>
    );
  }

}

function mapStateToProps ({ currentUser, region, session, users }) {
  return { region, session, user: users[currentUser] };
}

function mapDispatchToProps (dispatch) {
  return {
    createCaptures: (payload) => dispatch(createCaptures(payload)),
    deleteCaptures: (payload) => dispatch(deleteCaptures(payload))
  };
}

export const MarkAllButtonComponent = connect(mapStateToProps, mapDispatchToProps)(MarkAllButton);
