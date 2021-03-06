import { combineReducers } from 'redux';

import rooms from './roomsReducer';
import roomInfo from './roomInfoReducer';
import players from './playersReducer';
import playerStocks from './playerStocksReducer';
import stocks from './stocksReducer';
import sectors from './sectorsReducer';
import sectorStocks from './sectorStocksReducer';
import stockInfo from './stockInfoReducer';
import common from './commonReducer';
import user from './userReducer';
import time from './timeReducer';
import liveFeed from './liveFeedReducer';
import roomStocks from './roomStocksReducer';
import events from './eventsReducer';

export default combineReducers({
  rooms,
  roomInfo,
  players,
  playerStocks,
  stocks,
  sectors,
  sectorStocks,
  stockInfo,
  common,
  user,
  time,
  liveFeed,
  roomStocks,
  events,
});
