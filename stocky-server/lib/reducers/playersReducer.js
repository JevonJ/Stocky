import { SET_PLAYER, BUY_STOCK, SELL_STOCK, CREATE_GAME, REMOVE_ROOM, REMOVE_PLAYER } from '../actions/types';

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
  if (newState[payload.room] && newState[payload.room].length > 0) {
    newState[payload.room] = [
      ...newState[payload.room],
      { name: payload.username, cash: 1000, isComputer: payload.isComputer || false },
    ];
  } else {
    newState[payload.room] = [{
      name: payload.username,
      cash: 1000,
      isComputer: payload.isComputer || false,
    }];
  }
  return newState;
}

function removeRoom(state, payload) {
  const newState = { ...state }
  delete newState[payload];
  return { ...newState };
}

function removePlayer(state, payload) {
  const newState = { ...state }
  const roomPlayers = newState[payload.room].filter((player) => {
    return player.name !== payload.username
  });
  newState[payload.room] = roomPlayers;

  return ({ ...newState });
}

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case SET_PLAYER: return setPlayer(state, payload);
    case CREATE_GAME: return setPlayer(state, payload);
    case BUY_STOCK: return updatePurchaseCashAmount(state, payload);
    case SELL_STOCK: return updateSellCashAmount(state, payload);
    case REMOVE_ROOM: return removeRoom(state, payload);
    case REMOVE_PLAYER: return removePlayer(state, payload);
    default: return state;
  }
};
