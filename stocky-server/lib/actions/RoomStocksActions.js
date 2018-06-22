import { CALCULATE_STOCKS } from './types';

export const calculateStocks = (roomName) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: CALCULATE_STOCKS,
      payload: roomName,
    });
    resolve();
  });
};