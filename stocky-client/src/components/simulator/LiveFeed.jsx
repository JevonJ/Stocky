import React, { Component } from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'mdbreact';

class LiveFeed extends Component {
  static renderELemets({
    username, symbol, unitPrice, qauntity, type,
  }) {
    return (<ListGroupItem>{`${username} ${type} ${qauntity} from ${symbol} at ${unitPrice.toFixed(2)}`}</ListGroupItem>);
  }

  render() {
    const { liveFeed } = this.props;
    return (
      <Card style={{ minWidth: '20rem', marginTop: '1rem' }}>
        <CardBody>
          <CardTitle>Live feed</CardTitle>
          <ListGroup style={{ maxHeight: '17vh', overflow: 'scroll', overflowX: 'hidden' }}>
            {
              liveFeed.map(feedelement => LiveFeed.renderELemets(feedelement))
            }
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default LiveFeed;
