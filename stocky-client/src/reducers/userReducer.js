import { SET_USER } from '../actions/types';

const InitialState = {};

function setUser(state, payload) {
  let newState = { ...state };
  newState = Object.assign(newState, payload);
  return newState;
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case SET_USER: return setUser(state, payload);
    default:
      return state;
  }
};
