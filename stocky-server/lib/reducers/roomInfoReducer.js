import {
  CREATE_GAME, REMOVE_ROOM, START_GAME, CALCULATE_STOCKS,
} from '../actions/types';

const InitialState = {};

function removeRoomInfo(state, payload) {
  const newState = { ...state };
  delete newState[payload];
  return { ...newState };
}

function createGame(state, payload) {
  const newState = { ...state };
  newState[payload.room] = {
    rounds: payload.rounds,
    currentRound: 0,
    isPrivate: payload.isPrivate,
    password: payload.password,
    name: payload.room,
    roundDuration: payload.duration,
    isStarted: false,
  };
  return { ...newState };
}

function startGame(state, payload) {
  const newState = { ...state };
  newState[payload].isStarted = true;

  return { ...newState };
}

function increaseRound(state, payload) {
  const newState = { ...state };
  const { currentRound } = newState[payload.roomName];
  newState[payload.roomName].currentRound = currentRound + 1;

  return { ...newState };
}

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case CREATE_GAME: return createGame(state, payload);
    case REMOVE_ROOM: return removeRoomInfo(state, payload);
    case START_GAME: return startGame(state, payload);
    case CALCULATE_STOCKS: return increaseRound(state, payload);
    default: return state;
  }
};
