import { SET_ROOMS } from '../actions/types';

const InitialState = [];

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return action.payload;
    default:
      return state;
  }
};
