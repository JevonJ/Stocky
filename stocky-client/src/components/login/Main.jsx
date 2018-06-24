import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Footer } from 'mdbreact';
import { Route, withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import Welcome from './Welcome';
import Host from './Host';
import GameList from './GameList';
import Lobby from './Lobby';
import Loading from './Loading';
import HowToPlay from './HowToPlay';

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
    // height:'100%',
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

  render() {
    const { socket } = this.props;

    return (
      <div style={styles.container}>
        <ToastContainer hideProgressBar pauseOnHover />

        <div className="d-flex w-100 h-100 mx-auto flex-column text-center loginMain-container">
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
                  href="/login/how-to-play"
                  to="/login/how-to-play"
                >
                  How To Play
                </NavLink>
              </nav>
            </div>
          </header>

          {
            this.props.isLoading ?
              <Loading />
              :
              <div style={{ overflow: 'auto','overflow-x': 'hidden', }}>
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
                <Route exact path="/login/how-to-play" component={HowToPlay} />
              </div>
          }
          <Footer color="special-color-dark" className="mt-auto page-footer lighten-5 pt-0">
            <div className="footer-copyright text-center">
              <Container fluid>
                <a href="https://github.com/JevonJ/Stocky">A Stock Market Simulator Game </a>
                by <a href="https://github.com/JevonJ/Stocky"> Team Titans.</a>
              </Container>
            </div>
          </Footer>
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
