import React, { Component } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';

class StockChart extends Component {
  getStockObj() {
    const {
      roomStocks, roomInfo, stocks, user,
    } = this.props;

    if (!roomInfo[user.room]) return {};

    const totalRounds = roomInfo[user.room].rounds;

    const stockObj = stocks.map((stock) => {
      const Rounds = {};
      for (let i = 0; i < totalRounds; i++) {
        Rounds[`R${i}`] = roomStocks[stock][i];
      }

      return { name: stock, data: Rounds };
    });
    return stockObj;
  }

  render() {
    const chartData = this.getStockObj();
    return (
      <div className="row">
        <LineChart
          data={chartData || {}}
          id="users-chart"
          colors={['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688',
            '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E']}
          xtitle="Round Number"
          ytitle="Price"
          legend="right"
        />
      </div>
    );
  }
}

export default StockChart;
