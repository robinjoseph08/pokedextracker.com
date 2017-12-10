export function InfoLocationsComponent ({ generation, pokemon, region }) {
  const orLocations = (
    pokemon.or_locations.length === 0 ? <li><i>Not available</i></li> : pokemon.or_locations.map((location) => <li key={location}>{location}</li>)
  );

  const asLocations = (
    pokemon.as_locations.length === 0 ? <li><i>Not available</i></li> : pokemon.as_locations.map((location) => <li key={location}>{location}</li>)
  );

  const xLocations = (
    pokemon.x_locations.length === 0 ? <li><i>Not available</i></li> : pokemon.x_locations.map((location) => <li key={location}>{location}</li>)
  );

  const yLocations = (
    pokemon.y_locations.length === 0 ? <li><i>Not available</i></li> : pokemon.y_locations.map((location) => <li key={location}>{location}</li>)
  );

  const sunLocations = (
    pokemon.sun_locations.length === 0 ? <li><i>Not available</i></li> : pokemon.sun_locations.map((location) => <li key={location}>{location}</li>)
  );

  const moonLocations = (
    pokemon.moon_locations.length === 0 ? <li><i>Not available</i></li> : pokemon.moon_locations.map((location) => <li key={location}>{location}</li>)
  );

  const gen6 = (
    <div>
      <h3>Pokémon Omega Ruby</h3>
      <ul>
        {orLocations}
      </ul>
      <h3>Pokémon Alpha Sapphire</h3>
      <ul>
        {asLocations}
      </ul>
      <h3>Pokémon X</h3>
      <ul>
        {xLocations}
      </ul>
      <h3>Pokémon Y</h3>
      <ul>
        {yLocations}
      </ul>
    </div>
  );

  const gen7 = (
    <div>
      <h3>Pokémon Sun</h3>
      <ul>
        {sunLocations}
      </ul>
      <h3>Pokémon Moon</h3>
      <ul>
        {moonLocations}
      </ul>
    </div>
  );

  return (
    <div className="info-locations">
      {generation === 7 ? gen7 : null}
      {region === 'national' ? gen6 : null}
    </div>
  );
}
