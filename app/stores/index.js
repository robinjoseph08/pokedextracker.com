import { browserHistory }                        from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware }                      from 'react-router-redux';
import thunkMiddleware                           from 'redux-thunk';

import { loadState, saveState } from '../utils/local-storage';
import { reducer }              from '../reducers';

const initialState = loadState();
const router = routerMiddleware(browserHistory);

const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware, router)));

Store.subscribe(() => saveState(Store.getState()));
