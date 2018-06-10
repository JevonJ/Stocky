import axios from 'axios';

import http from 'axios/lib/adapters/http';
import { SET_PLAYER, SET_IS_LOADING, SET_ROOMS, SET_ROOM_INFO } from './types';

function getInitialData() {
  return axios.get('http://localhost:4001/api/init-data', {
    adapter: http,
  });
}

export const initialize = () => {
  return (dispatch) => {
    getInitialData().then(
      ({ data }) => {
        dispatch({ type: SET_ROOMS, payload: data.rooms });
        dispatch({ type: SET_ROOM_INFO, payload: data.roomInfo });
        dispatch({ type: SET_IS_LOADING, payload: false });
      },
      (error) => {
        if (!error.response) console.log('Network Error');
        if (error.response) console.log(error.response);
      },
    );
  };
};

export const setPlayer = playerName => ({
  type: SET_PLAYER,
  payload: playerName,
});
