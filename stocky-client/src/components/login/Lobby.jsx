import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Row, Col, Container, Table } from 'reactstrap';

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
              <Table dark bordered hover>
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
            <Col sm="12" md="{{ size: 8, offset: 2 }}">
              <Button outline color="success" size="lg">Start</Button>
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

export default connect(mapStateToProps)(Lobby);
