import { SET_TIME } from './types';

export const setTime = data => ({
  type: SET_TIME,
  payload: data,
});
