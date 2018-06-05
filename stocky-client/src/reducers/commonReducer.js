import { SET_IS_LOADING } from '../actions/types';

const InitialState = {
  isLoading: true,
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
