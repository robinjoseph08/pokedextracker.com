import { Raven } from '../utils/analytics';

export function tokenToUser (token) {
  if (!token) {
    Raven.setUserContext();
    return null;
  }

  const user = JSON.parse(atob(token.split('.')[1]));

  Raven.setUserContext({ id: user.id, username: user.username });

  return user;
}

export function loadState () {
  const notif20170204 = localStorage.getItem('notif-2017.02.04') === 'true' || undefined;
  const token = localStorage.getItem('token');
  const session = tokenToUser(token);
  const showInfo = localStorage.getItem('showInfo') === 'true' || undefined;

  return { notification: notif20170204, token, session, showInfo };
}

export function saveState ({ notification, showInfo, token }) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }

  localStorage.setItem('notif-2017.02.04', notification);
  localStorage.setItem('showInfo', showInfo);
}
