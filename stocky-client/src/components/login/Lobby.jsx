import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'mdbreact';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

class Lobby extends Component {
  static renderUsers(player, index) {
    return (
      <tr key={player.name}>
        <th scope="row">{index + 1}</th>
        <td>{player.name}</td>
      </tr>
    );
  }

  static notify(type, message) {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  componentWillMount() {
    const { user, history } = this.props;
    if (user.constructor === Object && Object.keys(user).length === 0) {
      history.replace('/');
    }
  }

  onStart(e) {
    const { user, players } = this.props;
    if (players.length < 2) {
      Lobby.notify('error', 'Minimum Players to play is 3');
      return;
    }
    e.target.setAttribute('disabled', 'disabled');
    this.props.socket.emit('go_to_simulator', user.room);
  }

  render() {
    const { user, players } = this.props;
    return (
      <div className="animated fadeIn">
        <ToastContainer hideProgressBar pauseOnHover />
        <h1 className="cover-heading">Lobby : {user && user.room}</h1>
        <p className="lead">Connected Players</p>
        <div className="row">
          <div className="col col-sm-12 ml-auto">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {
                  players && players.map((player, index) => Lobby.renderUsers(player, index))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col col-sm-12 ml-auto">
            {user.host &&
              <Button
                outline
                color="success"
                size="lg"
                onClick={e => this.onStart(e)}
              >
                Start
              </Button>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, players }) => ({
  user,
  players,
});

Lobby.propTypes = {
  user: PropTypes.shape({}).isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Lobby);
