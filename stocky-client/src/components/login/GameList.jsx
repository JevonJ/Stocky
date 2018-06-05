import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fade, Form, FormGroup, Input } from 'reactstrap';

class GameList extends Component {
  static renderGameList(room) {
    return (
      <option key={room}>{room}</option>
    );
  }

  render() {
    const { rooms, history } = this.props;

    return (
      <Fade in tag="div" timeout={500}>
        <main role="main" className="inner loginWelcome-cover">
          <h1 className="loginWelcome-cover-heading">Select a Game Room</h1>
          <Form>
            <FormGroup>
              <Input type="select" name="selectMulti" id="selectgame" multiple bsSize="lg">
                {
                  rooms.map(room => GameList.renderGameList(room))
                }
              </Input>
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
