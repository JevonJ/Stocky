import React from 'react';
import { ToastContainer } from 'react-toastify';

import Dashboard from './Dashboard';

const SimulatorMain = props => (
  <div>
    <ToastContainer hideProgressBar pauseOnHover />
    <Dashboard {...props} />
  </div>
);

export default SimulatorMain;
