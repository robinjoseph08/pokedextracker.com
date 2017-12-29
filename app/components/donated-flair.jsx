import { connect } from 'react-redux';

export function DonatedFlair ({ user }) {
  if (!user.donated) {
    return null;
  }

  return <span className="donated-flair" title="This user has donated!">🌟</span>;
}

function mapStateToProps ({ currentUser, users }) {
  return { user: users[currentUser] };
}

export const DonatedFlairComponent = connect(mapStateToProps)(DonatedFlair);
