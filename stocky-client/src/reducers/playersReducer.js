import { SET_PLAYER } from '../actions/types';

const InitialState = [];

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_PLAYER:
      return [...action.payload];
    default:
      return state;
  }
};
