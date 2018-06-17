import { UPDATE_FEED } from './types';

export const updateFeed = data => ({
  type: UPDATE_FEED,
  payload: data,
});
