import { UPDATE_CURRENT_EVENTS } from '../actions/types';

const InitialState = [];

function updateEvents(state, { sectorEvents, stockEvents }) {
  const newState = [...sectorEvents, ...stockEvents];
  return newState;
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CURRENT_EVENTS: return updateEvents(state, payload);
    default: return state;
  }
};
