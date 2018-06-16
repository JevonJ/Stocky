import { combineReducers } from 'redux';

import rooms from './roomsReducer';
import roomInfo from './roomInfoReducer';
import players from './playersReducer';
import playerStocks from './playerStocksReducer';
import stocks from './stocksReducer';
import sectors from './sectorsReducer';
import sector_Stocks from './sectorStocksReducer';
import stockInfo from './stockInfoReducer';

export default combineReducers({
  rooms,
  roomInfo,
  players,
  playerStocks,
  stocks,
  sectors,
  sector_Stocks,
  stockInfo,
});
