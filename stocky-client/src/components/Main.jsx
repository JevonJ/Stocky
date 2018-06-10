import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import listeners from '../listeners';
import Main from '../components/login/Main';
import BuyModalMain from './modals/BuyModalMain';

import { setRoom, setPlayer, initialize, setRoomInfo } from '../actions';

class App extends Component {
  componentWillMount() {
    const socket = socketIOClient('http://localhost:4001');
    listeners(socket, this.props);

    this.socket = socket;
  }

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    return (
      <Router>
        <Main socket={this.socket} />
      </Router>
    );
  }
}

export default connect(null, { setRoom, setPlayer, initialize, setRoomInfo })(App);
