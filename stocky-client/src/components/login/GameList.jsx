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
    };
  }

  onInputChange({ target: { name, value } }) {
    console.log(name, value);
    const newState = { ...this.state };
    newState[name] = value;
    this.setState(newState);
  }

  changeVisibility() {
    this.setState({
      visibility: !this.state.visibility,
    });
  }

  render() {
    const { rooms, history } = this.props;

    return (
      <Fade in tag="div" timeout={500}>
        <main role="main" className="inner loginWelcome-cover">
          <h1 className="loginWelcome-cover-heading">Select a Game Room</h1>
          <Form>
            <FormGroup>
              <Input type="select" name="roomName" id="selectgame" multiple bsSize="lg" value={this.state.roomName} onChange={e => this.onInputChange(e)}>
                {
                  rooms.map(room => GameList.renderGameList(room))
                }
              </Input>
            </FormGroup>
            <FormGroup row>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username" value={this.state.username} onChange={e => this.onInputChange(e)} />
            </FormGroup>
            <FormGroup row>
              <Label for="password">Password</Label>
              <InputGroup>
                <Input type={this.state.visibility ? 'text' : 'password'} name="password" id="password" />
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
            </FormGroup>
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
