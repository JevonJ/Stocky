import React from 'react';
import { Container } from 'reactstrap';

// import Header from './Header';
import Dashboard from './Dashboard';

const SimulatorMain = props => (
  <Container fluid>
    {/* <Header /> */}
    <Dashboard {...props} />
  </Container>
);

export default SimulatorMain;
