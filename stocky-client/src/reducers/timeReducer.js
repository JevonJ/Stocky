import { SET_TIME } from '../actions/types';

const InitialState = { start_time: 0, round_time: 0 };

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case SET_TIME:
      return { ...Object.assign(state, payload) };
    default:
      return state;
  }
};
