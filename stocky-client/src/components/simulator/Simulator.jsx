import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import './Simulator.css';

class Simulator extends Component {
  constructor() {
    super();
    this.state = {
      color: 'white',
      popoverOpen: false,
    };
  }

  setColor(color) {
    this.setState({ color });
  }

  changeColor(color) {
    this.props.socket.emit('change color', color);
  }

  togglePopover() {
    console.log(this.state.color);
    this.setState({  
      popoverOpen: !this.state.popoverOpen,
      color: '#263238',
    });
  }

  render() {
    return (
      <Fade in tag="div" timeout={500}>
          <div className="d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
          <header className="masthead mb-auto">
            <div className="inner">
              <h3 className="masthead-brand">stocky v0.1 {this.state.color}</h3>
              <nav className="nav nav-masthead justify-content-center">
                <a className="nav-link active" href="#">Home</a>
                <a className="nav-link" href="#">About</a>
              </nav>
            </div>
          </header>

         <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Share</button>
                <button class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
          </div>

          <footer className="mastfoot mt-auto">
            <div className="inner">
              <p>
                <a href="https://github.com/JevonJ/Stocky">A Stock Simulator Game</a>, by
                <a href="#" id="Popover1" onClick={() => this.togglePopover()}> Team Titans.</a>
                <Popover
                  placement="top"
                  isOpen={this.state.popoverOpen}
                  target="Popover1"
                  toggle={() => this.togglePopover()}
                >
                  <PopoverHeader>Our Team</PopoverHeader>
                  <PopoverBody>
                    <ul>
                      <li>Jevon Jansz - 15208469</li>
                      <li>A.L. Alvis - 15208464</li>
                      <li>I.J.Ginige - 15209285</li>
                      <li>D.K.D.S.B.Gunawardhane - 16211242</li>
                      <li>S.Tharaniya - 15209302</li>
                      <li>N.G.Wickramadivakara - 15209308</li>
                    </ul>
                  </PopoverBody>
                </Popover>
              </p>
            </div>
          </footer>
          </main>
        //</div>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('redux state:', state);
};

export default connect(mapStateToProps)(Simulator);
