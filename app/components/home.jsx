import { Component, useEffect } from 'react';
import { Link }      from 'react-router-dom';
import { connect }   from 'react-redux';

import { checkVersion } from '../actions/utils';

export class Home extends Component {

  componentWillMount () {
    checkVersion();
  }

  render () {
    const { session } = this.props;

    useEffect(() => {
      document.title = 'Pokédex Tracker | Track the Progress of Your Living Dex Completion';
    }, []);

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
      <div className="home-container">
        <div className="home">
          <div className="hero">
            <img src="/pokeball.svg" alt="Gotta catch 'em all!" />
            <h1>Pokédex Tracker</h1>
          </div>

          <div className="sub">
            <h2>A tool for tracking your Living Dex progress! We currently support:</h2>
            <ul>
              <li><h2><Link className="link" alt="Sample Generation 8 National Living Dex" to="/u/ashketchum10/sword-national-living-dex">Generation 8 National Dex</Link> (and Generations 6 + 7)</h2></li>
              <li><h2><Link className="link" alt="Sample Shield Regional Living Dex" to="/u/ashketchum10/sword-regional-living-dex">Pokémon Sword &amp; Shield Regional Dex</Link></h2></li>
              <li><h2><Link className="link" alt="Sample Let's Go, Pikachu Regional Living Dex" to="/u/ashketchum10/lets-go-pikachu-regional-living-dex">Pokémon Let's Go, Pikachu &amp; Let's Go, Eevee Regional Dex</Link></h2></li>
              <li><h2><Link className="link" alt="Sample Ultra Sun Regional Living Dex" to="/u/ashketchum10/ultra-sun-regional-living-dex">Pokémon Ultra Sun &amp; Ultra Moon Regional Dex</Link></h2></li>
              <li><h2><Link className="link" alt="Sample Sun Regional Living Dex" to="/u/ashketchum10/sun-regional-living-dex">Pokémon Sun &amp; Moon Regional Dex</Link></h2></li>
              <li><h2><Link className="link" alt="Sample Omega Ruby Regional Living Dex" to="/u/ashketchum10/omega-ruby-regional-living-dex">Pokémon Omega Ruby &amp; Alpha Sapphire Regional Dex</Link></h2></li>
              <li><h2><Link className="link" alt="Sample X Regional Living Dex" to="/u/ashketchum10/x-regional-living-dex">Pokémon X &amp; Y Regional Dex</Link></h2></li>
              <li><h2><Link className="link" alt="Sample Shiny Living Dex" to="/u/ashketchum10/shinies">Shiny Dexes</Link> for all of the above!</h2></li>
            </ul>
            <h2>Easily toggle between and track your captured Pokémon, find the locations of those left to be captured, manage all your dexes on one <Link className="link" alt="Sample Profile" to="/u/ashketchum10">profile</Link>, and share a public link with others to see how you can help each other out.</h2>
            <p>This project is open source, and you can find the code on <a href="https://github.com/pokedextracker" target="_blank" rel="noopener noreferrer" className="link">GitHub</a>. Feel free to report issues, suggest features, or even submit a pull request. Help support this project financially by <a href="https://www.patreon.com/pokedextracker" className="link" target="_blank" rel="noopener noreferrer">donating</a>&mdash;every little bit helps!</p>

            {ctas}

            <div className="social">
              <a href="https://twitter.com/PokedexTracker" target="_blank" rel="noopener noreferrer" className="link"><i className="fa fa-twitter" /></a>
              <a href="/blog/" target="_blank" rel="noopener noreferrer" className="link"><i className="fa fa-rss" /></a>
            </div>
          </div>
        </div>
        <div className="footer">Made with <i className="pkicon pkicon-ball-love" /> in San Francisco</div>
      </div>
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
