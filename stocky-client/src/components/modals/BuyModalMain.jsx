import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, FormGroup, Input } from 'reactstrap';

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
    const { stock, roomStocks } = this.props;
    const stockDataArr = roomStocks[stock];
    let isWarnVisible = false;
    if (value > this.validateNofStocks()) {
      value = this.validateNofStocks();
      isWarnVisible = true;
    }
    let totalPrice = value * stockDataArr[stockDataArr.length - 1];
    totalPrice = totalPrice.toFixed(2);

    this.setState({
      quantity: value,
      totalPrice,
      isWarnVisible,
    });
  }

  validateNofStocks() {
    const { user, stock, roomStocks } = this.props;
    const stockDataArr = roomStocks[stock];
    const nos = Math.trunc(user.cash / stockDataArr[stockDataArr.length - 1]);
    return (nos);
  }

  buyStock() {
    const {
      user, stock, roomStocks, roomInfo,
    } = this.props;
    const stockDataArr = roomStocks[stock];
    const { room, name, cash } = user;
    const data = {
      room,
      username: name,
      currentCashInHand: cash,
      stockSymbol: stock,
      initStockQty: parseInt(this.state.quantity, 10),
      unitPrice: parseFloat(stockDataArr[stockDataArr.length - 1]),
      round: roomInfo[room].currentRound + 1,
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
    const { stock, roomStocks } = this.props;
    const { totalPrice, isWarnVisible } = this.state;
    const stockDataArr = roomStocks[stock];

    return (
      <Modal
        id="BuyModal"
        isOpen={this.props.isOpen}
        toggle={() => this.closeModal()}
      >
        <ModalHeader style={{ color: 'black' }} >You are going to buy</ModalHeader>
        <ModalBody style={{ color: 'black' }} className="mbody" >
          <ListGroup>
            <ListGroupItem>Company Symbol: {stock}</ListGroupItem>
            <ListGroupItem>Unit Price: {stockDataArr && stockDataArr[stockDataArr.length - 1]}</ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                Number of Stocks
                  <Input
                    type="number"
                    name="qauntity"
                    placeholder="Number of Stocks"
                    max={stockDataArr && this.validateNofStocks()}
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
            <ListGroupItem>Price: {stockDataArr && (totalPrice === '0' ? stockDataArr[stockDataArr.length - 1] : totalPrice)}</ListGroupItem>
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

export default BuyModalMain;
