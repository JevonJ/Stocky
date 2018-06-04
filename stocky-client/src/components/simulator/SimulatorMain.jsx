import React from 'react';

import Header from './Header';
import Dashboard from './Dashboard';

const SimulatorMain = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="p-3 mb-2 bg-gradient-dark text-black">
        <Dashboard />
      </div>
    </div>
  </div>
);

export default SimulatorMain;
