export function tokenToUser (token) {
  if (!token) {
    return null;
  }

  return JSON.parse(atob(token.split('.')[1]));
}

export function loadState () {
  const infoOpen = localStorage.getItem('infoOpen');
  const token = localStorage.getItem('token');
  const session = tokenToUser(token);

  return { infoOpen: infoOpen ? infoOpen === 'true' : undefined, token, session };
}

export function saveState ({ infoOpen, token }) {
  localStorage.setItem('infoOpen', infoOpen);

  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}
