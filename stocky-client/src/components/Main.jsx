import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import listeners from '../listeners';
import { setRoom, setPlayer, initialize, setRoomInfo, setUser } from '../actions';

import LoginMain from '../components/login/Main';
import Simulator from './simulator/SimulatorMain';

class Main extends Component {
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
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={props => <LoginMain socket={this.socket} {...props} />} />
        <Route exact path="/simulator" component={Simulator} />
      </Switch>
    );
  }
}

Main.propTypes = {
  initialize: PropTypes.func.isRequired,
};

export default connect(null, {
  setRoom, setPlayer, initialize, setRoomInfo, setUser,
})(Main);
