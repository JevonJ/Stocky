export default (socket, actions) => {
  socket.on('join_room', (player) => {
    actions.setRoom(player);
  });

  socket.on('set_player', (player) => {
    actions.setPlayer(player);
  });
};
