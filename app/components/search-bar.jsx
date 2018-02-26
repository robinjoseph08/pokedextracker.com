export function SearchBarComponent () {
  return (
    <div className="dex-search-bar">
      <div className="wrapper">
        <div className="form-group">
          <i className="fa fa-search" />
          <input className="form-control" name="search" id="search" type="text" placeholder="Search by Pokémon name.." autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          {/* only show if search query exists */}
          <i className="fa fa-times" />
        </div>
      </div>
    </div>
  );
}
