import { SET_START_TIME, SET_ROUND_TIME } from './types';

export const setStartTime = seconds => ({
  type: SET_START_TIME,
  payload: seconds,
});

export const setRoundTime = seconds => ({
  type: SET_ROUND_TIME,
  payload: seconds,
});
