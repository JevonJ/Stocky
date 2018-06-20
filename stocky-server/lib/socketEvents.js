import { setPlayer, removeRoom, buyStock, sellStock, setPlayerStocks, createGame, removePlayer, startGame } from './actions';

export default function (io, { dispatch, getState }) {
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
        socket.username = data.username;
        socket.gameHost = true;
        dispatch(createGame(data)). then(() => {
          const State = getState();
          console.log(State.trendModel);
          io.emit('set_rooms', State.rooms);
          io.emit('set_room_info', State.roomInfo)
          io.to(data.room).emit('set_players', State.players[data.room]);
          socket.emit('set_user', { name: data.username, host: true, room: data.room, cash: 1000 });
          socket.emit('go_to_lobby');
          io.to(data.room).emit('set_player_stocks', State.playerStocks[data.room]);
          socket.emit('set_room_stocks', State.roomStocks[data.room]);
        });
      });
    });

    socket.on('get_players', (room) => {
      const State = getState();
      socket.emit('set_players', State.players[room]);
    });

    socket.on('join_room', (data) => {
      socket.join(data.room, () => {
        socket.room = data.room;
        socket.username = data.username;
        socket.gameHost = false;
        dispatch(setPlayer(data)).then(() => {
          const State = getState();
          socket.emit('set_user', { name: data.username, host: false, room: data.room, cash: 1000 });          
          io.to(data.room).emit('set_players', State.players[data.room]);
          io.to(data.room).emit('set_player_stocks', State.playerStocks[data.room]);
          socket.emit('go_to_lobby');
          socket.emit('set_room_stocks', State.roomStocks[data.room]);
        });
      });
    });

    socket.on('start_game', (data) => {
      dispatch(startGame(data)).then(() => {
        const State = getState();        
        io.to(data).emit('set_start_timer', 5);
        io.emit('set_room_info', State.roomInfo);
        socket.emit('go_to_simulator');              
      });
    });

    socket.on('purchase_stocks', (data) => {
      dispatch(buyStock(data)).then(() => {
        const State = getState();
        const playerStocks = State.playerStocks[data.room];
        socket.emit('set_user', { cash: data.currentCashInHand - (data.initStockQty*data.unitPrice) });        
        io.to(data.room).emit('buy_stock', { [data.username]: playerStocks[data.username]});
        socket.to(data.room).emit('update_live_feed', data);
        io.to(data.room).emit('set_players', State.players[data.room]);
      });
    });

    socket.on('sell_stocks', (data) => {
      dispatch(sellStock(data)).then(() => {
        const State = getState();
        const playerStocks = State.playerStocks[data.room];
        socket.emit('set_user', { cash: data.currentCashInHand + (data.stockQty*data.unitPrice) });        
        io.to(data.room).emit('sell_stock', { [data.username]: playerStocks[data.username]});
        socket.to(data.room).emit('update_live_feed', data);
        io.to(data.room).emit('set_players', State.players[data.room]);
      });
    });

    socket.on('calculate_stocks', (data) => {
      console.log('Server', data);
      dispatch(calculateStocks(data)).then(() => {
        
      });
    });

    socket.on('disconnect', (data) => {
      if(socket.room) {
        const State = getState();
        const playersExist = State.players[socket.room].length > 1;
        if(!playersExist) {
          dispatch(removeRoom(socket.room)).then(() => {
            const newState = getState();
            io.emit('set_rooms', newState.rooms);
          });
          return;
        } else {
          const gameHasStarted = State.roomInfo[socket.room].isStarted;
          if(!gameHasStarted && socket.gameHost) {
            dispatch(removeRoom(socket.room)).then(() => {
              const newState = getState();
              io.emit('set_rooms', newState.rooms);
              io.to(socket.room).emit('go_to_login');
            });
          }
          if (!gameHasStarted && !socket.gameHost) {
            dispatch(removePlayer({username: socket.username, room:socket.room})).then(() => {
              const newState = getState();
              io.to(socket.room).emit('set_players', newState.players[socket.room]);
            });
          }
        }      
      }
    });
  });
}