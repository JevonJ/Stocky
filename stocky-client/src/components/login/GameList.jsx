import React, { Component } from 'react';

import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Button, Fade, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Welcome.css';
import logo from './logo1.png'; 

class GameList extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
	 color: 'green',
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  setColor(color) {
    this.setState({ color }); 
  }

  changeColor(color) {
    this.props.socket.emit('change color', color);
  }

  
  togglePopover() {
  console.log(this.state.color);
    this.setState({
      popoverOpen: !this.state.popoverOpen,
	  color: '#5E33FF',
    });
  }

 
  

  render() {
    return (
      <Fade in tag="div" timeout={500}>
	 
	  <div style={{backgroundImage:'url(' + logo + ')'}} className="d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
           
		  <header className="masthead mb-auto">
            <div className="inner">
              <h3 className="masthead-brand">Stocky v0.1{this.state.color}</h3>
              <nav className="nav nav-masthead justify-content-center">
                <a className="nav-link active" href="#">Home</a>
                <a className="nav-link" href="#">About</a>
              </nav>
            </div>
          </header>

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
            </p>
			 <p className="lead">
              <Button outline color="primary" size="lg" id="Popover1" onClick={() => this.togglePopover()}>Join Game</Button>
             
            </p>
            
          </main>

          <footer className="mastfoot mt-auto">
            <div className="inner">
              <p>
                <a href="https://github.com/JevonJ/Stocky">A Stock Simulator Game</a>, by
                <a href="#" id="Popover1" onClick={() => this.togglePopover()}> Team Titans.</a>
                <Popover
                  placement="top"
                  isOpen={this.state.popoverOpen}
                  target="Popover1"
                  toggle={() => this.togglePopover()}
                >
                  <PopoverHeader>Our Team</PopoverHeader>
                  <PopoverBody>
                    <ul>
                      <li>Jevon Jansz - 15208469</li>
                      <li>A.L. Alvis - 15208464</li>
                      <li>I.J.Ginige - 15209285</li>
                      <li>D.K.D.S.B.Gunawardhane - 16211242</li>
                      <li>S.Tharaniya jj - 15209302</li>
                      <li>N.G.Wickramadivakara - 15209308</li>
                    </ul>
                  </PopoverBody>
                </Popover>
				
				
              </p>
            </div>
          </footer>
        </div>
      </Fade>
    );
  }
}



const mapStateToProps = (state) => {
  console.log('redux state:', state);
};

export default connect(mapStateToProps)(GameList);
