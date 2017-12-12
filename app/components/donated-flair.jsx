export function DonatedFlairComponent ({ donated }) {
  if (!donated) {
    return null;
  }

  return (
    <span className="donated-flair" title="This user has donated!">🌟</span>
  );
}
