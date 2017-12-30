import { connect } from 'react-redux';

export function DonatedFlair ({ user }) {
  if (!user.donated) {
    return null;
  }

  return <img className="donated-flair emoji" title="This user has donated!" src="/emoji_star2.png" />;
}

function mapStateToProps ({ currentUser, users }) {
  return { user: users[currentUser] };
}

export const DonatedFlairComponent = connect(mapStateToProps)(DonatedFlair);
