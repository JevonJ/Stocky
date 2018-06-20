import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Badge } from 'reactstrap';

class DashboardHeaderData extends Component {
  calculatePurchased(player) {
    const { playerStocks } = this.props;
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

  render() {
    const {
      user,
    } = this.props;
    const stockValue = this.calculatePurchased(user);

    return (
      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem
              className="justify-content-between"
              color="danger"
            >
              <h4>Cash Remaining</h4><h5><Badge pill>LKR {user.cash}</Badge></h5>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <ListGroupItem
              className="justify-content-between"
              color="warning"
            >
              <h4>Stock Value</h4><h5><Badge pill>LKR {stockValue}</Badge></h5>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <ListGroupItem
              className="justify-content-between"
              color="info"
            >
              <h4>Total Asset Value</h4><h5><Badge pill>LKR {user.cash + stockValue}</Badge></h5>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    );
  }
}


export default DashboardHeaderData;
