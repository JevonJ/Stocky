import { BUY_STOCK, SELL_STOCK, SET_PLAYER_STOCKS, CREATE_GAME, SET_PLAYER, REMOVE_ROOM } from '../actions/types';

const InitialState = {};

function updatePurchasePlayerStock(state, payload) {
  const newState = { ...state };
  let room = { ...newState[payload.room] };
  let purchased = room[payload.username].purchased;
  
  const purchaseExist = purchased.findIndex((({ stockSymbol, round }) => (stockSymbol === payload.stockSymbol && round === payload.round)));

  //Purchased Stocks
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

function updateSellPlayerStock(state, payload) {
  const newState = { ...state };
  let room = { ...newState[payload.room] };
  let sold = room[payload.username].sold;
  
  const sellExist = sold.findIndex((({ stockSymbol, round }) => (stockSymbol === payload.stockSymbol && round === payload.round)));

   //Sold Stocks
   if(sellExist < 0) {
    room[payload.username].sold = [...sold, {
      stockSymbol: payload.stockSymbol,
      stockQty: [payload.stockQty],
      unitPrice: payload.unitPrice,
      round: payload.round,
    }];
    newState[payload.room] = room;
    return newState;
  } else {
    sold[sellExist].stockQty = [...sold[sellExist].stockQty ,payload.stockQty];
    room[payload.username].sold = [...sold];
    newState[payload.room] = room;
    return newState;
  }

}

function setPlayerStock(state, payload) {
  const newState = {...state};

  newState[payload.room] = { ...state[payload.room], [payload.username]: { purchased: [], sold: [] } }
  return newState;
}

function removePlayerStocks(state, payload) {
  const newState = { ...state }
  delete newState[payload];
  return { ...newState };
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case SET_PLAYER_STOCKS: return setPlayerStock(state, payload);
    case SET_PLAYER: return setPlayerStock(state, payload);
    case CREATE_GAME: return setPlayerStock(state, payload);
    case BUY_STOCK: return updatePurchasePlayerStock(state, payload);
    case SELL_STOCK: return updateSellPlayerStock(state, payload);
    case REMOVE_ROOM: return removePlayerStocks(state, payload);
    default: return state;
  }
};