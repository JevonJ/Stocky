import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

import listeners from './listeners';
import Welcome from './components/login/Welcome';

class App extends Component {
  componentWillMount() {
    this.socket = socketIOClient('http://localhost:4001');
    listeners(this.socket, this.props.dispatch);
  }

  render() {
    return (
      <Welcome socket={this.socket} />
    );
  }
}

export default connect()(App);
