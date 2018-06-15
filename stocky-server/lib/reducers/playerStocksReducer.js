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
      let room = { ...newState[payload.room] };
      let purchased = room[payload.username].purchased;
      room[payload.username].purchased = [...purchased, {
        stockSymbol: payload.stockSymbol,
        initStockQty: payload.initStockQty,
        soldStockQty: [],
        unitPrice: payload.unitPrice,
        Round: payload.unitPrice,
      }];
      newState[payload.room] = room;
      return newState;
    default:
      return state;
  }
};