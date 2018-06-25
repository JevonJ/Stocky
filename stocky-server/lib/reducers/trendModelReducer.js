import { CREATE_GAME, REMOVE_ROOM } from '../actions/types';
import { sectors, stockSymbols } from '../stockResources';

const InitialState = {};

function getRandRangeValue(max, min) {
  return (Math.floor(Math.random() * ((max) - (min) + 1)) + (min));
}

function getMarketTrends(rounds) {
  // Set trend change probabilty

  const changeProbabilityArr = ['increase', 'decrease', 'none', 'none'];
  const max = 3;
  const min = 0;
  const trendArr = [];

  // loop for the number of rounds and determine wether the value would change
  for (let i = 0; i < rounds; i++) {
    const change = changeProbabilityArr[getRandRangeValue(max, min)];
    // console.log(change);

    if (change === 'none' && i === 0) {
      trendArr[i] = 0;
    } else if (change === 'none' && i !== 0) {
      trendArr[i] = trendArr[i - 1];
    }

    if (change === 'increase' && i === 0) {
      const increaseMax = 3;
      const increaseMin = 1;
      // Get value to be changed
      const randChangeValue = getRandRangeValue(increaseMax, increaseMin);
      trendArr[i] = randChangeValue;
    } else if (change === 'increase' && i !== 0) {
      const value = trendArr[i - 1] + 1;
      trendArr[i] = value > 3 ? trendArr[i - 1] : value;
    }

    if (change === 'decrease' && i === 0) {
      const decreaseMax = -1;
      const decreaseMin = -2;
      // Get value to be changed
      const randChangeValue = getRandRangeValue(decreaseMax, decreaseMin);
      trendArr[i] = randChangeValue;
    } else if (change === 'decrease' && i !== 0) {
      const value = trendArr[i - 1] - 1;
      trendArr[i] = value < -3 ? trendArr[i - 1] : value;
    }
  }

  return trendArr;
}

function calculateSectorTrend(rounds) {
  // Set trend change probabilty
  const changeProbabilityArr = ['decrease', 'increase', 'none', 'none'];
  const max = 3;
  const min = 0;
  const trendArr = [];

  // loop for the number of rounds and determine wether the value would change
  for (let i = 0; i < rounds; i++) {
    const change = changeProbabilityArr[getRandRangeValue(max, min)];
    // console.log(change);

    if (change === 'none' && i === 0) {
      trendArr[i] = 0;
    } else if (change === 'none' && i !== 0) {
      trendArr[i] = trendArr[i - 1];
    }

    if (change === 'increase' && i === 0) {
      const increaseMax = 3;
      const increaseMin = 1;
      // Get value to be changed
      const randChangeValue = getRandRangeValue(increaseMax, increaseMin);
      trendArr[i] = randChangeValue;
    } else if (change === 'increase' && i !== 0) {
      const value = trendArr[i - 1] + 1;
      trendArr[i] = value > 3 ? trendArr[i - 1] : value;
    }

    if (change === 'decrease' && i === 0) {
      const decreaseMax = -1;
      const decreaseMin = -2;
      // Get value to be changed
      const randChangeValue = getRandRangeValue(decreaseMax, decreaseMin);
      trendArr[i] = randChangeValue;
    } else if (change === 'decrease' && i !== 0) {
      const value = trendArr[i - 1] - 1;
      trendArr[i] = value < -3 ? trendArr[i - 1] : value;
    }
  }

  return trendArr;
}

function getSectorTrends(rounds) {
  // Set initla sector trend array model
  const sectorTrends = {
    FINANCE: [], ENERGY: [], HEALTH: [], REAL_ESTATE: [],
  };

  // Calculate trend for a round for each sector
  sectors.map((sector) => {
    const values = calculateSectorTrend(rounds);
    sectorTrends[sector] = values;
    return null;
  });

  return sectorTrends;
}

