import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Label, Input, FormFeedback, InputGroup, InputGroupAddon, CustomInput } from 'reactstrap';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import './Host.css';

class Host extends Component {
  constructor() {
    super();

    this.state = {
      hostForm: {
        room: '',
        username: '',
        isPrivate: false,
        password: '',
        rounds: 15,
      },
      visibility: false,
      roomNameError: '',
      userNameError: '',
      passwordError: '',
      roundsError: '',
    };
  }

  onInputChange({ target: { name, value } }) {
    const hostForm = { ...this.state.hostForm };
    hostForm[name] = value.replace(/\s/g, '');

    if (name === 'room') {
      const { rooms } = this.props;
      const roomTaken = !(rooms.indexOf(value) < 0);
      this.setState({
        hostForm,
        roomNameError: roomTaken ? 'That name is already taken..' : '',
      });
    }

    this.setState({ hostForm });
  }

  onCheckboxChange({ target: { name, checked } }) {
    const hostForm = { ...this.state.hostForm };
    hostForm[name] = checked;
    this.setState({ hostForm });
  }

  createGame(e) {
    const { hostForm, roomNameError } = this.state;

    if (hostForm.room.length === 0) {
      this.setState({
        roomNameError: 'Please enter a valid room name.',
      });
      return;
    }

    if (hostForm.username.length === 0) {
      this.setState({
        userNameError: 'Please enter a valid user name.',
      });
      return;
    }

    if (hostForm.rounds.length === 0) {
      this.setState({
        roundsError: 'Please enter number of rounds you want to play',
      });
      return;
    }

    if (hostForm.rounds < 15) {
      this.setState({
        roundsError: 'Rounds should be higher than 15',
      });
      return;
    }

    if (hostForm.isPrivate && hostForm.password.length === 0) {
      this.setState({
        passwordError: 'Please enter a password.',
      });
      return;
    }

    if (roomNameError === '') {
      e.target.setAttribute('disabled', 'disabled');
      this.props.socket.emit('create_game', this.state.hostForm);
    }
  }

  changeVisibility() {
    this.setState({
      visibility: !this.state.visibility,
    });
  }

  render() {
    const {
      hostForm: {
        rounds, room, username, isPrivate, password,
      },
      roomNameError,
      userNameError,
      passwordError,
      roundsError,
    } = this.state;
    const { history } = this.props;
    return (
      <Fade in tag="div" timeout={500}>
        <main role="main" className="inner loginHost-cover">
          <h1 className="loginHost-cover-heading">Host A Game</h1>
          <Form>
            <FormGroup row>
              <Label for="room">Game Room Name</Label>
              <Input
                invalid={roomNameError !== ''}
                valid={room.length > 0 ? !roomNameError : false}
                type="text"
                name="room"
                id="room"
                autoComplete="off"
                onChange={e => this.onInputChange(e)}
                value={room}
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
              <FormFeedback>{roomNameError}</FormFeedback>
            </FormGroup>
            <FormGroup row>
              <Label for="username">User name</Label>
              <Input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                invalid={userNameError !== ''}
                onChange={e => this.onInputChange(e)}
                value={username}
              />
              <FormFeedback>{userNameError}</FormFeedback>
            </FormGroup>
            <FormGroup row>
              <Label for="rounds">Number of Rounds</Label>
              <Input
                type="number"
                name="rounds"
                id="rounds"
                autoComplete="off"
                invalid={roundsError !== ''}
                max={50}
                min={15}
                onChange={e => this.onInputChange(e)}
                value={rounds}
              />
              <FormFeedback>{roundsError}</FormFeedback>
            </FormGroup>
            <FormGroup row>
              <CustomInput
                type="checkbox"
                name="isPrivate"
                id="isPrivate"
                label="Private Game"
                onChange={e => this.onCheckboxChange(e)}
                value={isPrivate}
              />
            </FormGroup>
            { isPrivate &&
              <FormGroup row>
                <Label for="password">Password</Label>
                <InputGroup>
                  <Input
                    type={this.state.visibility ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={password}
                    invalid={passwordError !== ''}
                    autoComplete="password"
                    onChange={e => this.onInputChange(e)}
                  />

                  <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={() => this.changeVisibility()}>
                      <FontAwesome
                        className="super-crazy-colors"
                        name={this.state.visibility ? 'eye' : 'eye-slash'}
                        size="2x"
                      />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <FormFeedback>{passwordError}</FormFeedback>
              </FormGroup>
            }
          </Form>
          <p className="lead">
            <Button
              outline
              color="success"
              size="lg"
              onClick={e => this.createGame(e)}
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
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ rooms }) => ({
  rooms,
});

export default connect(mapStateToProps)(Host);
