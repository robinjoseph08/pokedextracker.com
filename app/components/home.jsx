import { Link } from 'react-router';

export function HomeComponent () {
  return (
    <div className="home-container">
      <div className="home">
        <div className="hero">
          <img src="/pokeball.svg" alt="Gotta catch 'em all!" />
          <h1>Pokédex Tracker</h1>
        </div>

        <div className="sub">
          <h2>A tool for tracking your <a href="http://bulbapedia.bulbagarden.net/wiki/Living_Pok%C3%A9dex" target="_blank" className="link">Living Dex</a> progress. Easily toggle between and track your captured Pokémon, find the locations of those left to be captured, and share a public link with others to see how you can help each other out. Check out an example living dex <Link className="link" to="/u/ashketchum10">here</Link>!</h2>

          <p>This project is open source, and you can find the code on Github (<a href="https://github.com/robinjoseph08/pokedextracker.com" target="_blank" className="link">website</a> &amp; <a href="https://github.com/robinjoseph08/api.pokedextracker.com" target="_blank" className="link">API</a>). Feel free to report issues, suggest features, or even submit a pull request!</p>

          <div>
            <Link className="btn btn-blue" to="/register">Register <i className="fa fa-long-arrow-right"></i></Link>
            <Link className="btn btn-white" to="/login">Login <i className="fa fa-long-arrow-right"></i></Link>
          </div>
          <div className="social">
            <a href="https://twitter.com/PokedexTracker" target="_blank" className="link"><i className="fa fa-twitter"></i></a>
          </div>
        </div>
      </div>

      <div className="footer">Made with <i className="pkicon pkicon-ball-love"></i> in San Francisco</div>
    </div>
  );
}