function getsectorEvent() {
  const roundsMax = 5;
  const roundsMin = 2;
  // Get number of rounds the event will run for
  const eventDuration = getRandRangeValue(roundsMax, roundsMin);

  const randForSectorEventType = Math.random();

  if (randForSectorEventType <= 0.5) {
    // It's a BOOM
    const boomMax = 5;
    const boomMin = 1;
    const boomValue = getRandRangeValue(boomMax, boomMin);

    return ({ type: 'BOOM', value: boomValue, eventDuration });
  }
  // It's a BUST
  const bustMax = -1;
  const bustMin = -5;

  const bustValue = getRandRangeValue(bustMax, bustMin);

  return ({ type: 'BUST', value: bustValue, eventDuration });
}

function getstockEvent() {
  const roundsMax = 7;
  const roundsMin = 1;
  // Get number of rounds the event will run for
  const eventDuration = getRandRangeValue(roundsMax, roundsMin);

  const randForStockEventType = Math.random();

  if (randForStockEventType <= 0.25) {
    // It's a SCANDAL
    const scandalMax = -3;
    const scandalMin = -6;

    const scandalValue = getRandRangeValue(scandalMax, scandalMin);

    return ({ type: 'SCANDAL', value: scandalValue, eventDuration });
  }

  if (randForStockEventType <= 0.5) {
    // It's a TAKE_OVER
    const takeoverMax = -1;
    const takeoverMin = -5;

    const takeoverValue = getRandRangeValue(takeoverMax, takeoverMin);

    return ({ type: 'TAKE_OVER', value: takeoverValue, eventDuration });
  }

  // It's a PROFIT_WARNING
  const profitMax = 3;
  const profitMin = 2;
  const profitValue = getRandRangeValue(profitMax, profitMin);

  return ({ type: 'PROFIT_WARNING', value: profitValue, eventDuration });
}

function setEventObj(rounds) {
  const trendObj = {};
  for (let i = 0; i < rounds; i++) {
    trendObj[i] = [];
  }

  return trendObj;
}

function getEventTrends(rounds) {
  // set Initial Events array model
  const sectorEvents = { ...setEventObj(rounds) };
  const stockEvents = { ...setEventObj(rounds) };
  let eventOccurProb = 0.1;
  const sectorEventProb = 0.33;
  for (let i = 1; i < rounds; i++) {
    const randForEventOccurance = Math.random();
    if (randForEventOccurance <= eventOccurProb) {
      eventOccurProb = 0;
      // An event will occur in this round
      const randForEventType = Math.random();
      if (randForEventType <= sectorEventProb) {
        // It's a Sector Event

        // Get a random Sector
        const randSector = sectors[getRandRangeValue(sectors.length - 1, 0)];

        const { type, value, eventDuration } = getsectorEvent();
        for (let j = 0; j < eventDuration; j++) {
          if (i + j < rounds) {
            sectorEvents[i + j].push({
              type, value, eventRound: j + 1, eventDuration, sector: randSector,
            });
          }
        }
      } else {
        // It's a Stock Event

        // Get a random Stock
        const randStock = stockSymbols[getRandRangeValue(stockSymbols.length - 1, 0)];

        const { type, value, eventDuration } = getstockEvent();
        for (let j = 0; j < eventDuration; j++) {
          if (i + j < rounds) {
            stockEvents[i + j].push({
              type, value, eventRound: j + 1, eventDuration, stock: randStock,
            });
          }
        }
      }
    } else {
      // An event will NOT occur in this round
      eventOccurProb += 0.1;
    }
  }
  return { stockEvents, sectorEvents };
}

function setTrendArray(state, { room, rounds }) {
  const sectorTrends = getSectorTrends(rounds);
  const marketTrends = getMarketTrends(rounds);
  const eventTrends = getEventTrends(rounds);
  return { ...state, [room]: { marketTrends, sectorTrends, eventTrends } };
}

function removeRoom(state, payload) {
  const newState = { ...state };
  delete newState[payload];
  return { ...newState };
}

export default (state = InitialState, { type, payload }) => {
  switch (type) {
    case CREATE_GAME: return setTrendArray(state, payload);
    case REMOVE_ROOM: return removeRoom(state, payload);
    default: return state;
  }
};
