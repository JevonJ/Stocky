import React, { Component } from 'react';
import { Table, Collapse, Button, Row } from 'reactstrap';

import SellShareModal from '../modals/SellSharesModal';

class PurchasedStockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellModal: false,
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
        <td>{index + 1}</td>
        <td>{purchasedStocks.stockSymbol}</td>
        <td>{remainingStocks}</td>
        <td>{(purchasedStocks.unitPrice).toFixed(2)}</td>
        <td>{stockPrice.toFixed(2)}</td>

        <td>
          <Button
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
  }

  render() {
    const {
      socket, playerStocks, user, isOpen, sellModalState, roomInfo,
    } = this.props;

    return (
      <Row>
        <SellShareModal
          isOpen={sellModalState}
          toggle={() => this.toggleSellModal()}
          sellStockData={this.state.selectedSellStock}
          socket={socket}
          user={user}
          playerStocks={playerStocks}
          roomInfo={roomInfo}
        />
        <Collapse isOpen={isOpen}>
          <Table striped responsive size="sm">
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
          </Table>
        </Collapse>
      </Row>
    );
  }
}

export default PurchasedStockList;
