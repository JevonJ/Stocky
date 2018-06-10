import React, { Component } from 'react';

class DashboardHeader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3 col-sm-3 col-xs-15 gutter">
          <div className="simulatorMain-remaining" >
            <h4>Remaining Cash</h4>
          </div>
        </div>
        <div className="col-md-1 col-sm-1 col-xs-1 gutter"></div>
        <div className="col-md-3 col-sm-3 col-xs-15 gutter">
          <div className="simulatorMain-remaining">
            <h4>Total Stock Value</h4>
          </div>
        </div>
        <div className="col-md-1 col-sm-1 col-xs-1 gutter"></div>
        <div className="col-md-3 col-sm-3 col-xs-12 gutter">
          <div className="simulatorMain-remaining">
            <h4>Total Asset Value</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;