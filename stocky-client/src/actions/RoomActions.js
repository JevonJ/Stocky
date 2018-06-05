import { SET_ROOMS } from './types';

export const setRoom = (roomName) => {
  return {
    type: SET_ROOMS,
    payload: roomName,
  };
};