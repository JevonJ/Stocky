import { SET_PLAYER } from '../actions/types';

const InitialState = {};

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_PLAYER:
      const newState = { ...state };
      newState[action.payload.room] = [action.payload.player]; 
      return { ...newState };
    default:
      return state;
  } 
};
