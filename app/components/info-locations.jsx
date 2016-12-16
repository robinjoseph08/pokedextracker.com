export function InfoLocationsComponent ({ generation, pokemon }) {
  if (generation === 6) {
    return (
      <div className="info-locations">
        <h3>Pokémon Omega Ruby</h3>
        <ul>
          {pokemon.or_locations.map((location) => <li key={location}>{location}</li>)}
        </ul>
        <h3>Pokémon Alpha Sapphire</h3>
        <ul>
          {pokemon.as_locations.map((location) => <li key={location}>{location}</li>)}
        </ul>
        <h3>Pokémon X</h3>
        <ul>
          {pokemon.x_locations.map((location) => <li key={location}>{location}</li>)}
        </ul>
        <h3>Pokémon Y</h3>
        <ul>
          {pokemon.y_locations.map((location) => <li key={location}>{location}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div className="info-locations">
      <h3>Pokémon Sun</h3>
      <ul>
        {pokemon.sun_locations.map((location) => <li key={location}>{location}</li>)}
      </ul>
      <h3>Pokémon Moon</h3>
      <ul>
        {pokemon.moon_locations.map((location) => <li key={location}>{location}</li>)}
      </ul>
    </div>
  );
}
