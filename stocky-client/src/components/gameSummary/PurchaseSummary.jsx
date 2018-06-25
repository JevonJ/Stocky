import React, { Component } from 'react';
import { Table } from 'reactstrap';

class PurchaseSummary extends Component {
  renderPurchasedStocks(purchasedStock) {
    return (
      <tr key={purchasedStock.stockSymbol}>
        <th>{purchasedStock.stockSymbol}</th>
        <td>{purchasedStock.round}</td>
        <td>LKR {purchasedStock.unitPrice}</td>
        <td>{purchasedStock.initStockQty}</td>
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
            playerStocks[user.name].purchased
              .map((purchasedStock, index) => this.renderPurchasedStocks(purchasedStock, index))
          }
        </tbody>
      </Table>
    );
  }
}

export default PurchaseSummary;