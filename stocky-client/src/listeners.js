export default (socket, actions) => {
  socket.on('set_rooms', (rooms) => {
    actions.setRoom(rooms);
  });

  socket.on('set_room_info', (roomInfo) => {
    actions.setRoomInfo(roomInfo);
  });

  socket.on('set_player', (player) => {
    actions.setPlayer(player);
  });
};
