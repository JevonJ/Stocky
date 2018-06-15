import { SET_PLAYER_STOCKS } from './types';

export const setPlayerStocks = (data) => {
  return {
    type: SET_PLAYER_STOCKS,
    payload: data,
  };
};
