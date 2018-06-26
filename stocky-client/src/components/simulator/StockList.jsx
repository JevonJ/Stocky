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

    let color = '#455A64';
    let type = 'minus';

    if (pricesArr[pricesArr.length - 2] !== undefined && lastPrice < currentPrice) {
      color = '#76FF03';
      type = 'arrow-up';
    }

    return (
      <tr key={info.stockName}>
        <td style={{'width':'35%'}}>{info.stockName}</td>
        <td style={{'width':'12%'}}>{info.stockSymbol}</td>
        <td style={{'width':'15%'}}>{info.stockSector}</td>
        <td style={{'width':'12%'}}>{lastPrice}</td>
        <td style={{'width':'12%'}}>
          {`${currentPrice} `}
          <FontAwesome
            className="super-crazy-colors"
            name={type}
            size="1x"
            style={{ color }}
          />
        </td>
        <td  style={{'width':'12%'}}><Button color="success" onClick={() => toggleModal(stock)}>Buy</Button></td>
      </tr>
    );
  }

  render() {
    const { stocks, stockInfo } = this.props;
    return (
  <table class="table table-striped table-responsive-xs">
        <thead style={{ 'display': 'block'}}>
          <tr>
            <th style={{'width':'35%'}}>Company name</th>
            <th style={{'width':'12%'}}>Symbol</th>
            <th style={{'width':'15%'}}>Sector</th>
            <th style={{'width':'12%'}}>Last</th>
            <th style={{'width':'12%'}}>Current</th>
            <th style={{'width':'12%'}}></th>
          </tr>
        </thead>
        <tbody style={{'height': '600px', 'overflow-x': 'hidden','overflow-y':'scroll', 'display': 'block'}}>
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
