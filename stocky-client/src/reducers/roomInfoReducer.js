import { SET_ROOM_INFO } from '../actions/types';

const InitialState = {};

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_ROOM_INFO:
      return action.payload;
    default:
      return state;
  }
};
