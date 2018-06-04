import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Row, Col, Container, Table } from 'reactstrap';

class Lobby extends Component {

  render() {
    return (
      <Fade in tag="div" timeout={200}>
        <main role="main" className="inner cover">
          <h1 className="cover-heading">Lobby</h1>
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
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>AshaneAlvis</td>
                    <td>ashanealvis@gmail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>JevonJanz</td>
                    <td>jevonjaz@gmail.com</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>SamSmith</td>
                    <td>samsmith@gmail.com</td>
                  </tr>
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
    )
  }
}

const mapStateToProps = (state) => {
  console.log('redux state:', state);
  return {};
};

export default connect(mapStateToProps)(Lobby);