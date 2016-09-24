export const SET_INFO_OPEN  = 'SET_INFO_OPEN';
export const SET_REGION     = 'SET_REGION';
export const SET_SHARE_OPEN = 'SET_SHARE_OPEN';

export function setInfoOpen (open) {
  return { type: SET_INFO_OPEN, open };
}

export function setRegion (region) {
  return { type: SET_REGION, region };
}

export function setShareOpen (open) {
  return { type: SET_SHARE_OPEN, open };
}
