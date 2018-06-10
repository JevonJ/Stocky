import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class Host extends Component {
  constructor() {
    super();

    this.state = {
      hostForm: {
        roomName: '',
        username: '',
        isPrivate: false,
        password: '',
      },
    };
  }

  onInputChange({ target: { name, value } }) {
    const hostForm = { ...this.state.hostForm };
    hostForm[name] = value;
    this.setState({ hostForm });
  }

  onCheckboxChange({ target: { name, checked } }) {
    const hostForm = { ...this.state.hostForm };
    hostForm[name] = checked;
    this.setState({ hostForm });
  }

  createGame() {
    this.props.socket.emit('create_game', this.state.hostForm);
  }

  render() {
    const {
      hostForm: {
        roomName, username, isPrivate, password,
      },
    } = this.state;

    const { history } = this.props;

    return (
      <Fade in tag="div" timeout={500}>
        <main role="main" className="inner loginWelcome-cover">
          <h1 className="loginWelcome-cover-heading">Select a Game Room</h1>
          <Form>
            <FormGroup row>
              <Label for="roomName">Game Room Name</Label>
              <Input
                type="text"
                name="roomName"
                id="roomName"
                onChange={e => this.onInputChange(e)}
                value={roomName}
              />
            </FormGroup>
            <FormGroup row>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                onChange={e => this.onInputChange(e)}
                value={username}
              />
            </FormGroup>
            <FormGroup row>
              <Label check>
                <Input
                  type="checkbox"
                  name="isPrivate"
                  id="isPrivate"
                  onChange={e => this.onCheckboxChange(e)}
                  value={isPrivate}
                />
                Private
              </Label>
            </FormGroup>
            { isPrivate &&
              <FormGroup row>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={e => this.onInputChange(e)}
                  value={password}
                />
              </FormGroup>
            }
          </Form>
          <p className="lead">
            <Button
              outline
              color="success"
              size="lg"
              onClick={() => this.createGame()}
            >
              Create Game
            </Button>
            <Button
              outline
              color="secondary"
              size="lg"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
          </p>
        </main>
      </Fade>
    );
  }
}

Host.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(null)(Host);
