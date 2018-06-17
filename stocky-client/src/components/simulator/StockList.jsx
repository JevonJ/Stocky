import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

class StockList extends Component {
  renderStocks(stock) {
    const { stockInfo, toggleModal } = this.props;
    const info = stockInfo[stock];

    return (
      <tr key={info.stockName}>
        <td>{info.stockName}</td>
        <td>{info.stockSymbol}</td>
        <td>Financial</td>
        <td>{info.previousPrice}</td>
        <td>{info.currentPrice}</td>
        <td><Button color="success" onClick={() => toggleModal(stock)}>Buy</Button>{' '}</td>
      </tr>
    );
  }

  render() {
    const { stocks, stockInfo } = this.props;
    return (
      <div className="table-responsive">
        <Table striped responive size="sm">
          <thead>
            <tr>
              <th>Company name</th>
              <th>Symbol</th>
              <th>Sector</th>
              <th>Last</th>
              <th>Current</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              stocks &&
              (Object.keys(stockInfo).length !== 0) &&
              stocks.map(stock => this.renderStocks(stock))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default StockList;
