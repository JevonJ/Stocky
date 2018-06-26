import React, { Component } from 'react';
import { Table, Collapse, Row } from 'reactstrap';

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
    const { playerStocks, user, isOpen } = this.props;

    return (

      <Row>
        <Collapse isOpen={isOpen}>
          <Table striped responsive size="sm">
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
          </Table>
        </Collapse>
      </Row>
    );
  }
}

export default SoldStockList;
