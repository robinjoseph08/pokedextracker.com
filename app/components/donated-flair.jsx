import { useSelector } from 'react-redux';

export function DonatedFlairComponent () {
  const user = useSelector(({ currentUser, users }) => users[currentUser]);

  if (!user.donated) {
    return null;
  }

  return <img className="donated-flair emoji" title="This user has donated!" src="/emoji_star2.png" />;
}
