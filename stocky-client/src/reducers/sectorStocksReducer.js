const InitialState = {
  Finance: ['LFIN', 'VANI', 'CINS', 'AFSL'],
  Energy: ['HPFL', 'LGL', 'PAP', 'VLL'],
  Health: ['SINH', 'NHL', 'AMSL', 'CHL'],
  RealEstate: ['SLND', 'TWOD', 'KDL', 'CTLD'],
};

export default (state = InitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
