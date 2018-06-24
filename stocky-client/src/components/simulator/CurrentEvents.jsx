import React, { Component } from 'react';
import { Card, CardTitle, Row, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

class CurrentEvents extends Component {
  static renderELemets({
    type, stock, sector,
  }) {
    if (sector) {
      return (<ListGroupItem>{sector} sector is having a {type} </ListGroupItem>);
    }

    return (<ListGroupItem>{type} in {stock}</ListGroupItem>);
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
              events.map(event => CurrentEvents.renderELemets(event))
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
