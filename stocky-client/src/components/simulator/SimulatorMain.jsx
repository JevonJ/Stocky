import React from 'react';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

// import Header from './Header';
import Dashboard from './Dashboard';

const SimulatorMain = props => (
  <Container fluid>
    {/* <Header /> */}
    <ToastContainer hideProgressBar pauseOnHover />
    <Dashboard {...props} />
  </Container>
);

export default SimulatorMain;
