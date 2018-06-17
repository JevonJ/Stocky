import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, FormGroup, Form, Input } from 'reactstrap';

class BuyModalMain extends Component {
  constructor() {
    super();
    this.state = {
      quantity: '1',
      totalPrice: '0',
      isWarnVisible: false,
    };
  }

  onChange({ target: { name, value } }) {
    const { stock, stockInfo } = this.props;
    const stockData = stockInfo[stock];
    let isWarnVisible = false;
    if (value > this.validateNofStocks()) {
      value = this.validateNofStocks();
      isWarnVisible = true;
    }
    let totalPrice = value * stockData.currentPrice;
    totalPrice = totalPrice.toFixed(2);

    this.setState({
      quantity: value,
      totalPrice,
      isWarnVisible,
    });
  }

  validateNofStocks() {
    const { user, stock, stockInfo } = this.props;
    const stockData = stockInfo[stock];
    const nos = Math.trunc(user.cash / stockData.currentPrice);
    return (nos);
  }

  buyStock() {
    const {
      user, roomInfo, stock, stockInfo,
    } = this.props;
    const stockData = stockInfo[stock];

    const { room, name, cash } = user;
    const data = {
      room,
      username: name,
      currentCashInHand: cash,
      stockSymbol: stockData.stockSymbol,
      initStockQty: parseInt(this.state.quantity, 10),
      unitPrice: parseInt(stockData.currentPrice, 10),
      round: roomInfo[room].currentRound,
    };

    this.props.socket.emit('purchase_stocks', data);
    this.closeModal();
  }

  closeModal() {
    this.setState({
      quantity: '1',
      totalPrice: '0',
      isWarnVisible: false,
    });
    this.props.toggle();
  }

  render() {
    const { stock, stockInfo } = this.props;
    const { totalPrice, isWarnVisible } = this.state;
    const stockData = stockInfo[stock];

    return (
      <Modal
        id="BuyModal"
        isOpen={this.props.isOpen}
        toggle={() => this.closeModal()}
      >
        <ModalHeader style={{ color: 'black' }} >You are going to buy</ModalHeader>
        <ModalBody style={{ color: 'black' }} className="mbody" >
          <ListGroup>
            <ListGroupItem>Company Symbol: {stockData && stockData.stockSymbol}</ListGroupItem>
            <ListGroupItem>Unit Price: {stockData && stockData.currentPrice}</ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                Number of Stocks
                  <Input
                    type="number"
                    name="qauntity"
                    placeholder="Number of Stocks"
                    max={stockData && this.validateNofStocks()}
                    min={1}
                    value={this.state.quantity}
                    onChange={e => this.onChange(e)}
                  />
              </FormGroup>
              {
                isWarnVisible &&
                <p style={{ color: 'red' }}>Sorry! This is the maximum stocks which you can buy with your remaining cash.</p>
              }
            </ListGroupItem>
            <ListGroupItem>Price: {stockData && (totalPrice === '0' ? stockData.currentPrice : totalPrice)}</ListGroupItem>
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => this.buyStock()}>Buy</Button>
          <Button color="danger " onClick={() => this.closeModal()}>Not interested</Button>
        </ModalFooter>
      </Modal>
    );
  }
}


const mapStateToProps = ({ user, roomInfo, playerStocks }) => ({
  user,
  roomInfo,
  playerStocks,
});

export default connect(mapStateToProps)(BuyModalMain);
