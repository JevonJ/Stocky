import { SET_PLAYER, BUY_STOCK } from '../actions/types';
import { buyStock } from '../actions';

const InitialState = {};

function updateCashAmount(state, payload) {
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

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case SET_PLAYER:
      const newState = { ...state };
      newState[payload.room] = [{ name: payload.username, cash: 1000 }]; 
      return { ...newState };
    case BUY_STOCK: 
      return updateCashAmount(state, payload);
    default:
      return state;
  } 
};
