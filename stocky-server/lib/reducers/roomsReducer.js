import { SET_ROOM, REMOVE_ROOM } from '../actions/types';

const InitialState = [];

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_ROOM:
      return [...state, action.payload];
    case REMOVE_ROOM:
      const newState = [...state]
      return newState.filter(e => e !== action.payload);
    default:
      return state;
  }
};
