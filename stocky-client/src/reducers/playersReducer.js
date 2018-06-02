import { SET_PLAYER } from '../actions/types';

export default(state = 'white', action) => {
  switch (action.type) {
    case SET_PLAYER:
      return action.payload;
    default:
      return state;
  }
};
