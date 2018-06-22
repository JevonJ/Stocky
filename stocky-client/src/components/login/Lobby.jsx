import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Row, Col, Container, Table } from 'reactstrap';
import PropTypes from 'prop-types';

class Lobby extends Component {
  static renderUsers(player, index) {
    return (
      <tr key={player.name}>
        <th scope="row">{index + 1}</th>
        <td>{player.name}</td>
      </tr>
    );
  }

  componentWillMount() {
    const { user, history } = this.props;
    if (user.constructor === Object && Object.keys(user).length === 0) {
      history.replace('/');
    }
  }

  onStart(e) {
    const { user } = this.props;
    e.target.setAttribute('disabled', 'disabled');
    this.props.socket.emit('start_game', user.room);
  }

  render() {
    const { user, players } = this.props;
    return (
      <Fade in tag="div" timeout={200}>
        <main role="main" className="inner cover">
          <h1 className="cover-heading">Lobby : {user && user.room}</h1>
          <p className="lead">Connected Players</p>
        </main>
        <Container>
          <Row>
            <Col sm="12" md="{{ size: 8, offset: 2 }}">
              <Table hover responsive>
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
              </Table>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
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
            </Col>
          </Row>
        </Container>
      </Fade>
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
