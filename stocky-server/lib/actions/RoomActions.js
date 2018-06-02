import { SET_ROOM } from './types';

export const setRoom = (roomName) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: SET_ROOM,
      payload: roomName,
    });
    resolve();
  });
};