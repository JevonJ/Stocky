import { UPDATE_CURRENT_EVENTS } from './types';

export const updateEvents = data => ({
  type: UPDATE_CURRENT_EVENTS,
  payload: data,
});
