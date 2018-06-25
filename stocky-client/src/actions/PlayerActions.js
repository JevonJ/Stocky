import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import http from 'axios/lib/adapters/http';
import { SET_PLAYER, SET_IS_LOADING, SET_ROOMS, SET_ROOM_INFO, BUY_STOCK, SELL_STOCK } from './types';

function getInitialData() {
  const { NODE_ENV, REACT_APP_PROD_SERVER, REACT_APP_DEV_SERVER } = process.env;
  const baseUrl = NODE_ENV === 'development' ? REACT_APP_DEV_SERVER : REACT_APP_PROD_SERVER;

  return axios.get(`${baseUrl}/api/init-data`, {
    adapter: http,
  });
}

export const initialize = () => (dispatch) => {
  let toastId = null;
  const getData = (repetition = false) => {
    getInitialData().then(
      ({ data }) => {
        toast.update(toastId, {
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          render: () => <div>Connected to server.</div>,
        });
        dispatch({ type: SET_ROOMS, payload: data.rooms });
        dispatch({ type: SET_ROOM_INFO, payload: data.roomInfo });
        dispatch({ type: SET_IS_LOADING, payload: false });
      },
      (error) => {
        if (!error.response) {
          setTimeout(() => {
            if (repetition) {
              toastId = toast.error('Network Error, Trying to Reconnect', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
              });
            }
            getData();
          }, 5000);
        }
        if (error.response) console.log(error.response);
      },
    );
  };

  getData(true);
};

export const setPlayer = players => ({
  type: SET_PLAYER,
  payload: players,
});

export const buyStock = data => ({
  type: BUY_STOCK,
  payload: data,
});

export const sellStock = data => ({
  type: SELL_STOCK,
  payload: data,
});
