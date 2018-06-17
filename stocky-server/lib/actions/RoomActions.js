import { REMOVE_ROOM } from './types';

export const removeRoom = (roomName) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: REMOVE_ROOM,
      payload: roomName,
    });
    resolve();
  });
};