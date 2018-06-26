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
  },
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      popoverOpen: false,
      howToPlayModal: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {

    return this.props.isLoading !== nextProps.isLoading ||
    this.state.howToPlayModal !== nextState.howToPlayModal;
  }

  toggle() {
    this.setState({
      howToPlayModal: !this.state.howToPlayModal,
    });
  }

  render() {
    const { socket } = this.props;
    const { howToPlayModal } = this.state;

    return (
      <div style={styles.container}>
        <ToastContainer hideProgressBar pauseOnHover />
        <HowToPlay howToPlayModal={howToPlayModal} toggle={() => this.toggle()}/>
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
                <a className="loginMain-nav-link" onClick={() => this.toggle()}>How To Play</a>
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
