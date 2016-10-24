import { browserHistory }               from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware }             from 'react-router-redux';
import thunkMiddleware                  from 'redux-thunk';

import { loadState, saveState } from '../utils/local-storage';
import { reducer }              from '../reducers';

const initialState = loadState();
const router = routerMiddleware(browserHistory);

export const Store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware, router));

Store.subscribe(() => saveState(Store.getState()));
