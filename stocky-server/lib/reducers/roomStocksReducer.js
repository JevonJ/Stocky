import { CREATE_GAME, REMOVE_ROOM, CALCULATE_STOCKS } from '../actions/types';

import { stockSymbols, stockInfo } from '../stockResources';

const InitialState = {};

const defaultSet = {
  LFIN: [50],
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
  return { ...state, [payload.room]: { ...defaultSet } };
}

function removeRoomStocks(state, payload) {
  const newState = { ...state };
  delete newState[payload];
  return { ...newState };
}

function calculateStocks(sectorTrend, marketTrend, stockPrice) {
  let stockChangePercentage = sectorTrend + marketTrend;
  if (stockChangePercentage < 0) stockChangePercentage = 0;
  const newStockPrice = stockPrice + (stockPrice * (stockChangePercentage / 100));

  return parseFloat(newStockPrice.toFixed(2));
}

function reCalculateStocks(state, { roomName, trendModal, roomInfo: { currentRound } }) {
  const newState = { ...state };
  const roomStocks = newState[roomName];

  stockSymbols.map(async (symbol) => {
    const stockPrice = [...roomStocks[symbol]];
    const sector = stockInfo[symbol].stockSector;
    const sectorTrend = trendModal.sectorTrends[sector];
    const marketTrend = trendModal.marketTrends;

    const newStockPrice = await calculateStocks(
      sectorTrend[currentRound - 1],
      marketTrend[currentRound - 1],
      stockPrice[roomStocks[symbol].length - 1],
    );

    stockPrice.push(newStockPrice);

    roomStocks[symbol] = stockPrice;
    return null;
  });

  newState[roomName] = roomStocks;

  return { ...newState };
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case CREATE_GAME: return setRoomStocks(state, payload);
    case REMOVE_ROOM: return removeRoomStocks(state, payload);
    case CALCULATE_STOCKS: return reCalculateStocks(state, payload);
    default:
      return state;
  }
};
