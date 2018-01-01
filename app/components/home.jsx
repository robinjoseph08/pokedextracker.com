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
              <h2>A tool for tracking your Living Dex progress for Pokémon Sun &amp; Moon (both Gen 7 <Link className="link" alt="Sample Sun &amp; Moon Living Dex" to="/u/ashketchum10/alola-living-dex">Alola Dex</Link> and <Link className="link" alt="Sample Gen 7 National Living Dex" to="/u/ashketchum10/gen-7-living-dex">National Dex</Link>) or <Link className="link" alt="Sample Gen 6 Living Dex" to="/u/ashketchum10/gen-6-living-dex">Gen 6</Link>. Easily toggle between and track your captured Pokémon, find the locations of those left to be captured, and share a public link with others to see how you can help each other out. Manage all your dexes on one <Link className="link" alt="Sample Profile" to="/u/ashketchum10">profile</Link>, and even track a <Link className="link" alt="Sample Shiny Living Dex" to="/u/ashketchum10/shinies">shiny living dex</Link>!</h2>

              <p>This project is open source, and you can find the code on <a href="https://github.com/pokedextracker" target="_blank" rel="noopener noreferrer" className="link">GitHub</a>. Feel free to report issues, suggest features, or even submit a pull request. Help support this project financially by <Link className="link" to="/donate">donating</Link>&mdash;every little bit helps!</p>

              {ctas}

              <div className="social">
                <a href="https://twitter.com/PokedexTracker" target="_blank" rel="noopener noreferrer" className="link"><i className="fa fa-twitter" /></a>
                <a href="/blog/" target="_blank" rel="noopener noreferrer" className="link"><i className="fa fa-rss" /></a>
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
