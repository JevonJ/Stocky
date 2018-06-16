import { SET_SECTORS } from '../actions/types';

const InitialState = [];
// const InitialState = [];



export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_SECTORS:
      return [...action.payload];
    default:
      return state;
  }
};

