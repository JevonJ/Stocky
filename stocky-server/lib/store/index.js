import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(
  reducers,
  {}, // default state of the application
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
