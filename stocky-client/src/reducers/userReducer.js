import { SET_USER } from '../actions/types';

const InitialState = {
  name: 'Geeth',
  cash: 1000,
  room: 'room1',
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload };
    default:
      return state;
  }
};
