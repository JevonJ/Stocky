import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import './SimulatorMain.css';

import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';

class SimulatorMain extends Component {
  render() {
    return (
    <div>
      <Header />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />

        <Dashboard />
      </div>
    </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('redux state:', state);
};

export default connect(mapStateToProps)(SimulatorMain);
