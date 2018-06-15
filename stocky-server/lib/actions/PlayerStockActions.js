import { SET_PLAYER_STOCKS } from './types';

export const setPlayerStocks = (data) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: SET_PLAYER_STOCKS,
      payload: data,
    });
    resolve();
  });
};