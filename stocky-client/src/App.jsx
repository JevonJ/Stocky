import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import Main from './components/Main';
import reducers from './reducers';

const logger = createLogger();

let middleWare = [ReduxThunk];

class App extends Component {
  render() {
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
      middleWare = [...middleWare, logger];
    }

    return (
      <Provider store={createStore(reducers, applyMiddleware(...middleWare))}>
        <Main socket={this.socket} />
      </Provider>
    );
  }
}

export default App;
