import { SET_USER, UPDATE_USER } from '../actions/types';

const InitialState = {};

function setUser(state, payload) {
  let newState = { ...state };
  newState = Object.assign(newState, payload);
  return newState;
}

function updateUser(state, { data: { data, name }, socket }) {
  if (state.name === name) {
    let newState = { ...state };
    socket.emit('i_am_new_host');

    newState = Object.assign(newState, data);
    return newState;
  }

  return state;
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case SET_USER: return setUser(state, payload);
    case UPDATE_USER: return updateUser(state, payload);
    default:
      return state;
  }
};
