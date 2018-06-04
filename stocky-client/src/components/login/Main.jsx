import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { Route, withRouter, NavLink } from 'react-router-dom';

import * as actions from '../../actions';
import Welcome from './Welcome';
import Host from './Host';
import Lobby from './Lobby';

import './Main.css';

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
      <div className="d-flex w-100 h-100 p-3 mx-auto flex-column text-center main-container">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand">Stocky</h3>
            <nav className="nav nav-masthead justify-content-center">
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                href="/"
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                exact
                className="nav-link"
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
        <Route exact path="/lobby" component={Lobby} />

        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>
              <a href="https://github.com/JevonJ/Stocky">A Stock Simulator Game </a>  by
              <button
                type="button"
                className="btn btn-link"
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
    );
  }
}

const mapStateToProps = state => (
  {
    players: state.players,
  }
);

export default withRouter(connect(mapStateToProps, actions)(Main));
