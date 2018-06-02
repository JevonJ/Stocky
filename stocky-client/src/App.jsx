import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import Main from './components/login/Main';
import GameList from './components/login/GameList';
import Popuppassword from './components/login/Popuppassword';


const logger = createLogger();

class App extends Component {
  componentWillMount() {
    this.socket = socketIOClient('http://localhost:4001');

    this.socket.on('change color', (col) => {
      document.body.style.backgroundColor = col;
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers, applyMiddleware(logger))}>
       
        <Main socket={this.socket} />
      </Provider>
    );
  }
}

export default App;
