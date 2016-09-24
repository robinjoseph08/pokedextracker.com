import fetch         from 'isomorphic-fetch';
import { stringify } from 'qs';

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

export function get (url, params) {
  return fetch(`${url}?${stringify(params)}`)
  .then((response) => handleResponse(response));
}

export function post (url, payload) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  .then((response) => handleResponse(response));
}
