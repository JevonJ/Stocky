import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class Host extends Component {
  render() {
    return (
      <Fade in tag="div" timeout={500}>
        <main role="main" className="inner cover">
          <h1 className="cover-heading">Signup</h1>
        </main>
        <div className="d-flex w-50 h-100 p-3 mx-auto flex-column">
          <Form>
            <FormGroup row>
              <Label for="lobbyName" sm={4} style={{ textAlign: "right" }}>Lobby Name</Label>
              <Col sm={8}>
                <Input type="text" name="lobbyName" id="lobbyName"></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="username" sm={4} style={{ textAlign: "right" }}>Username</Label>
              <Col sm={8}>
                <Input type="text" name="username" id="username"></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="private" sm={4} style={{ textAlign: "right" }}>Private</Label>
              <Col sm={2}>
                <Input type="checkbox" name="private" id="private"></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4} style={{ textAlign: "right" }}>Password</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="password"></Input>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button outline color="success" size="lg">Create</Button>{'  '}
                <Button outline color="secondary" size="lg">Cancel</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Fade>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('redux state:', state);
  return {};
};

export default connect(mapStateToProps)(Host);
