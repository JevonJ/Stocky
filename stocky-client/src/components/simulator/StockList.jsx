import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';

class StockList extends Component {
  renderStocks(stock) {
    const { stockInfo, toggleModal, roomStocks } = this.props;
    const info = stockInfo[stock];
    const pricesArr = roomStocks[stock];

    return (
      <tr key={info.stockName}>
        <td>{info.stockName}</td>
        <td>{info.stockSymbol}</td>
        <td>{info.stockSector}</td>
        <td>{pricesArr[pricesArr.length - 2] ? pricesArr[pricesArr.length - 1].toFixed(2) : '--'}</td>
        <td>{(pricesArr[pricesArr.length - 1]).toFixed(2)}</td>
        <td><Button color="success" onClick={() => toggleModal(stock)}>Buy</Button>{' '}</td>
      </tr>
    );
  }

  render() {
    const { stocks, stockInfo } = this.props;
    return (
      <Table striped responsive size="xs">
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
    );
  }
}

export default StockList;
