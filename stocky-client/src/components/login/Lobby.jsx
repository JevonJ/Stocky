import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Row, Col, Container, Table } from 'reactstrap';
import CountDown from 'react-countdown-clock';
import PropTypes from 'prop-types';

class Lobby extends Component {
  static renderUsers(player, index) {
    return (
      <tr key={player}>
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

  onStart() {
    const { user } = this.props;
    this.props.socket.emit('start_game', user.room);
  }

  startGame() {
    const { history } = this.props;
    history.push('/simulator');
  }

  render() {
    const { user, players, time } = this.props;
    return (
      <Fade in tag="div" timeout={200}>
        {/* <NavigationPrompt
          beforeConfirm={this.cleanup}
          renderIfNotActive
          disableNative
          when={(crntLocation, nextLocation) => {
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            console.log(crntLocation);
            console.log(nextLocation);
            return !nextLocation || !nextLocation.pathname.startsWith(crntLocation.pathname);
          }}
        >
          {({ isActive, onCancel, onConfirm }) => {
            if (isActive) {
              return (
                <Modal isOpen>
                  <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              );
            }
            return (
              <div>This is probably an anti-pattern but ya know...</div>
            );
          }}
        </NavigationPrompt> */}
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
            {time.start_time > 0 &&
              <div style={{ width: '100%' }}>
                <Col sm="12">
                Game starting in...
                </Col>
                <div style={{ paddingLeft: '40%', paddingRight: '40%', paddingTop: '10px' }}>
                  <CountDown
                    seconds={time.start_time}
                    color="#fff"
                    alpha={0.9}
                    size={100}
                    onComplete={() => this.startGame()}
                  />
                </div>
              </div>
            }
            {time.start_time === 0 && user.host &&
              <Col sm="12">
                <Button
                  outline
                  color="success"
                  size="lg"
                  onClick={() => this.onStart()}
                >
                    Start
                </Button>
              </Col>
            }
          </Row>
        </Container>
      </Fade>
    );
  }
}

const mapStateToProps = ({ user, players, time }) => ({
  user,
  players,
  time,
});

Lobby.propTypes = {
  user: PropTypes.shape({}).isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
  time: PropTypes.shape({}).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Lobby);
