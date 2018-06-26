import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

class PlayerList extends Component {
  calculatePurchased(stocks) {
    const { roomStocks } = this.props;

    const sum = stocks.reduce((total, stock) => {
      if (stock.initStockQty === 0) {
        return total;
      }
      const remainingStocks = (stock.initStockQty - stock.soldStockQty.reduce((a, b) => a + b, 0));
      const stockPriceArr = roomStocks[stock.stockSymbol];
      const stockPrice = stockPriceArr[stockPriceArr.length - 1];

      return total + (stockPrice * remainingStocks);
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
        <td>LKR {(player.totalAssets).toFixed(2)}</td>
      </tr>
    );
  }

  calculateAssetsAndSort(players) {
    const { playerStocks } = this.props;

    const newPlayersObj = players.map((player) => {
      const stocks = playerStocks[player.name].purchased;
      const totalAssets = (this.calculatePurchased(stocks) + player.cash);
      return { totalAssets, ...player };
    });

    return newPlayersObj;
  }

  render() {
    const { players } = this.props;

    return (
      <Card body outline color="danger">
        <CardTitle>Room name: Team Titans</CardTitle>
        <CardBody>
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
        </CardBody>
      </Card>
    );
  }
}

export default PlayerList;
