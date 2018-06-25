import { UPDATE_FEED } from '../actions/types';

const InitialState = [];

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case UPDATE_FEED: {
      const data = {
        username: payload.username,
        symbol: payload.stockSymbol,
        unitPrice: payload.unitPrice,
        qauntity: payload.initStockQty || payload.stockQty,
        type: payload.initStockQty ? 'bought' : 'sold',
      };
      return [...state, data];
    }
    default:
      return state;
  }
};
