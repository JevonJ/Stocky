import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { Route, withRouter, NavLink } from 'react-router-dom';

import * as actions from '../../actions';
import Welcome from './Welcome';
import Host from './Host';

import BGImage from '../../images/welcome.jpeg'
import './Main.css';

const styles = {
  container: {
    backgroundSize: 'cover',
    display: 'flex', color: '#fff',
    backgroundImage: `url(${BGImage})`,
    boxShadow: 'inset 0 0 5rem rgba(0, 0, 0, 1)',
    textShadow: '0 .05rem .1rem rgba(0, 0, 0, .5)',
  }
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      popoverOpen: false,
    };
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    const { setPlayer, players } = this.props;

    return (
      <div style={styles.container}>
        <div className="d-flex w-100 h-100 p-3 mx-auto flex-column text-center loginMain-container">
          <header className="loginMain-masthead mb-auto">
            <div className="inner">
              <h3 className="loginMain-masthead-brand">Stocky</h3>
              <nav className="nav loginMain-nav-masthead justify-content-center">
                <NavLink
                  exact
                  className="loginMain-nav-link"
                  activeClassName="active"
                  href="/"
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  exact
                  className="loginMain-nav-link"
                  activeClassName="active"
                  href="/host-game"
                  to="/host-game"
                >
                  About
                </NavLink>
              </nav>
            </div>
          </header>

          <Route exact path="/" component={Welcome} />

          <Route exact path="/host-game" component={Host} />
          <Route exact path="/about" component={Welcome} />

          <footer className="loginMain-mastfoot mt-auto">
            <div className="inner">
              <p>
                <a className="loginMain-a" href="https://github.com/JevonJ/Stocky">A Stock Simulator Game </a>  by
                <button
                  type="button"
                  className="btn btn-link loginMain-btn-link"
                  id="Popover1"
                  onClick={() => this.togglePopover()}
                >
                    Team Titans.
                </button>
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
      </div>  
    );
  }
}

const mapStateToProps = state => (
  {
    players: state.players,
  }
);

export default withRouter(connect(mapStateToProps, actions)(Main));
