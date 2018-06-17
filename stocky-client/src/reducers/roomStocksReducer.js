import { SET_ROOM_STOCKS } from '../actions/types';

const InitialState = {};

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_ROOM_STOCKS:
      return action.payload;
    default:
      return state;
  }
};
