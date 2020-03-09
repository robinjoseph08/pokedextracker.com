import { stringify } from 'qs';

import { Store } from '../stores';

function handleResponse (response) {
  return response.json()
    .then((json) => {
      if (response.status >= 200 && response.status < 300) {
        return json;
      }

      const error = new Error(json.error.message);
      error.response = response;
      throw error;
    });
}

function getHeaders () {
  return {
    Authorization: `Bearer ${Store.getState().token}`,
    'Content-Type': 'application/json'
  };
}

export const API = {
  delete (url, payload) {
    return fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: getHeaders()
    })
      .then((response) => handleResponse(response));
  },
  get (url, params) {
    return fetch(`${url}?${stringify(params)}`)
      .then((response) => handleResponse(response));
  },
  post (url, payload) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: getHeaders()
    })
      .then((response) => handleResponse(response));
  }
};
