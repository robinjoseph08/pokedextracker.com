export function tokenToUser (token) {
  if (!token) {
    return null;
  }

  return JSON.parse(atob(token.split('.')[1]));
}

export function loadState () {
  const token = localStorage.getItem('token');
  const session = tokenToUser(token);
  const showInfo = localStorage.getItem('showInfo');

  return { token, session, showInfo: showInfo ? showInfo === 'true' : undefined };
}

export function saveState ({ showInfo, token }) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }

  localStorage.setItem('showInfo', showInfo);
}
