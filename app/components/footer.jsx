import { Link }      from 'react-router';

export function FooterComponent () {
  return (
    <footer className="main-footer">
      <a href="/" className="link">PokédexTracker</a>
      <i className="fa fa-circle" />
      <a href="/blog/" className="link">Blog</a>
      <i className="fa fa-circle" />
      <a href="https://twitter.com/PokedexTracker" className="link" target="_blank" rel="noopener noreferrer">Twitter</a>
      <i className="fa fa-circle" />
      <a href="https://github.com/pokedextracker" className="link" target="_blank" rel="noopener noreferrer">Github</a>
      <i className="fa fa-circle" />
      <Link to="/donate" className="link">Donate</Link>
    </footer>
  );
}
