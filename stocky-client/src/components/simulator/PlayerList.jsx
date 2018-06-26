import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'mdbreact';

class PlayerList extends Component {
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
        <td>{`LKR.${(player.totalAssets).toFixed(2)}`}</td>
      </tr>
    );
  }

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

  calculateAssetsAndSort(players) {
    const { playerStocks } = this.props;

    const newPlayersObj = players.map((player) => {
      const stocks = playerStocks[player.name].purchased;
      const totalAssets = (this.calculatePurchased(stocks) + player.cash);
      return { totalAssets, ...player };
    });

    return newPlayersObj.sort((a, b) => PlayerList.sortPlayers(a, b));
  }

  render() {
    const { players, user } = this.props;

    return (
      <Card style={{ minWidth: '20rem', maxHeight: '10rem' }}>
        <CardBody>
          <CardTitle>Room name: {user.room}</CardTitle>
          <div className="table-responsive" style={{ maxHeight: '5rem', overflow: 'scroll' }}>
            <table className="table-borderless">
              <thead>
                <tr>
                  <th>Rank </th>
                  <th>Name </th>
                  <th>Assets</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td />
                  <td />
                  <td />
                </tr>
                {
                  this.calculateAssetsAndSort(players)
                    .map((player, index) => PlayerList.renderPlayers(player, index))
                }
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default PlayerList;
