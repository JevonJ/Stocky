import React, { Component } from 'react';
import { Card, CardText, Table, Collapse, Button, Row } from 'reactstrap';

import SellShareModal from '../modals/SellSharesModal';

class PurchasedStockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellModal: false,
        };
    }

    toggleSellModal(sellStockData) {
        this.setState({
            sellModal: !this.state.sellModal,
            selectedSellStock: sellStockData,
        });
    }

    renderPurchasedStocks(purchasedStocks, index) {
        const {roomStocks} = this.props;
        const stockPrice = roomStocks[purchasedStocks.stockSymbol].currentPrice;
        return (
          <tr key={purchasedStocks.stockSymbol}>
            <td>{index + 1}</td>
            <td>{purchasedStocks.stockSymbol}</td>
            <td>{purchasedStocks.initStockQty}</td>
            <td>{purchasedStocks.unitPrice}</td>
            <td>{stockPrice}</td>

            <td><Button
                color="danger"
                onClick={() => this.toggleSellModal({
                symbol: purchasedStocks.stockSymbol,
                oldPrice: purchasedStocks.unitPrice,
                curPrice: stockPrice,
                avlqty: purchasedStocks.initStockQty,
                })}
                >Sell
                </Button>{' '}
            </td>
          </tr>
        );
      }

    render() {
        const { socket, playerStocks, user } = this.props;

        return (
            <Row>
                <SellShareModal
                    isOpen={this.state.sellModal}
                    toggle={() => this.toggleSellModal()}
                    sellStockData={this.state.selectedSellStock}
                    socket={socket}
                />
                <Collapse isOpen={this.props.isOpen}>
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