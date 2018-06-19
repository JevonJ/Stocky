import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, FormGroup, Form, Input } from 'reactstrap';

class SellSharesModal extends Component {
  constructor() {
    super();
    this.state = {
      quantity: "1",
      totalPrice: "0",
      profitLoss: "0",
      isWarnVisible: false,
    };
  }

  onChange({ target: { name, value } }) {
    const { user, sellStockData } = this.props;
    let isWarnVisible = false;
    if (value >= sellStockData.avlqty) {
      value = sellStockData.avlqty;
      isWarnVisible = true;
    };
    let totalPrice = value * sellStockData.curPrice;
    totalPrice = totalPrice.toFixed(2);

    let profitLoss = totalPrice - (value * sellStockData.oldPrice);
    profitLoss = (Math.abs(profitLoss)).toFixed(2);

    this.setState({
      quantity: value,
      totalPrice,
      profitLoss,
      isWarnVisible,
    });
  }

  sellStock() {
    const { user, roomInfo, sellStockData } = this.props;

    const data = {
      room: user.room,
      username: user.name,
      stockSymbol: sellStockData.symbol,
      stockQty: parseInt(this.state.quantity, 10),
      unitPrice: sellStockData.curPrice,
      round: roomInfo[user.room].currentRound,
    };

    this.props.socket.emit('sell_stocks', data); 
    this.closeModal();
  }

  closeModal() {
    this.setState({
      quantity: "1",
      totalPrice: "0",
      profitLoss: "0",
      isWarnVisible: false,
    });
    this.props.toggle();
  }

  render() {
    const { sellStockData } = this.props;
    const { totalPrice, profitLoss, isWarnVisible } = this.state;

    return (
      <Modal id="SellModal" isOpen={this.props.isOpen} toggle={() => this.closeModal()} className={this.props.className}>
        <ModalHeader style={{ color: 'black' }}>You are going to sell</ModalHeader>
        <ModalBody style={{ color: 'black' }} className="mbody" >
          <ListGroup>
            <ListGroupItem>Company Symbol: {sellStockData && sellStockData.symbol}</ListGroupItem>
            <ListGroupItem>
              <FormGroup>
                Number of Stocks
                <Input
                  type="number"
                  name="qauntity"
                  placeholder="Number of Stocks"
                  max={sellStockData && sellStockData.avlqty}
                  min={1}
                  value={this.state.quantity}
                  onChange={(e) => this.onChange(e)}
                />
              </FormGroup>
              {
                isWarnVisible &&
                <p style={{ color: 'red' }}>Sorry! Cannot exceed your available stock quantity.</p>
              }
            </ListGroupItem>
            <ListGroupItem>Price: {sellStockData && (totalPrice === "0" ? (sellStockData.curPrice).toFixed(2) : totalPrice)}</ListGroupItem>
            <ListGroupItem>{sellStockData && sellStockData.curPrice > sellStockData.oldPrice ? "Profit:" : sellStockData && sellStockData.curPrice < sellStockData.oldPrice ? "Loss:" : "Profit/Loss:"} {sellStockData && (totalPrice === "0" ? (Math.abs(sellStockData.curPrice - sellStockData.oldPrice)).toFixed(2) : profitLoss)}</ListGroupItem>
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => this.sellStock()}>Sell</Button>
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
export default connect(mapStateToProps)(SellSharesModal);
