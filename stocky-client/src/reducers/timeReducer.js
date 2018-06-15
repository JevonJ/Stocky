import { SET_START_TIME, SET_ROUND_TIME } from '../actions/types';

const InitialState = { start_time: 0, round_time: 0 };

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case SET_START_TIME:
      return { ...state, start_time: payload };
    case SET_ROUND_TIME:
      return { ...state, round_time: payload };
    default:
      return state;
  }
};
