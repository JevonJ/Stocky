import { SET_PLAYER } from './types';

export const setPlayer = (data) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: SET_PLAYER,
      payload: data,
    });
    resolve(dispatch);
  });
};