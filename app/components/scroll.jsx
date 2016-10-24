import { connect } from 'react-redux';

export const SCROLL_DEBOUNCE       = 500;
export const SHOW_SCROLL_THRESHOLD = 400;

export function Scroll ({ onClick, showScroll }) {
  return (
    <div className={`scroll-up ${showScroll ? 'visible' : ''}`} onClick={onClick}><i className="fa fa-long-arrow-up" /></div>
  );
}

function mapStateToProps ({ showScroll }) {
  return { showScroll };
}

export const ScrollComponent = connect(mapStateToProps)(Scroll);
