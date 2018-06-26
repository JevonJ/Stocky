import React, { Component } from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'mdbreact';

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
      <Card style={{ minWidth: '20rem', marginTop: '1rem' }}>
        <CardBody>
          <CardTitle>Current Events</CardTitle>
          <ListGroup style={{ maxHeight: '17vh', overflow: 'scroll', overflowX: 'hidden' }}>
            {
              events.length > 0 ?
                events.map((event, index) => CurrentEvents.renderELemets(event, index))
                :
                <ListGroupItem>No Events</ListGroupItem>
            }
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default CurrentEvents;
