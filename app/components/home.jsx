import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link }      from 'react-router';
import { connect }   from 'react-redux';

import { checkVersion } from '../actions/utils';

export class Home extends Component {

  componentWillMount () {
    checkVersion();
  }

  render () {
    const { session } = this.props;

    let ctas = null;

    if (session) {
      ctas = (
        <div>
          <Link className="btn btn-blue" to={`/u/${session.username}`}>View Profile <i className="fa fa-long-arrow-right" /></Link>
        </div>
      );
    } else {
      ctas = (
        <div>
          <Link className="btn btn-blue" to="/register">Register <i className="fa fa-long-arrow-right" /></Link>
          <Link className="btn btn-white" to="/login">Login <i className="fa fa-long-arrow-right" /></Link>
        </div>
      );
    }

    return (
      <DocumentTitle title="Pokédex Tracker | Track the Progress of Your Living Dex Completion">
        <div className="home-container">
          <div className="home">
            <div className="hero">
              <img src="/pokeball.svg" alt="Gotta catch 'em all!" />
              <h1>Pokédex Tracker</h1>
            </div>

            <div className="sub">
              <h2>A tool for tracking your <a href="http://bulbapedia.bulbagarden.net/wiki/Living_Pok%C3%A9dex" target="_blank" className="link">Living Dex</a> progress. Easily toggle between and track your captured Pokémon, find the locations of those left to be captured, and share a public link with others to see how you can help each other out. Check out an example living dex <Link className="link" to="/u/ashketchum10/living-dex">here</Link>!</h2>

              <p>This project is open source, and you can find the code on Github (<a href="https://github.com/robinjoseph08/pokedextracker.com" target="_blank" className="link">website</a> &amp; <a href="https://github.com/robinjoseph08/api.pokedextracker.com" target="_blank" className="link">API</a>). Feel free to report issues, suggest features, or even submit a pull request!</p>

              {ctas}

              <div className="social">
                <a href="https://twitter.com/PokedexTracker" target="_blank" className="link"><i className="fa fa-twitter" /></a>
              </div>
            </div>
          </div>

          <div className="footer">Made with <i className="pkicon pkicon-ball-love" /> in San Francisco</div>
        </div>
      </DocumentTitle>
    );
  }

}

function mapStateToProps ({ session }) {
  return { session };
}

function mapDispatchToProps (dispatch) {
  return {
    checkVersion: () => dispatch(checkVersion())
  };
}

export const HomeComponent = connect(mapStateToProps, mapDispatchToProps)(Home);
