import PropTypes       from 'prop-types';
import { useSelector } from 'react-redux';

export const SCROLL_DEBOUNCE = 500;
export const SHOW_SCROLL_THRESHOLD = 400;

export function Scroll ({ onClick }) {
  const showScroll = useSelector(({ showScroll }) => showScroll);

  return (
    <div className={`scroll-up ${showScroll ? 'visible' : ''}`} onClick={onClick}>
      <i className="fa fa-long-arrow-up" />
    </div>
  );
}

Scroll.propTypes = {
  onClick: PropTypes.func.isRequired
};
