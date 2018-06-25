export default (socket, actions) => {
  socket.on('set_rooms', (rooms) => {
    actions.setRoom(rooms);
  });

  socket.on('set_room_info', (roomInfo) => {
    actions.setRoomInfo(roomInfo);
  });

  socket.on('set_players', (players) => {
    actions.setPlayer(players);
  });

  socket.on('set_player_stocks', (data) => {
    actions.setPlayerStocks(data);
  });

  socket.on('set_room_stocks', (data) => {
    actions.setRoomStocks(data);
  });

  socket.on('set_user', (user) => {
    actions.setUser(user);
  });

  socket.on('go_to_lobby', () => {
    actions.history.push('/login/lobby');
  });

  socket.on('go_to_login', () => {
    actions.history.push('/login');
  });

  socket.on('go_to_simulator', () => {
    actions.history.push('/simulator');
  });

  socket.on('set_timer', (data) => {
    actions.setTime(data);
  });

  socket.on('buy_stock', (data) => {
    actions.buyStock(data);
  });

  socket.on('sell_stock', (data) => {
    actions.sellStock(data);
  });

  socket.on('update_live_feed', (data) => {
    actions.updateFeed(data);
  });

  socket.on('update_current_events', (data) => {
    actions.updateEvents(data);
  });

  socket.on('go_to_game_summary', (data) => {
    actions.history.replace('/game-summary');
  });
};
