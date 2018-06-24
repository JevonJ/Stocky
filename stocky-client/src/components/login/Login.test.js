import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Loading from './Loading';
import Host from './Host';
import Welcome from './Welcome';
import Lobby from './Lobby';
import GameList from './GameList';
import Main from './Main';

const middlewares = [thunk];
const mockStore = configureStore(middlewares)
const initialState = { rooms: [], user: {}, players: [] };
const store = mockStore(initialState);

it('Loading renders correctly', () => {
  const wrapper = shallow(<Loading />);

  expect(wrapper).toMatchSnapshot();
});

it('Host renders correctly', () => {
  const wrapper = shallow(<Host store={store} socket={{ emit: () => {} }} history={{}} />).dive();

  expect(wrapper).toMatchSnapshot();
});

it('Welcome renders correctly', () => {
  const wrapper = shallow(<Welcome />);

  expect(wrapper).toMatchSnapshot();
});

it('Lobby renders correctly', () => {
  const wrapper = shallow(<Lobby store={store}socket={{ emit: () => {} }} history={{ replace: () => {} }} />).dive();

  expect(wrapper).toMatchSnapshot();
});

it('GameList renders correctly', () => {
  const wrapper = shallow(<GameList store={store}/>);

  expect(wrapper).toMatchSnapshot();
});

it('Main renders correctly', () => {
  const wrapper = shallow(<Main />);

  expect(wrapper).toMatchSnapshot();
});