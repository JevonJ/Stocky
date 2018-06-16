import React, { Component } from 'react';
import { Card, CardText, CardTitle, Table } from 'reactstrap';

class PlayerList extends Component {
  static renderPlayers(player, index) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{player.name}</td>
        <td>LKR {player.cash}</td>
      </tr>
    );
  }

  render() {
    const { players } = this.props;

    return (
      <Card body outline color="danger">
        <CardTitle><h5>Room name: Team Titans</h5></CardTitle>
        <CardText>
          <Table borderless>
            <thead>
              <tr>
                <th>Rank </th>
                <th>Name</th>
                <th>Assets</th>
              </tr>
            </thead>
            <tbody>
              {
                players.map((player, index) => PlayerList.renderPlayers(player, index))
              }
            </tbody>
          </Table>
        </CardText>
      </Card>
    );
  }
}

export default PlayerList;
