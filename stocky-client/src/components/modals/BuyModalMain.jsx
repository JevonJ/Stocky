import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, FormGroup, Form, Input } from 'reactstrap';

class BuyModalMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}
          Buy
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}  >
          <ModalHeader style={{ color: 'black' }} toggle={this.toggle} >You are going to buy</ModalHeader>
          <ModalBody style={{ color: 'black' }} className="mbody" >
            <ListGroup>
              <ListGroupItem>Company Symbol</ListGroupItem>
              <ListGroupItem>
                <FormGroup>
                  Number of Stocks
                    <Input type="number" name="number" id="exampleNumber" placeholder="Number of Stocks" min={1} />
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>Price</ListGroupItem>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>Buy</Button>
            <Button color="danger " onClick={this.toggle}>Not interested</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default BuyModalMain;
