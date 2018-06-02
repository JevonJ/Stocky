import React, { Component } from 'react';

import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Button, Fade, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
//import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
//import { Route, withRouter, NavLink } from 'react-router-dom';
import './Welcome.css';
import logo from './logo1.png'; 

import * as actions from '../../actions';
import Welcome from './Welcome';
//import PopupPassword from './PopupPassword';

class Popuppassword extends Component {
  render() {
    return (
      <Fade in tag="div" timeout={500}>
        <main role="main" className="inner cover">
          <h1 className="cover-heading">Game List</h1>
          <p className="lead">Which game would you like to play ?</p>
          <p className="lead">
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                 Select Game
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Stocky</DropdownItem>
                <DropdownItem>Brilliant Stocker</DropdownItem>
                <DropdownItem>G Stock Market</DropdownItem>
              </DropdownMenu>  
            </ButtonDropdown>  
            </p >
      <p className="lead">
              
			 
             
      </p>
      <div>
        <InputGroup>
        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
        <Input placeholder="username" />
      </InputGroup>  
      <br /> 
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Input addon type="checkbox" aria-label="Checkbox for following text input" />
          </InputGroupText>  
        </InputGroupAddon>  
      <Input placeholder="Check it out" />
      </InputGroup>  
      <br /> 
      <InputGroup>
        <Input placeholder="username" />
        <InputGroupAddon addonType="append">@example.com</InputGroupAddon>
      </InputGroup>  
      <br /> 
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>$</InputGroupText>
      <InputGroupText>$</InputGroupText>
        </InputGroupAddon>  
      <Input placeholder="Dolla dolla billz yo!" />
      <InputGroupAddon addonType="append">
        <InputGroupText>$</InputGroupText>
      <InputGroupText>$</InputGroupText>
        </InputGroupAddon>  
      </InputGroup>  
      <br /> 
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
      <Input placeholder="Amount" type="number" step="1" />
      <InputGroupAddon addonType="append">.00</InputGroupAddon>
      </InputGroup>  
    </div >  
            
          </main >  
      </Fade>
    );
  }
}



const mapStateToProps = (state) => {
  console.log('redux state:', state);
};

export default connect(mapStateToProps)(Popuppassword);
