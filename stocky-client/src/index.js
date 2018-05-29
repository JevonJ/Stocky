import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

import './index.css';

const logger = createLogger();

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(logger))}>
    <App />
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
