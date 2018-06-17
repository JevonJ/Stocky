import { REMOVE_ROOM, CREATE_GAME } from '../actions/types';

const InitialState = [];

export default (state = InitialState, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return [...state, action.payload.room];  
    case REMOVE_ROOM:
      const newState = [...state]
      return newState.filter(e => e !== action.payload);
    default:
      return state;
  }
};
