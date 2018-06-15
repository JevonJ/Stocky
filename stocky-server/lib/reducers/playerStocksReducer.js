import { BUY_STOCK, SET_PLAYER_STOCKS } from '../actions/types';

const InitialState = {};

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case SET_PLAYER_STOCKS:
      const player = {};
      player[payload.room] = { [payload.username]: { purchased: [], sold: [] } }
      return {...state, ...player};
    case BUY_STOCK:
      const newState = {...state};
      console.log('AAAAAAAAAAAAAa', payload);
      return state;
    default:
      return state;
  }
};