import React, { Component } from 'react';
import { Button } from 'mdbreact';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import PurchaseSummary from '../gameSummary/PurchaseSummary';
import SoldSummary from '../gameSummary/SoldSummary';

class PlayerSummaryTable extends Component {
  constructor() {
    super();

    this.state = {
      modal: false,
      playerName: '',
    };
  }

  toggle(playerName) {
    this.setState({
      modal: !this.state.modal,
      playerName,
    });
  }

  calculatePurchased(player) {
    const { playerStocks } = this.props;

    if (Object.keys(playerStocks).length === 0) return 0;

    const stocks = playerStocks[player.name].purchased;
    const sum = stocks.reduce((total, stock) => {
      if (stock.initStockQty === 0) {
        return total;
      }
      const remainingStocks = (stock.initStockQty - stock.soldStockQty.reduce((a, b) => a + b, 0));

      return total + (stock.unitPrice * remainingStocks);
    }, 0);

    return sum;
  }

  renderUsers(player, index) {
    const purchasedVal = this.calculatePurchased(player);

    return (
      <tr key={player.name}>
        <th scope="row">{index + 1}</th>
        <td>{player.name}</td>
        <td>LKR {player.cash + purchasedVal} </td>
        <td>
          <Button outline color="info" onClick={() => this.toggle(player.name)}>More</Button>
        </td>
      </tr>
    );
  }

  render() {
    const { players, playerStocks, roomInfo, user } = this.props;
    const { playerName } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle('')}>
          <ModalHeader toggle={() => this.toggle('')}>{`${playerName}'`}s game history</ModalHeader>
          <ModalBody >
            <h4>Bought</h4>
            <PurchaseSummary playerStocks={playerStocks} user={{ name: playerName}} roomInfo={roomInfo} />
            <h4>Sold</h4>
            <SoldSummary playerStocks={playerStocks} user={{ name: playerName }} roomInfo={roomInfo} />
          </ModalBody>
          <ModalFooter>
            <Button outline color="blue-grey" onClick={() => this.toggle('')}>Exit</Button>{' '}
          </ModalFooter>
        </Modal>
        <table class="table table-striped table-dark table-responsive-xs">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Assets</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => this.renderUsers(player, index))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlayerSummaryTable;

