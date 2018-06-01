import { SET_PLAYER } from './types';

export const setPlayer = (playerName) => {
  return {
    type: SET_PLAYER,
    payload: playerName,
  };
};