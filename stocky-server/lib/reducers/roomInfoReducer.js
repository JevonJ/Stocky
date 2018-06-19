import { CREATE_GAME, REMOVE_ROOM } from '../actions/types';

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
    name: payload.room
  }
  return { ...newState };
}

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case CREATE_GAME: return createGame(state, payload);
    case REMOVE_ROOM: return removeRoomInfo(state, payload);  
    default: return state;
  }
};
