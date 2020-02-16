import { Raven }        from '../utils/analytics';
import { localStorage } from '../utils/local-storage';

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
  const nightMode = localStorage.getItem('nightMode') === 'true' || undefined;
  const notif20200209 = localStorage.getItem('notif-2020.02.09') === 'true' || undefined;
  const token = localStorage.getItem('token');
  const session = tokenToUser(token);
  const showInfo = localStorage.getItem('showInfo') === 'true' || undefined;

  return { nightMode, notification: notif20200209, session, showInfo, token };
}

export function saveState ({ nightMode, notification, showInfo, token }) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }

  localStorage.setItem('notif-2020.02.09', notification);
  localStorage.setItem('showInfo', showInfo);
  localStorage.setItem('nightMode', nightMode);
}
