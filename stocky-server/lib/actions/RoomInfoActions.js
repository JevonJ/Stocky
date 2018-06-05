import { SET_ROOM_INFO } from './types';

export const setRoomInfo = (data) => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch({
      type: SET_ROOM_INFO,
      payload: data,
    });
    resolve();
  });
};