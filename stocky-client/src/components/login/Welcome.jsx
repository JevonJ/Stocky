import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import './Welcome.css';

class Welcome extends Component {
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
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <Fade in tag="div" timeout={500}>
        <div className="d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
          <header className="masthead mb-auto">
            <div className="inner">
              <h3 className="masthead-brand">Stocky v0.1</h3>
              <nav className="nav nav-masthead justify-content-center">
                <a className="nav-link active" href="#">Home</a>
                <a className="nav-link" href="#">About</a>
              </nav>
            </div>
          </header>

          <main role="main" className="inner cover">
            <h1 className="cover-heading">Welcome to Stocky</h1>
            <p className="lead">Would you like to join or host a game ?</p>
            <p className="lead">
              <Button outline color="primary" size="lg">Join Game</Button>
              <Button outline color="primary" size="lg">Host Game</Button>
            </p>
            <button onClick={() => this.changeColor(this.state.color)}>Change Color</button>
            <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
            <button id="red" onClick={() => this.setColor('red')}>Red</button>
          </main>

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
        </div>
      </Fade>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('redux state:', state);
};

export default connect(mapStateToProps)(Welcome);