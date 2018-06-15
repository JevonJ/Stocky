import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, FormGroup, Form, Input } from 'reactstrap';

class SellSharesModal extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      sellModal: false
    };
    this.toggle = this.toggle.bind(this);*/
  }
  
  render() {
    console.log('AAAAA', this.props.isOpen);
    return (
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}  >
          <ModalHeader style={{ color: 'black' }}>You are going to sell</ModalHeader>
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
            <Button color="success" onClick={this.toggle}>Sell</Button>
            <Button color="danger " onClick={this.toggle}>Not interested</Button>
          </ModalFooter>
        </Modal>
    );
  }
}


export default SellSharesModal;
