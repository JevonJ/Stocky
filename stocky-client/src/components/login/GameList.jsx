import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon, FormFeedback } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

class GameList extends Component {
  static renderGameList(room) {
    return (
      <option key={room}>{room}</option>
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
      roomError:'',
    };
  }

  onInputChange({ target: { name, value } }) {
    const newState = { ...this.state };
    newState[name] = value.replace(/\s/g, '');
    if (name === 'username') {
      const { players } = this.props;
      console.log('PLAYEEERS', players);
      const playerExist = players.filter((player) => {
        return value === player.name;
        //usernameError: playerExist.length !== 0 ? 'exits' : '';
        //console.log(usernameError);
      });
      //this.setState({
      //  usernameError: playerExist.length !== 0 ? 'exits' : '',
      //});
      this.setState(newState);
      console.log('EXISSSSSTTTSSS', playerExist.length);
    }
  }

  changeVisibility() {
    this.setState({
      visibility: !this.state.visibility,
    });
  }

  onSelectChange({ target: { value } }) {
    this.props.socket.emit('get_players', value);
    this.setState({
      selectedRoom: [value],
    });  
  }

  joinGame(e) {
    const {
      selectedRoom, username, password, usernameError, passwordError, roomError
    } = this.state;

    if (username.length === 0) {
      this.setState({
        usernameError:'Please enter valid username.',
      });
      return;
    }

    if (selectedRoom.length === 0) {
      this.setState({
        roomError:'Please select a room.',
      });
      return;
    }

    const {
      roomInfo
    } = this.props;
    if (roomInfo[selectedRoom[0]].isPrivate && (roomInfo[selectedRoom[0]].password !== password) && password.length === 0) {
      this.setState({
        passwordError: 'Please enter valid group password.',
      });
      return;
    }

    const data = {
      room: selectedRoom[0],
      username, 
      password,
      usernameError,
      passwordError,
      roomError,
    };

    if (usernameError === '' && roomError === '') {
      e.target.setAttribute('disabled', 'disabled');
      this.props.socket.emit('join_room', data);
    }
  }

  renderPasswordField() {
    const { selectedRoom, passwordError } = this.state;
    const { roomInfo } = this.props;

    if (!selectedRoom[0]) return null;

    const room = roomInfo[selectedRoom[0]];
    if (room.isPrivate) {
      return (
        <FormGroup row>
          <Label for="password">Password</Label>
          <InputGroup>
            <Input type={this.state.visibility ? 'text' : 'password'}
              invalid={passwordError !== ''}
              name="password"
              id="password"
              value={this.state.password}
              autoComplete="password"
              onChange={e => this.onInputChange(e)} />
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={() => this.changeVisibility()}>visibility (o)</Button>
            </InputGroupAddon>
          </InputGroup>
          <FormFeedback>{passwordError}</FormFeedback>
        </FormGroup>
      );
    }
  }

  render() {

    const {
      selectedRoom, username, password, usernameError, roomError
    } = this.state;

    const { rooms, history, socket } = this.props;
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCc', this.state);
    return (
      <Fade in tag="div" timeout={200}>
        <main role="main" className="inner loginWelcome-cover">
          <h1 className="loginWelcome-cover-heading">Select a Game Room</h1>
          <Form>
            <FormGroup>
              <Input type="select"
                invalid={roomError !== ''}
                name="roomName"
                id="selectgame"
                multiple
                value={selectedRoom[0]}
                bsSize="lg"
                onChange={e => this.onSelectChange(e)}>
                {
                  rooms.map(room => GameList.renderGameList(room))
                }
              </Input>
              <FormFeedback>{roomError}</FormFeedback>
            </FormGroup>
            <FormGroup row>
              <Label for="username">Username</Label>
              <Input type="text"
                invalid={usernameError !== ''}
                valid={username.length > 0 ? !usernameError : false}
                name="username"
                id="username"
                value={this.state.username}
                onChange={e => this.onInputChange(e)} />
              <FormFeedback>{usernameError}</FormFeedback>
            </FormGroup>
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

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms,
    roomInfo: state.roomInfo,
    players: state.players,
  };
};

export default connect(mapStateToProps)(GameList);