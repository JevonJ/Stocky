import { setPlayer } from './actions';

export default (socket, dispatch) => {
  socket.on('change color', (player) => {
    dispatch(setPlayer(player));
  });
};
