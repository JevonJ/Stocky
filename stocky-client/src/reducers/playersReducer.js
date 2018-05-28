export default(state = [], payload) => {
  switch (payload) {
    case 'addPlayer':
      return [...state, payload.item];
    default:
      return state;
  }
};
