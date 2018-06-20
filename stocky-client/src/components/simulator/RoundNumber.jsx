import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

class RoundNumber extends Component {
  render() {
    const { roomInfo, user } = this.props;
    return (
      <Card body outline color="primary">
        <CardTitle>RoundNumber</CardTitle>
        <CardText>{roomInfo[user.room].currentRound} / {roomInfo[user.room].rounds}</CardText>
      </Card>
    );
  }
}

export default RoundNumber;
