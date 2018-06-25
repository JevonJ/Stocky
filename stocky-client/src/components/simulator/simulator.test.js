import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DashboardHeaderData from './DashboarHeaderData';
import Header from './Header';
import StockList from './StockList';
import SoldStockList from './SoldStockList';
import SimulatorMain from './SimulatorMain';
import PlayerList from './PlayerList';
import LiveFeed from './LiveFeed';
import RoundNumber from './RoundNumber';
import PurchasedStockList from './PurchasedStockList';
import Dashboard from './Dashboard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares)
const initialState = { rooms: [], user: {}, players: [] };
const store = mockStore(initialState);

it('DashboardHeaderData renders correctly', () => {
  const wrapper = shallow(<DashboardHeaderData user={{ name: 'jevon' }} playerStocks={{ jevon: { purchased: [], sold: [] } }}/>);

  expect(wrapper).toMatchSnapshot();
});

it('Header renders correctly', () => {
  const wrapper = shallow(<Header />);

  expect(wrapper).toMatchSnapshot();
});

it('SimulatorMain renders correctly', () => {
  const wrapper = shallow(<SimulatorMain />);

  expect(wrapper).toMatchSnapshot();
});

it('Header renders correctly', () => {
  const wrapper = shallow(<Header />);

  expect(wrapper).toMatchSnapshot();
});

it('StockList renders correctly', () => {
  const wrapper = shallow(<StockList />);

  expect(wrapper).toMatchSnapshot();
});

it('SoldStockList renders correctly', () => {
  const wrapper = shallow(<SoldStockList playerStocks={{ Inuri: { sold: [] } }} user={{ name: 'Inuri' }} />);

  expect(wrapper).toMatchSnapshot();
});

it('PurchasedStockList renders correctly', () => {
  const wrapper = shallow(<PurchasedStockList playerStocks={{ Inuri: { purchased: [] } }} user={{ name: 'Inuri' }} />);

  expect(wrapper).toMatchSnapshot();
});

it('SimulatorMain renders correctly', () => {
  const wrapper = shallow(<SimulatorMain />);

  expect(wrapper).toMatchSnapshot();
});

it('PlayerList renders correctly', () => {
  const wrapper = shallow(<PlayerList players={[]} />);

  expect(wrapper).toMatchSnapshot();
});

it('LiveFeed renders correctly', () => {
  const wrapper = shallow(<liveFeed LiveFeed={[]} />);

  expect(wrapper).toMatchSnapshot();
});

it('RoundNumber renders correctly', () => {
  const wrapper = shallow(<RoundNumber user={{ room: 'Room1' }} roomInfo={{ Room1: { currentRound: 1 } }} />);

  expect(wrapper).toMatchSnapshot();
});

it('Dashboard renders correctly', () => {
  const wrapper = shallow(<Dashboard store={store} />);

  expect(wrapper).toMatchSnapshot();
});