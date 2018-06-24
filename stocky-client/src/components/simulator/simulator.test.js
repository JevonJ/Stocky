import React from 'react';

import DashboardHeaderData from './DashboarHeaderData';
import Header from './Header';

it('DashboardHeaderData renders correctly', () => {
  const wrapper = shallow(<DashboardHeaderData user={{ name: 'jevon' }} playerStocks={{ jevon: { purchased: [], sold: [] } }}/>);

  expect(wrapper).toMatchSnapshot();
});

it('Header renders correctly', () => {
  const wrapper = shallow(<Header />);

  expect(wrapper).toMatchSnapshot();
});

