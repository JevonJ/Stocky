import { SET_ROOM_STOCKS } from './types';

export const setRoomStocks = (data) => {
  return {
    type: SET_ROOM_STOCKS,
    payload: data,
  };
};