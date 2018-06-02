import { SET_ROOM } from './types';

export const setRoom = (roomName) => {
  return {
    type: SET_ROOM,
    payload: roomName,
  };
};