import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

class LiveFeed extends Component {
  static renderELemets({
    username, symbol, unitPrice, qauntity, type,
  }) {

    return (<CardText>{`${username} ${type} ${qauntity} from ${symbol} at ${unitPrice}`}</CardText>);
  }

  render() {
    const { liveFeed } = this.props;
    return (
      <Card body outline color="primary">
        <CardTitle>Live feed</CardTitle>
        {
          liveFeed.map(feedelement => LiveFeed.renderELemets(feedelement))
        }
      </Card>
    );
  }
}

export default LiveFeed;
