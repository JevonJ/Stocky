import { SET_PLAYER, BUY_STOCK, SELL_STOCK, CREATE_GAME, REMOVE_PLAYER } from './types';

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

export const removePlayer = (data) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: REMOVE_PLAYER,
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

export const sellStock = (data) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: SELL_STOCK,
      payload: data,
    });
    resolve(dispatch);
  });
};