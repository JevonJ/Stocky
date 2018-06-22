import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { HashRouter as Router, Route } from 'react-router-dom';

import Main from './components/Main';
import reducers from './reducers';

const logger = createLogger();

let middleWare = [ReduxThunk];

const App = () => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV !== 'production' && NODE_ENV !== 'test') {
    middleWare = [...middleWare, logger];
  }

  return (
    <Provider store={createStore(reducers, applyMiddleware(...middleWare))}>
      <Router>
        <Route path="/" component={Main} />
      </Router>
    </Provider>
  );
};

export default App;
