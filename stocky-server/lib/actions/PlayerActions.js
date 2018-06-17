import { SET_PLAYER, BUY_STOCK, CREATE_GAME } from './types';

export const createGame = (data) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({ type: CREATE_GAME, payload: data });
    resolve(dispatch);
  });
};

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