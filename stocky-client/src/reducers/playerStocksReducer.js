import { SET_PLAYER_STOCKS, BUY_STOCK } from '../actions/types';

const InitialState = {};

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case SET_PLAYER_STOCKS:
      return { ...payload };
    case BUY_STOCK: {
      let newState = { ...state };
      newState = Object.assign(newState, payload);
      return newState;
    }
    default:
      return state;
  }
};
