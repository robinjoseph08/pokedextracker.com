export const SET_REGION     = 'SET_REGION';
export const SET_SHOW_INFO  = 'SET_SHOW_INFO';
export const SET_SHOW_SHARE = 'SET_SHOW_SHARE';

export function setRegion (region) {
  return { type: SET_REGION, region };
}

export function setShowInfo (show) {
  return { type: SET_SHOW_INFO, show };
}

export function setShowShare (show) {
  return { type: SET_SHOW_SHARE, show };
}
