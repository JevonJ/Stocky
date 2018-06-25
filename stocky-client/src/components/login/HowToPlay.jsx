import React from 'react';
import { ModalBody, ModalHeader, ModalFooter, Modal, Button } from 'mdbreact';

const HowToPlay = props => (
  <Modal isOpen={props.howToPlayModal} size="lg" toggle={() => props.toggle()}>
    <ModalHeader toggle={() => props.toggle()}>Hi buddy, Welcome to Stocky!!!</ModalHeader>
    <ModalBody>
      <ul className="list-group list-group-flush">
        <li className="list-group-item ">Stocky is a stock market simulator game which allow you to Buy, Sell stocks and increase your assets within the game.</li>
        <li className="list-group-item ">Being the host for a game, Stocky allows you to create a game room (i.e. a match) and you can play with online players who are joining to your game room.</li>
        <li className="list-group-item ">You can even create your private game room with a password so that the friends who sharing the password can enjoy the game with you!</li>
        <li className="list-group-item ">If you not interest in hosting a game You can join to a game room which is not started playing yet.</li>
        <li className="list-group-item ">Hang on for a few minutes in Lobby, while there are two other players to start a game.</li>
        <li className="list-group-item ">Host of the game can decide the number of rounds they going to play in the game.</li>
        <li className="list-group-item ">Host of the game can decide how much time will it takes for a round in the game.</li>
        <li className="list-group-item ">We give LKR.1000 to every player in the game at the starting point.</li>
        <li className="list-group-item ">You can pay your attention on live feed and game room members asset levels and give them a competitive experience while you are enjoying the game.</li>
        <li className="list-group-item ">Highest valued asset holder of all rounds in the game will be the WINNER OF THE GAME!!!</li>
        <li className="list-group-item ">You can not pause the game after you start playing.</li>
        <li className="list-group-item ">The end of every round values of stocks will be changing.</li>
      </ul>
    </ModalBody>
    <ModalFooter>
      <Button outline color="secondary" onClick={() => props.toggle()}>Got it!</Button>
    </ModalFooter>
  </Modal>
);

export default HowToPlay;
