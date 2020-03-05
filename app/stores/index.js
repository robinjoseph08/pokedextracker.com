import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware                           from 'redux-thunk';

import { loadState, saveState } from '../utils/state';
import { reducer }              from '../reducers';

const initialState = loadState();

const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));

Store.subscribe(() => saveState(Store.getState()));
