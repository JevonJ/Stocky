import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { Route, withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Welcome from './Welcome';
import Host from './Host';
import GameList from './GameList';
import Lobby from './Lobby';
import Loading from './Loading';

import BGImage from '../../images/welcome.jpeg';
import './Main.css';

const styles = {
  container: {
    backgroundSize: 'cover',
    display: 'flex',
    color: '#fff',
    backgroundImage: `url(${BGImage})`,
    boxShadow: 'inset 0 0 5rem rgba(0, 0, 0, 1)',
    textShadow: '0 .05rem .1rem rgba(0, 0, 0, .5)',
  },
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      popoverOpen: false,
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isLoading !== nextProps.isLoading;
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    const { socket } = this.props;

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
                  href="/login"
                  to="/login"
                >
                  Home
                </NavLink>
                <NavLink
                  exact
                  className="loginMain-nav-link"
                  activeClassName="active"
                  href="login/about"
                  to="login/about"
                >
                  About
                </NavLink>
              </nav>
            </div>
          </header>

          {
            this.props.isLoading ?
              <Loading />
                :
              <div>
                <Route exact path="/login" component={Welcome} />
                <Route
                  exact
                  path="/login/host-game"
                  component={({ history }) => <Host history={history} socket={socket} />}
                />
                <Route
                  exact
                  path="/login/lobby"
                  component={({ history }) => <Lobby history={history} socket={socket} />}
                />
                <Route
                  exact
                  path="/login/game-List"
                  component={({ history }) => <GameList history={history} socket={socket} />}
                />
                <Route exact path="/login/about" component={Welcome} />
              </div>
          }

          <footer className="loginMain-mastfoot mt-auto">
            <div className="inner">
              <p>
                <a className="loginMain-a" href="https://github.com/JevonJ/Stocky">A Stock Market Simulator Game </a>  by
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
    rooms: state.rooms,
    players: state.players,
    isLoading: state.common.isLoading,
  }
);

Main.propTypes = {
  socket: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps)(Main));
