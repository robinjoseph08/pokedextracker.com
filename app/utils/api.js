import { stringify } from 'qs';

import { Store } from '../stores';

async function handleResponse (response) {
  const json = await response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  }

  const error = new Error(json.error.message);
  error.response = response;
  throw error;
}

function getHeaders () {
  return {
    Authorization: `Bearer ${Store.getState().token}`,
    'Content-Type': 'application/json'
  };
}

export const API = {
  async delete (url, payload) {
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: getHeaders()
    });
    return handleResponse(response);
  },
  async get (url, params) {
    const response = await fetch(`${url}?${stringify(params)}`);
    return handleResponse(response);
  },
  async post (url, payload) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};
