import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Button, Fade, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Fade in tag="div" timeout={500}>
          <main role="main" className="inner cover">
            <h1 className="cover-heading">Game List</h1>
            <p className="lead">Which game would you like to play ?</p>
            <p className="lead">
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
        <DropdownToggle caret>
          Select Game
        </DropdownToggle>
        <DropdownMenu>
          
          <DropdownItem>Stocky</DropdownItem>
          <DropdownItem>Brilliant Stocker</DropdownItem>
          <DropdownItem>G Stock Market</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown>
            </p>
    			 <p className="lead">
            </p>
          </main>
      </Fade>
    );
  }
}



const mapStateToProps = (state) => {
  console.log('redux state:', state);
};

export default connect(mapStateToProps)(GameList);
