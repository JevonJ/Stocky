import { combineReducers } from 'redux';

import rooms from './roomsReducer';
import roomInfo from './roomInfoReducer';
import players from './playersReducer';
import playerStocks from './playerStocksReducer';
import roomStocks from './roomStocksReducer';
import trendModel from './trendModelReducer';

export default combineReducers({
  rooms,
  players,
  roomInfo,
  trendModel,
  roomStocks,
  playerStocks,
});
