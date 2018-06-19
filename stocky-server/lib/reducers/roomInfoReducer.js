import { CREATE_GAME, REMOVE_ROOM, START_GAME } from '../actions/types';

const InitialState = {};

function removeRoomInfo(state, payload) {
  const newState = { ...state }
  delete newState[payload];
  return { ...newState };
}

function createGame(state, payload) {
  let newState = { ...state };
  newState[payload.room] = {
    rounds: 20,
    currentRound: 0,
    isPrivate: payload.isPrivate,
    password: payload.password,
    name: payload.room,
    isStarted: false,    
  }
  return { ...newState };
}

function startGame(state, payload) {
  let newState = { ...state };
  newState[payload].currentRound = 1;
  newState[payload].isStarted = true;

  return { ...newState };  
}

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case CREATE_GAME: return createGame(state, payload);
    case REMOVE_ROOM: return removeRoomInfo(state, payload);  
    case START_GAME: return startGame(state, payload);
    default: return state;
  }
};
