import { CREATE_GAME, REMOVE_ROOM } from '../actions/types';

const InitialState = {};

const defaultSet = {
  LFIN: {
    currentPrice: 0,
    previousPrice: 0,
  },
  VANI: {
    currentPrice: 0,
    previousPrice: 0,
  },
  CINS: {
    currentPrice: 0,
    previousPrice: 0,
  },
  AFSL: {
    currentPrice: 0,
    previousPrice: 0,
  },
  HPFL: {
    currentPrice: 0,
    previousPrice: 0,
  },
  LGL: {
    currentPrice: 0,
    previousPrice: 0,
  },
  PAP: {
    currentPrice: 0,
    previousPrice: 0,
  },
  VLL: {
    currentPrice: 0,
    previousPrice: 0,
  },
  SINH: {
    currentPrice: 0,
    previousPrice: 0,
  },
  NHL: {
    currentPrice: 0,
    previousPrice: 0,
  },
  AMSL: {
    currentPrice: 0,
    previousPrice: 0,
  },
  CHL: {
    currentPrice: 0,
    previousPrice: 0,
  },
  SLND: {
    currentPrice: 0,
    previousPrice: 0,
  },
  TWOD: {
    currentPrice: 0,
    previousPrice: 0,
  },
  KDL: {
    currentPrice: 0,
    previousPrice: 0,
  },
  CTLD: {
    currentPrice: 0,
    previousPrice: 0,
  },
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
