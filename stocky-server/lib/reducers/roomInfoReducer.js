import { SET_ROOM_INFO } from '../actions/types';

const InitialState = {};

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case SET_ROOM_INFO:
      let newState = { ...state };
      newState[payload.roomName] = {
        round: 0,
        isPrivate: payload.isPrivate,
        password: payload.password,
        name: payload.roomName
      }
      return { ...newState };
    default:
      return state;
  }
};
