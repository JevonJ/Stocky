import React, { Component } from 'react';
import { Card, CardTitle, Row, ListGroup, ListGroupItem } from 'reactstrap';

class CurrentEvents extends Component {
  static renderELemets({
    type, stock, sector,
  }, index) {
    if (sector) {
      return (<ListGroupItem key={index}>{sector} sector is having a {type} </ListGroupItem>);
    }

    return (<ListGroupItem key={index}>{type} in {stock}</ListGroupItem>);
  }

  render() {
    const { events } = this.props;
    return (
      <Row>
        <Card body outline color="warning">
          <CardTitle>Current Events</CardTitle>
          <ListGroup>
            {
              events.length > 0 ?
              events.map((event, index) => CurrentEvents.renderELemets(event, index))
              :
              <ListGroupItem>No Events</ListGroupItem>
            }
          </ListGroup>
        </Card>
      </Row>
    );
  }
}

export default CurrentEvents;
