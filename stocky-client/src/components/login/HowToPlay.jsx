import React, { Component } from 'react';

class HowToPlay extends Component {
  constructor() {
    super();
    this.state = {
      a: false,
    };
  }

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <h4>Hi buddy,</h4><br />
        <h1>Welcome to Stocky!!!</h1><br />
        <ul>
          <li>Stocky is a stock market simulator game which allow you to Buy,Sell stocks and increase your assets within the game.</li><br />
          <li>Being the host for a game, Stocky allows you to create a game room (i.e. a match) and you can play with online players who are joining to your game room.</li><br />
          <li>You can even create your private game room with a password so that the friends who sharing the password can enjoy the game with you!</li><br />
          <li>If you not interest in hosting a game You can join to a game room which is not started playing yet.</li><br />
          <li>Hang on at least with three players to start a game.</li><br />
          <li>Host of the game can decide the number of rounds they going to play in the game.</li><br />
          <li>Host of the game can decide how much time will it takes for a round in the game.</li><br />
          <li>We give LKR.1000 to every player in the game at the starting point.</li><br />
          <li>You can pay your attention on live feed and game room members asset levels and give them a competitive experience while you are enjoying the game.</li><br />
          <li>Highest valued asset holder of all rounds in the game will be the WINNER OF THE GAME!!!</li><br />
          <li>You can not pause the game after you start playing.</li><br />
          <li>At the end of every round values of stocks will be changing.</li>
        </ul>
      </div>

    );
  }
}

export default HowToPlay;
