import { CREATE_GAME, REMOVE_ROOM, CALCULATE_STOCKS } from '../actions/types';

import { stockSymbols, stockInfo } from '../stockResources';

const InitialState = {};

const defaultSet = {
  LFIN: [20],
  VANI: [25],
  CINS: [22],
  AFSL: [15],
  HPFL: [18],
  LGL: [23],
  PAP: [19],
  VLL: [28],
  SINH: [15],
  NHL: [17],
  AMSL: [20],
  CHL: [25],
  SLND: [26],
  TWOD: [19],
  KDL: [29],
  CTLD: [21],
};

function setRoomStocks(state, payload) {
  return { ...state, [payload.room]: { ...defaultSet } };
}

function removeRoomStocks(state, payload) {
  const newState = { ...state };
  delete newState[payload];
  return { ...newState };
}

function calculateStocks(
  sectorTrend, marketTrend, randomMarketTrend, stockEvents, sectorEvents, stockPrice,
) {
  let stockChangePercentage = sectorTrend + marketTrend + randomMarketTrend + stockEvents + sectorEvents;
  if (stockChangePercentage < 0) stockChangePercentage = 0;
  const newStockPrice = stockPrice + (stockPrice * (stockChangePercentage / 100));

  return parseFloat(newStockPrice.toFixed(2));
}

function calculateRandomMarketTrend() {
  const increaseMax = 2;
  const increaseMin = -2;
  const randChangeValue = Math.floor(Math.random() * (increaseMax - increaseMin + 1)) + increaseMin;

  return randChangeValue;
}

function calculateStockEventsValue(currentRoundStockEvents, symbol) {
  const stockRelevantEvents = currentRoundStockEvents.filter(event => event.stock === symbol);
  const totalStockEventsValue = stockRelevantEvents.reduce((value, event) => event.value + value, 0);
  return totalStockEventsValue;
}

function calculateSectorEventsValue(currentRoundSectorEvents, sector) {
  const stockRelevantEvents = currentRoundSectorEvents.filter(event => event.sector === sector);
  const totalSectorEventsValue = stockRelevantEvents.reduce((value, event) => event.value + value, 0);
  return totalSectorEventsValue;
}

function reCalculateStocks(
  state,
  {
    roomName, trendModal: { sectorTrends, marketTrends, eventTrends: { stockEvents, sectorEvents } },
    roomInfo: { currentRound },
  },
) {
  const newState = { ...state };
  const roomStocks = newState[roomName];
  const currentRoundStockEvents = stockEvents[currentRound];
  const currentRoundSectorEvents = sectorEvents[currentRound];

  stockSymbols.map(async (symbol) => {
    const stockPrice = [...roomStocks[symbol]];
    const sector = stockInfo[symbol].stockSector;
    const sectorTrend = sectorTrends[sector];
    const marketTrend = marketTrends;
    const randomMarketTrend = calculateRandomMarketTrend();
    const totalStockEventsValue = calculateStockEventsValue(currentRoundStockEvents, symbol);
    const totalSectorEventsValue = calculateSectorEventsValue(currentRoundSectorEvents, sector);

    const newStockPrice = await calculateStocks(
      sectorTrend[currentRound],
      marketTrend[currentRound],
      randomMarketTrend,
      totalStockEventsValue,
      totalSectorEventsValue,
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
