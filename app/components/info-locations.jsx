export function InfoLocationsComponent ({ gameFamily, pokemon, regional }) {
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

  const ultraSunLocations = (
    pokemon.us_locations.length === 0 ? <li><i>Not available</i></li> : pokemon.us_locations.map((location) => <li key={location}>{location}</li>)
  );

  const ultraMoonLocations = (
    pokemon.um_locations.length === 0 ? <li><i>Not available</i></li> : pokemon.um_locations.map((location) => <li key={location}>{location}</li>)
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

  const sunMoon = (
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

  const ultraSunUltraMoon = (
    <div>
      <h3>Pokémon Ultra Sun</h3>
      <ul>
        {ultraSunLocations}
      </ul>
      <h3>Pokémon Ultra Moon</h3>
      <ul>
        {ultraMoonLocations}
      </ul>
    </div>
  );

  // TODO: refactor this logic to more scalable and easier to understand
  return (
    <div className="info-locations">
      {gameFamily.id === 'ultra_sun_ultra_moon' ? ultraSunUltraMoon : null}
      {(gameFamily.id === 'sun_moon' || gameFamily.id === 'ultra_sun_ultra_moon') && !regional ? sunMoon : null}
      {!regional ? gen6 : null}
    </div>
  );
}
