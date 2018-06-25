import React, { Component } from 'react';
import { Button } from 'mdbreact';
import FontAwesome from 'react-fontawesome';

class StockList extends Component {
  renderStocks(stock) {
    const { stockInfo, toggleModal, roomStocks } = this.props;
    const info = stockInfo[stock];
    const pricesArr = roomStocks[stock];

    const lastPrice = pricesArr[pricesArr.length - 2] === undefined ? '--' : (pricesArr[pricesArr.length - 2].toFixed(2));
    const currentPrice = (pricesArr[pricesArr.length - 1]).toFixed(2);

    let color = 'grey';
    let type = 'minus';

    if (pricesArr[pricesArr.length - 2] !== undefined && lastPrice < currentPrice) {
      color = 'green';
      type = 'arrow-up';
    }

    return (
      <tr key={info.stockName}>
        <td className="align-middle">{info.stockName}</td>
        <td className="align-middle">{info.stockSymbol}</td>
        <td className="align-middle">{info.stockSector}</td>
        <td className="align-middle">{lastPrice}</td>
        <td className="align-middle">
          {`${currentPrice} `}
          <FontAwesome
            className="super-crazy-colors"
            name={type}
            size="1x"
            style={{ color }}
          />
        </td>
        <td className="align-middle"><Button size="sm" color="success" onClick={() => toggleModal(stock)}>Buy</Button>{' '}</td>
      </tr>
    );
  }

  render() {
    const { stocks, stockInfo } = this.props;
    return (
      <table class="table table-striped table-responsive-xs">
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
      </table>
    );
  }
}

export default StockList;
