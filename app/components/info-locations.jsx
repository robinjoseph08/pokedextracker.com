export function InfoLocationsComponent ({ pokemon }) {
  return (
    <div className="info-locations">
      {pokemon.locations.map((location) => {
        return (
          <div key={location.game.id}>
            <h3>Pokémon {location.game.name}</h3>
            <ul>
              {location.value.map((loc) => <li key={loc}>{loc}</li>)}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
