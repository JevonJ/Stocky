import React, { Component } from 'react';
import { Card, CardBody, Button, CardTitle } from 'mdbreact';

import SellShareModal from '../modals/SellSharesModal';

class PurchasedStockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSellStock: null,
    };
  }

  toggleSellModal(sellStockData) {
    const { toggleSellModal } = this.props;
    toggleSellModal();
    this.setState({
      selectedSellStock: sellStockData,
    });
  }

  renderPurchasedStocks(purchasedStocks, index) {
    const { roomStocks } = this.props;
    const stockPriceArr = roomStocks[purchasedStocks.stockSymbol];
    const stockPrice = stockPriceArr[stockPriceArr.length - 1];
    const totalSoldQty = purchasedStocks.soldStockQty.reduce((a, b) => a + b, 0);
    const remainingStocks = purchasedStocks.initStockQty - totalSoldQty;

    if (remainingStocks > 0) {
      return (
        <tr key={purchasedStocks.stockSymbol}>
          <td className="align-middle">{index + 1}</td>
          <td className="align-middle">{purchasedStocks.stockSymbol}</td>
          <td className="align-middle">{remainingStocks}</td>
          <td className="align-middle">{(purchasedStocks.unitPrice).toFixed(2)}</td>
          <td className="align-middle">{stockPrice.toFixed(2)}</td>

          <td>
            <Button
              className="align-middle"
              size="sm"
              color="danger"
              onClick={() => this.toggleSellModal({
                symbol: purchasedStocks.stockSymbol,
                oldPrice: purchasedStocks.unitPrice,
                curPrice: stockPrice,
                avlqty: purchasedStocks.initStockQty,
              })}
            >
              Sell
            </Button>
          </td>
        </tr>
      );
    }

    return null;
  }

  render() {
    const {
      socket, playerStocks, user, sellModalState, roomInfo,
    } = this.props;

    return (
      <Card style={{ minWidth: '27rem', maxWidth: '27rem', marginTop: '1rem' }}>
        <SellShareModal
          isOpen={sellModalState}
          toggle={() => this.toggleSellModal()}
          sellStockData={this.state.selectedSellStock}
          socket={socket}
          user={user}
          playerStocks={playerStocks}
          roomInfo={roomInfo}
        />
        <CardBody>
          <CardTitle>Stocks Purchased</CardTitle>
          <div className="table-responsive" style={{ maxHeight: '27vh', overflow: 'scroll' }}>
            <table className="table table-striped" >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Symbol</th>
                  <th>Qty</th>
                  <th>Value</th>
                  <th>Current</th>
                </tr>
              </thead>
              <tbody>
                {
                  playerStocks[user.name] &&
                  playerStocks[user.name].purchased
                    .map((purchasedStocks, index) => this.renderPurchasedStocks(purchasedStocks, index))
                }
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default PurchasedStockList;
