import { SET_USER, UPDATE_USER } from './types';

export const setUser = (data) => {
  return {
    type: SET_USER,
    payload: data,
  };
};

export const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};
