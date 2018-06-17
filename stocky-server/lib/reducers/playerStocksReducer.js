import { BUY_STOCK, SET_PLAYER_STOCKS } from '../actions/types';
import { buyStock } from '../actions';

const InitialState = {};

function updatePlayerStock(state, payload) {
  const newState = { ...state };
  let room = { ...newState[payload.room] };
  let purchased = room[payload.username].purchased;
  
  const purchaseExist = purchased.findIndex((({ stockSymbol, round }) => (stockSymbol === payload.stockSymbol && round === payload.round)));

  if(purchaseExist < 0) {
    room[payload.username].purchased = [...purchased, {
      stockSymbol: payload.stockSymbol,
      initStockQty: payload.initStockQty,
      soldStockQty: [],
      unitPrice: payload.unitPrice,
      round: payload.round,
    }];
    newState[payload.room] = room;
    return newState;
  } else {
    purchased[purchaseExist].initStockQty += payload.initStockQty;
    room[payload.username].purchased = [...purchased];
    newState[payload.room] = room;
    return newState;
  }
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case SET_PLAYER_STOCKS:
      const player = {};
      player[payload.room] = { [payload.username]: { purchased: [], sold: [] } }
      return { ...state, ...player };
    case BUY_STOCK:
      return updatePlayerStock(state, payload);
    default:
      return state;
  }
};