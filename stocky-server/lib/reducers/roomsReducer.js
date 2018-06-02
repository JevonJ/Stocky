import { SET_ROOM } from '../actions/types';

const InitialState = [];

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_ROOM:
      return [...state, action.payload];
    default:
      return state;
  }
};
