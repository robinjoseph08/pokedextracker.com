export function DexIndicatorComponent ({ dex }) {
  if (!dex || !dex.shiny) {
    return null;
  }

  return (
    <div className="dex-indicator" title="shiny">
      <i className="fa fa-star" />
    </div>
  );
}
