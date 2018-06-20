import { CREATE_GAME, REMOVE_ROOM } from '../actions/types';

const InitialState = {};

const defaultSet = {
  LFIN: [122],
  VANI: [34],
  CINS: [3],
  AFSL: [21],
  HPFL: [5],
  LGL: [20],
  PAP: [3],
  VLL: [4],
  SINH: [2],
  NHL: [4],
  AMSL: [10],
  CHL: [2],
  SLND: [10],
  TWOD: [18],
  KDL: [23],
  CTLD: [28],
};

function setRoomStocks(state, payload) {
  return { ...state, [payload.room]: defaultSet };
}

function removeRoomStocks(state, payload) {
  const newState = { ...state }
  delete newState[payload];
  return { ...newState };
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case CREATE_GAME: return setRoomStocks(state, payload);
    case REMOVE_ROOM: return removeRoomStocks(state, payload);
    default:
      return state;
  }
};
