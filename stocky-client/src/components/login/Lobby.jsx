import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody } from 'mdbreact';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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
    if (players.length < 3) {
      Lobby.notify('error', 'Minimum Players to play is 3');
      return;
    }
    e.target.setAttribute('disabled', 'disabled');
    this.props.socket.emit('go_to_simulator', user.room);
  }

  onAddComputerPlayer() {
    const { user, players } = this.props;

    const computerPlayers = players.filter((player) => {
      return player.isComputer === true;
    });

    if (computerPlayers.length > 1) {
      Lobby.notify('error', 'Maximum Computer Player Number Reached');
      return;
    }

    const data = {
      room: user.room,
      isComputer: true,
      username: `computerPlayer${computerPlayers.length + 1}`,
    };

    this.props.socket.emit('set_computer_player', data);
  }

  render() {
    const { user, players } = this.props;
    return (
      <div className="animated fadeIn">
        <h1 className="cover-heading">Lobby : {user && user.room}</h1>
        <p className="lead">Connected Players</p>
        <div className="row">
          <div className="col col-sm-12 ml-auto" style={{ paddingLeft: '30rem', paddingRight: '30rem' }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th><strong>#</strong></th>
                  <th><strong>Username</strong></th>
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
        <div className="col col-sm-12 ml-auto">
          {user.host &&
            <Button
              outline
              color="secondary"
              size="lg"
              onClick={() => this.onAddComputerPlayer()}
            >
              Add Computer Player
            </Button>
          }
        </div>
        <div className="row">
          <div className="col col-sm-12 ml-auto" style={{ paddingLeft: '35rem', paddingRight: '35rem' }}>
            <Card color="red lighten-1" text="white" className="text-center">
              <CardBody>
                Can Add Computer Player, But it does not buy and sell stock (Still to be implimented).
              </CardBody>
            </Card>
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
