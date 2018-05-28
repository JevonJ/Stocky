import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:4001');

class App extends Component {
  constructor() {
    super();
    this.state = {
      color: 'white',
    };
  }

  componentDidMount() {    
    socket.on('change color', col => {
      document.body.style.backgroundColor = col;
    });
  }

  setColor(color) {
    this.setState({ color });
  }

  changeColor(color) {
    socket.emit('change color', color);      
  }
 
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.changeColor(this.state.color)}>Change Color</button>

        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
      </div>
    );
  }
}

export default App;
