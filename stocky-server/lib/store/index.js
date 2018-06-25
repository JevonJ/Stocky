import 'regenerator-runtime/runtime';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';

import reducers from '../reducers';

const store = createStore(
  reducers,
  {}, // default state of the application
  compose(
    applyMiddleware(thunk),
  ),
);

export default store;
