import { SET_ROOM_INFO } from './types';

export const setRoomInfo = (roomInfo) => {
  return {
    type: SET_ROOM_INFO,
    payload: roomInfo,
  };
};