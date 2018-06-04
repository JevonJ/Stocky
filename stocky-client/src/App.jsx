import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import listeners from './listeners';
import Main from './components/login/Main';

class App extends Component {
  componentWillMount() {
    this.socket = socketIOClient('http://localhost:4001');
    listeners(this.socket, this.props.dispatch);
  }

  render() {
    return (
      <Router>
        <Main socket={this.socket} />
      </Router>
    );
  }
}

export default connect()(App);


