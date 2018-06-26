import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'mdbreact';

class SoldStockList extends Component {
  static renderSoldStocks(soldStocks, index) {
    const totalQty = soldStocks.stockQty.reduce((a, b) => a + b, 0);
    return (
      <tr key={soldStocks.stockSymbol}>
        <td>{index + 1}</td>
        <td style={{ textAlign: 'center' }}>{soldStocks.round}</td>
        <td>{soldStocks.stockSymbol}</td>
        <td>{totalQty}</td>
        <td>{(soldStocks.unitPrice).toFixed(2)}</td>
      </tr>
    );
  }


  render() {
    const { playerStocks, user } = this.props;

    return (
      <Card style={{ minWidth: '27rem', maxWidth: '27rem' }}>
        <CardBody>
          <CardTitle>Stocks Sold</CardTitle>
          <div className="table-responsive" style={{ maxHeight: '27vh', overflow: 'scroll' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Round</th>
                  <th>Symbol</th>
                  <th>Qty</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {
                  playerStocks[user.name] &&
                  playerStocks[user.name].sold
                    .map((soldStocks, index) => SoldStockList.renderSoldStocks(soldStocks, index))
                }
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default SoldStockList;
