import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BuyModalMain from './BuyModalMain';
import SellSharesModal from './SellSharesModal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = { user: { name: 'jevon' }, roomInfo: {}, playerStocks: {} };
// aconst store = mockStore(initialState);

it('BuyModalMain renders correctly', () => {
  const wrapper = shallow(<BuyModalMain stock='LFIN' roomStocks={{ LFIN: [10] }} user={{ cash: 1000 }}/>);

  expect(wrapper).toMatchSnapshot();
});


it('SellSharesModal renders correctly', () => {
  const wrapper = shallow(<SellSharesModal />);

  expect(wrapper).toMatchSnapshot();
});
