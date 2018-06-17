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
    const { stockData } = this.props;
    let isWarnVisible = false;
    if (value > this.validateNofStocks()) {
      value = this.validateNofStocks();
      isWarnVisible = true;
    }
    let totalPrice = value * stockData.uPrice;
    totalPrice = totalPrice.toFixed(2);

    this.setState({
      quantity: value,
      totalPrice,
      isWarnVisible,
    });
  }

  validateNofStocks() {
    const { user, stockData } = this.props;
    const nos = Math.trunc(user.cash / stockData.uPrice);
    return (nos);
  }

  buyStock() {
    const { user, roomInfo, stockData } = this.props;
    const { room, name, cash } = user;
    const data = {
      room,
      username: name,
      currentCashInHand: cash,
      stockSymbol: stockData.symbol,
      initStockQty: parseInt(this.state.quantity, 10),
      unitPrice: parseInt(stockData.uPrice, 10),
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
    const { stockData } = this.props;
    const { totalPrice, isWarnVisible } = this.state;

    return (
      <Modal
        id="BuyModal"
        isOpen={this.props.isOpen}
        toggle={() => this.closeModal()}
        className={this.props.className}
      >
        <ModalHeader style={{ color: 'black' }} >You are going to buy</ModalHeader>
        <ModalBody style={{ color: 'black' }} className="mbody" >
          <ListGroup>
            <ListGroupItem>Company Symbol: {stockData && stockData.symbol}</ListGroupItem>
            <ListGroupItem>Unit Price: {stockData && stockData.uPrice}</ListGroupItem>
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
            <ListGroupItem>Price: {stockData && (totalPrice === '0' ? stockData.uPrice : totalPrice)}</ListGroupItem>
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
