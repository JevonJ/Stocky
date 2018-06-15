import { SET_PLAYER_STOCKS } from '../actions/types';

const InitialState = {};

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_PLAYER_STOCKS:
      return { ...action.payload };
    default:
      return state;
  }
};
