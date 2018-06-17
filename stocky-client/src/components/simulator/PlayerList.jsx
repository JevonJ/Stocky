import React, { Component } from 'react';
import { Card, CardText, CardTitle, Table } from 'reactstrap';

class PlayerList extends Component {
  static calculatePurchased(stocks) {
    const sum = stocks.reduce((total, stock) => {
      if (stock.initStockQty === 0) {
        return total;
      }
      const remainingStocks = (stock.initStockQty - stock.soldStockQty.reduce((a, b) => a + b, 0));

      return total + (stock.unitPrice * remainingStocks);
    }, 0);

    return sum;
  }

  static sortPlayers(a, b) {
    const asset1 = a.totalAssets;
    const asset2 = b.totalAssets;

    let comparison = 0;
    if (asset1 > asset2) {
      comparison = 1;
    } else if (asset1 < asset2) {
      comparison = -1;
    }
    return comparison * -1;
  }

  static renderPlayers(player, index) {
    return (
      <tr key={player.name}>
        <td>{index + 1}</td>
        <td>{player.name}</td>
        <td>LKR {player.totalAssets}</td>
      </tr>
    );
  }

  calculateAssetsAndSort(players) {
    const { playerStocks } = this.props;

    const newPlayersObj = players.map((player) => {
      const stocks = [...playerStocks[player.name].purchased];
      const totalAssets = (PlayerList.calculatePurchased(stocks) + player.cash);
      return { totalAssets, ...player };
    });

    return newPlayersObj;
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
                this.calculateAssetsAndSort(players)
                .map((player, index) => PlayerList.renderPlayers(player, index))
              }
            </tbody>
          </Table>
        </CardText>
      </Card>
    );
  }
}

export default PlayerList;
