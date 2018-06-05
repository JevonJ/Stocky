import { SET_ROOM, REMOVE_ROOM } from './types';

export const setRoom = (roomName) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: SET_ROOM,
      payload: roomName,
    });
    resolve();
  });
};

export const removeRoom = (roomName) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: REMOVE_ROOM,
      payload: roomName,
    });
    resolve();
  });
};