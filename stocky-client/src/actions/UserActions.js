import { SET_USER } from './types';

export const setUser = (data) => {
  return {
    type: SET_USER,
    payload: data,
  };
};