import { setPlayer, setRoom, removeRoom, setRoomInfo, buyStock, setPlayerStocks } from './actions';

export default function (io, { dispatch, getState}) {
  // Set socket.io listeners.
  io.on('connect', (socket) => {
    console.log('User connected: ', socket.id);
    io.origins((origin, callback) => {
      if (origin !== 'http://localhost:3000') {
        return callback('origin not allowed', false);
      }

      callback(null, true);
    });

    socket.on('create_game', (data) => {
      socket.join(data.room, () => {
        socket.room = data.room;        
        dispatch(setRoom(data.room)).then(() => {
          dispatch(setRoomInfo(data)).then(() => {
            const State = getState();
            io.emit('set_rooms', State.rooms);
            io.emit('set_room_info', State.roomInfo)
          });
          dispatch(setPlayer(data)).then(() => {
            const State = getState();
            io.to(data.room).emit('set_players', State.players[data.room]);
            socket.emit('set_user', { name: data.username, host: true, room: data.room, cash: '1000' });
            socket.emit('go_to_lobby');
          });
          dispatch(setPlayerStocks(data)).then(() => {
            const State = getState();
            io.to(data.room).emit('set_player_stocks', State.playerStocks[data.room]);
          });
        });
      });
    });

    socket.on('set_player', (data) => {
      dispatch(setPlayer(data)); 
      io.emit('set_player', data);
    });

    socket.on('join_room', (data) => {
      socket.join(data.room, () => {
        dispatch(setRoom(data.room)).then(() => {
          dispatch(setPlayer(data)).then(() => {
            io.emit('set_rooms', getState().rooms);
            io.to(data.room).emit('set_player', getState().players);
          });
        });      
      });
    });

    socket.on('start_game', (data) => {
      io.to(data).emit('set_start_timer', 5);
    });

    socket.on('purchase_stocks', (data) => {
      dispatch(buyStock(data)).then(() => {
        const State = getState();
        const playerStocks = State.playerStocks[data.room];
        io.to(data.room).emit('buy_stock', { [data.username]: playerStocks[data.username]});
      });
    });

    socket.on('disconnect', (data) => {
      dispatch(removeRoom(socket.room)).then(() => {
        io.emit('set_rooms', getState().rooms);
      });
    });
  });
}