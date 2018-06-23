import { CALCULATE_STOCKS } from './types';

export const calculateStocks = (roomName, trendModal, roomInfo) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: CALCULATE_STOCKS,
      payload: {roomName, trendModal, roomInfo},
    });
    resolve();
  });
};