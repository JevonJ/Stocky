import { CREATE_GAME, REMOVE_ROOM } from '../actions/types';

const InitialState = {};

function getMarketTrends(rounds) {
  const changeProbabilityArr = ['increase', 'decrease', 'none', 'none'];
  const max = 3;
  const min = 0;
  const trendArr = [];

  for (let i = 0; i < rounds; i++) {
    const change = changeProbabilityArr[Math.floor(Math.random() * (max - min + 1)) + min];
    // console.log(change);

    if (change === 'none' && i === 0) {
      trendArr[i] = 0;
    } else if (change === 'none' && i !== 0) {
      trendArr[i] = trendArr[i - 1];
    }

    if (change === 'increase' && i === 0) {
      const increaseMax = 3;
      const increaseMin = 1;
      const randChangeValue = Math.floor(Math.random() * (increaseMax - increaseMin + 1)) + increaseMin;
      trendArr[i] = randChangeValue;
    } else if (change === 'increase' && i !== 0) {
      const value = trendArr[i - 1] + 1;
      trendArr[i] = value > 3 ? trendArr[i - 1] : value;
    }

    if (change === 'decrease' && i === 0) {
      const decreaseMax = -2;
      const decreaseMin = -1;
      const randChangeValue = Math.floor(Math.random() * (decreaseMax + decreaseMin - 1)) - decreaseMin;
      trendArr[i] = randChangeValue;
    } else if (change === 'decrease' && i !== 0) {
      const value = trendArr[i - 1] - 1;
      trendArr[i] = value < -3 ? trendArr[i - 1] : value;
    }
  }

  return trendArr;
}

function calculateSectorTrend(rounds) {
  const changeProbabilityArr = ['decrease', 'increase', 'none', 'none'];
  const max = 3;
  const min = 0;
  const trendArr = [];

  for (let i = 0; i < rounds; i++) {
    const change = changeProbabilityArr[Math.floor(Math.random() * (max - min + 1)) + min];
    // console.log(change);

    if (change === 'none' && i === 0) {
      trendArr[i] = 0;
    } else if (change === 'none' && i !== 0) {
      trendArr[i] = trendArr[i - 1];
    }

    if (change === 'increase' && i === 0) {
      const increaseMax = 3;
      const increaseMin = 1;
      const randChangeValue = Math.floor(Math.random() * (increaseMax - increaseMin + 1)) + increaseMin;
      trendArr[i] = randChangeValue;
    } else if (change === 'increase' && i !== 0) {
      const value = trendArr[i - 1] + 1;
      trendArr[i] = value > 3 ? trendArr[i - 1] : value;
    }

    if (change === 'decrease' && i === 0) {
      const decreaseMax = -2;
      const decreaseMin = -1;
      const randChangeValue = Math.floor(Math.random() * (decreaseMax + decreaseMin - 1)) - decreaseMin;
      trendArr[i] = randChangeValue;
    } else if (change === 'decrease' && i !== 0) {
      const value = trendArr[i - 1] - 1;
      trendArr[i] = value < -3 ? trendArr[i - 1] : value;
    }
  }

  // console.log('xxxxxxxxxxxxxxxxxxxxxx', trendArr);

  return trendArr;
}

function getSectorTrends(rounds) {
  const sectors = ['FINANCE', 'ENERGY', 'HEALTH', 'REAL_ESTATE'];
  const sectorTrends = {
    FINANCE: [], ENERGY: [], HEALTH: [], REAL_ESTATE: [],
  };

  sectors.map((sector) => {
    const values = calculateSectorTrend(rounds);
    sectorTrends[sector] = values;
    return null;
  });

  return sectorTrends;
}

function setTrendArray(state, { room, rounds }) {
  const sectorTrends = getSectorTrends(rounds);
  const marketTrends = getMarketTrends(rounds);
  return { ...state, [room]: { marketTrends, sectorTrends } };
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case CREATE_GAME:
      return setTrendArray(state, payload);
    case REMOVE_ROOM:
      const newState = [...state];
      return newState.filter(e => e !== payload);
    default:
      return state;
  }
};
