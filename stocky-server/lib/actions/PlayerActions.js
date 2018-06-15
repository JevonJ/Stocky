import { SET_PLAYER, BUY_STOCK } from './types';

export const setPlayer = (data) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: SET_PLAYER,
      payload: data,
    });
    resolve(dispatch);
  });
};

export const buyStock = (data) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: BUY_STOCK,
      payload: data,
    });
    resolve(dispatch);
  });
};