import { SET_ROOM_INFO } from '../actions/types';

const InitialState = {};

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case SET_ROOM_INFO:
      let newState = { ...state };
      newState[payload.room] = {
        rounds: 20,
        currentRound: 0,
        isPrivate: payload.isPrivate,
        password: payload.password,
        name: payload.room
      }
      return { ...newState };
    default:
      return state;
  }
};
