import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon } from 'reactstrap';
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
      username: 'jevon',
      password: '',
      visibility: false,
      selectedRoom: '',
    };
  }

  onInputChange({ target: { name, value } }) {
    console.log('DDDDDDD');
    const newState = { ...this.state };
    newState[name] = value;
    this.setState(newState);
  }

  changeVisibility() {
    this.setState({
      visibility: !this.state.visibility,
    });
  }

  onSelectChange({ target: { value } }) {
    this.setState({
      selectedRoom: [value],
    });  
  }

  renderPasswordField() {
    const { selectedRoom } = this.state;
    const { roomInfo } = this.props;

    if (!selectedRoom) return null;

    const room = roomInfo[selectedRoom];
    console.log('AAAAAAAAAAAAAAAAAAAAA', room);
    if (room.isPrivate) {
      return (
        <FormGroup row>
          <Label for="password">Password</Label>
          <InputGroup>
            <Input type={this.state.visibility ? 'text' : 'password'} name="password" id="password" />
            <InputGroupAddon addonType="append">
              <Button color="secondary" onClick={() => this.changeVisibility()}>To the Right!</Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      );
    }
  }

  render() {
    const { rooms, history } = this.props;

    return (
      <Fade in tag="div" timeout={500}>
        <main role="main" className="inner loginWelcome-cover">
          <h1 className="loginWelcome-cover-heading">Select a Game Room</h1>
          <Form>
            <FormGroup>
              <Input type="select" name="roomName" id="selectgame" multiple value={this.state.selectedRoom} bsSize="lg" onChange={e => this.onSelectChange(e)}>
                {
                  rooms.map(room => GameList.renderGameList(room))
                }
              </Input>
            </FormGroup>
            <FormGroup row>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username" value={this.state.username} onChange={e => this.onInputChange(e)} />
            </FormGroup>
            {this.renderPasswordField()}
          </Form>
          <p className="lead">
            <Button
              outline
              color="success"
              size="lg"
              onClick={() => history.push('/password')}
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
  };
};

export default connect(mapStateToProps)(GameList);