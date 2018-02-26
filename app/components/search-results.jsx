import { connect } from 'react-redux';

import { PokemonComponent } from './pokemon';

export function SearchResults () {
  const captured = {"dex_id":5,"pokemon":{"id":723,"national_id":723,"name":"Dartrix","generation":7,"game_family":{"id":"sun_moon","generation":7,"regional_total":302,"national_total":820,"order":15,"published":true},"form":null,"box":null,"alola_id":2,"sun_moon_id":2,"ultra_sun_ultra_moon_id":2},"captured":true};

  const notcaptured = {"dex_id":5,"pokemon":{"id":723,"national_id":723,"name":"Dartrix","generation":7,"game_family":{"id":"sun_moon","generation":7,"regional_total":302,"national_total":820,"order":15,"published":true},"form":null,"box":null,"alola_id":2,"sun_moon_id":2,"ultra_sun_ultra_moon_id":2},"captured":false};

  return (
    <div className="search-results">
      <PokemonComponent capture={captured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={captured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
      <PokemonComponent capture={notcaptured} />
    </div>
  );
}

function mapStateToProps ({ currentDex, currentUser, users }) {
  return { dex: users[currentUser].dexesBySlug[currentDex] };
}

export const SearchResultsComponent = connect(mapStateToProps)(SearchResults);
