import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Button, Fade, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';

class GameList extends Component {
  static renderGameList(room) {
    return (
      <option key={room} value={room}>{room}</option>
    );
  }

  constructor() {
    super();

    this.state = {
      roomName: '',
      username: '',
      password: '',
      visibility: false,
      selectedRoom: [],
      usernameError: '',
      passwordError: '',
      roomError: '',
    };
  }

  onInputChange({ target: { name, value } }) {
    const newState = { ...this.state };
    newState[name] = value.replace(/\s/g, '');
    if (name === 'username') {
      const { players } = this.props;
      const playerExist = players.filter(player => value === player.name);

      this.setState({
        ...newState,
        usernameError: playerExist.length === 0 ? '' : 'Username Taken..',
      });
    } else {
      this.setState(newState);
    }
  }

  onSelectChange({ target: { value } }) {
    this.props.socket.emit('get_players', value);
    this.setState({
      selectedRoom: [value],
    });
  }

  changeVisibility() {
    this.setState({
      visibility: !this.state.visibility,
    });
  }

  joinGame(e) {
    const {
      selectedRoom, username, password, usernameError,
    } = this.state;

    if (username.length === 0) {
      this.setState({
        usernameError: 'Please enter valid username.',
      });
      return;
    }

    if (selectedRoom.length === 0) {
      this.setState({
        roomError: 'Please select a room.',
      });
      return;
    }

    const { roomInfo } = this.props;
    if (roomInfo[selectedRoom[0]].isPrivate &&
      ((roomInfo[selectedRoom[0]].password !== password) ||
        password.length === 0)) {
      this.setState({
        passwordError: 'Please enter valid group password.',
      });
      return;
    }
    if (roomInfo[selectedRoom[0]].isStarted) {
      this.setState({
        roomError: 'This room has started.',
      });
      return;
    }

    const data = {
      room: selectedRoom[0],
      username,
      password,
    };

    if (usernameError === '') {
      e.target.setAttribute('disabled', 'disabled');
      this.props.socket.emit('join_room', data);
    }
  }

  renderUsernameField() {

    const { selectedRoom, usernameError, username } = this.state;

    if (!selectedRoom[0]) return null;
    return (
    <FormGroup row>
      <Label for="username">Username</Label>
      <Input
        type="text"
        invalid={usernameError !== ''}
        valid={username.length > 0 ? !usernameError : false}
        name="username"
        id="username"
        value={this.state.username}
        onChange={e => this.onInputChange(e)}
      />
      <FormFeedback valid>Sweet! that name is available</FormFeedback>
      <FormFeedback>{usernameError}</FormFeedback>
    </FormGroup>
    );
  }

  renderPasswordField() {
    const { selectedRoom, passwordError, password } = this.state;
    const { roomInfo } = this.props;

    if (!selectedRoom[0]) return null;

    const room = roomInfo[selectedRoom[0]];
    if (!room.isPrivate) {
      return null;
    }

    return (
      <FormGroup row>
        <div className="md-form input-group">
          <input
            className="form-control"
            placeholder="Enter a Password"
            type={this.state.visibility ? 'text' : 'password'}
            name="password"
            id="password"
            value={password}
            invalid={passwordError ? 1 : 0}
            autoComplete="password"
            onChange={e => this.onInputChange(e)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-mdb-color waves-effect m-0"
              type="button"
              onClick={(e) => this.changeVisibility(e)}
            >
              <FontAwesome
                className="super-crazy-colors"
                name={this.state.visibility ? 'eye' : 'eye-slash'}
                size="2x"
              />
            </button>
          </div>
        </div>
      </FormGroup>
    );
  }

  render() {
    const {
      selectedRoom, roomError,
    } = this.state;

    const { rooms, history } = this.props;

    return (
      <Fade in tag="div" timeout={200}>
        <main role="main" className="inner loginWelcome-cover">
          <h1 className="loginWelcome-cover-heading">Select a Game Room</h1>
          <Form>
            <FormGroup>
              <Input
                type="select"
                invalid={roomError !== ''}
                name="roomName"
                id="selectgame"
                value={selectedRoom}
                multiple
                bsSize="lg"
                onChange={e => this.onSelectChange(e)}
              >
                {
                  rooms.map(room => GameList.renderGameList(room))
                }
              </Input>
              <FormFeedback>{roomError}</FormFeedback>
            </FormGroup>
            {this.renderUsernameField()}
            
            {this.renderPasswordField()}
          </Form>
          <p className="lead">
            <Button
              outline
              color="success"
              size="lg"
              onClick={e => this.joinGame(e)}
            >
              Join Game
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

const mapStateToProps = state => ({
  rooms: state.rooms,
  roomInfo: state.roomInfo,
  players: state.players,
});

export default connect(mapStateToProps)(GameList);
