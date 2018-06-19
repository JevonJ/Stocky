import { SET_PLAYER, BUY_STOCK, SELL_STOCK, CREATE_GAME } from '../actions/types';

const InitialState = {};

function updatePurchaseCashAmount(state, payload) {
  const newState = { ...state };
  const roomPlayers = newState[payload.room];
  const newPlayersArr = roomPlayers.map((player) => {
    if (player.name === payload.username) {
      const cash = payload.currentCashInHand - (payload.initStockQty * payload.unitPrice);
      return { ...player, cash };
    } else {
      return { ...player };
    }
  });
  newState[payload.room] = newPlayersArr;
  return newState;
}

function updateSellCashAmount(state, payload) {
  const newState = { ...state };
  const roomPlayers = newState[payload.room];
  const newPlayersArr = roomPlayers.map((player) => {
    if (player.name === payload.username) {
      const cash = payload.currentCashInHand + (payload.stockQty * payload.unitPrice);
      return { ...player, cash };
    } else {
      return { ...player };
    }
  });
  newState[payload.room] = newPlayersArr;
  return newState;
}

function setPlayer(state, payload) {
  const newState = { ...state };
  newState[payload.room] = [{ name: payload.username, cash: 1000 }]; 
  return { ...newState };
}

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case SET_PLAYER: return setPlayer(state, payload);
    case CREATE_GAME: return setPlayer(state, payload);
    case BUY_STOCK: return updatePurchaseCashAmount(state, payload);
    case SELL_STOCK: return updateSellCashAmount(state, payload);
    default: return state;
  } 
};
