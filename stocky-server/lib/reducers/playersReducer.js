import { SET_PLAYER } from '../actions/types';

const InitialState = {};

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case SET_PLAYER:
      const newState = { ...state };
      newState[payload.room] = [{ name: payload.username, cash: 1000 }]; 
      return { ...newState };
    default:
      return state;
  } 
};
