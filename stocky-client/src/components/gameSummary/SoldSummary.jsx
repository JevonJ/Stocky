import React, { Component } from 'react';
import { Table} from 'reactstrap';


class SoldSummary extends Component {
  renderSoldStocks(soldStock) {
    const totalQty = soldStock.stockQty.reduce((a, b) => a + b, 0);
    return (
      <tr key={soldStock.stockSymbol}>
        <th>{soldStock.stockSymbol}</th>
        <td>{soldStock.round}</td>
        <td>LKR {soldStock.unitPrice}</td>
        <td>{totalQty}</td>
      </tr>
    );
  }

  render() {
    const { playerStocks, user } = this.props;
    return (
      <Table dark striped>
        <thead>
          <tr>
          <th>Symbol</th>
            <th>Round</th>
            <th>Unit Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {
            playerStocks[user.name] &&
            playerStocks[user.name].sold
              .map((soldStock, index) => this.renderSoldStocks(soldStock, index))
          }
        </tbody>
      </Table>
    );
  }
}

export default SoldSummary;