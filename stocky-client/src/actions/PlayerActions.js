import axios from 'axios';

import { SET_PLAYER, SET_IS_LOADING, SET_ROOMS, SET_ROOM_INFO } from './types';

function getInitialData() {
  return axios.get('http://localhost:4001/api/init-data');
}

export const initialize = () => {
  return (dispatch) => {
    getInitialData().then(
      ({ data }) => {
        dispatch({ type: SET_ROOMS, payload: data.rooms });
        dispatch({ type: SET_ROOM_INFO, payload: data.roomInfo });
        dispatch({ type: SET_IS_LOADING, payload: false });
      },
      error => console.log('AAAAAAAa', error),
    );
  };
};

export const setPlayer = playerName => ({
  type: SET_PLAYER,
  payload: playerName,
});
