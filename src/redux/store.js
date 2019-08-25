import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';
import Logger from 'redux-logger';

const middlewares = [Logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
