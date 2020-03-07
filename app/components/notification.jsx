import { useDispatch, useSelector } from 'react-redux';

import { setNotification } from '../actions/utils';

export function Notification () {
  const dispatch = useDispatch();

  const notification = useSelector(({ notification }) => notification);

  if (notification) {
    return null;
  }

  const handleClick = () => dispatch(setNotification(true));

  return (
    <div className="alert alert-muted">
      <i className="fa fa-times" onClick={handleClick} />
      <p>Track a National Generation 8 dex now! <a href="http://bit.ly/pt-gen8" rel="noopener noreferrer" target="_blank">Read more</a>.</p>
    </div>
  );
}
