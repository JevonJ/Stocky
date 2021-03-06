import {
  setPlayer, removeRoom, buyStock, sellStock, createGame, removePlayer, startGame, calculateStocks,
} from './actions';

export default function (io, { dispatch, getState }) {

  // Set socket.io listeners.

  io.on('connect', (socket) => {
    console.log('User connected: ', socket.id);
    socket.emit('go_to_login');
    socket.to(socket.room).emit('notification', {
      type: 'error',
      message: 'Server encountered an error',
      position: 'TOP_CENTER',
    });

    io.origins((origin, callback) => {
      const { NODE_ENV, PROD_CLIENT } = process.env;
      let clientURL = 'http://localhost:3000';

      if (NODE_ENV && NODE_ENV === 'production') {
        clientURL = PROD_CLIENT;
      }

      if (origin !== clientURL) {
        return callback('origin not allowed', false);
      }

      return callback(null, true);
    });

    socket.on('create_game', (data) => {
      socket.join(data.room, () => {
        socket.room = data.room;
        socket.username = data.username;
        socket.gameHost = true;
        dispatch(createGame(data)).then(() => {
          const State = getState();
          io.emit('set_rooms', State.rooms);
          io.emit('set_room_info', State.roomInfo);
          io.to(data.room).emit('set_players', State.players[data.room]);
          socket.emit('set_user', {
            name: data.username, host: true, room: data.room, cash: 1000,
          });
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
          socket.emit('set_user', {
            name: data.username, host: false, room: data.room, cash: 1000,
          });
          io.to(data.room).emit('set_players', State.players[data.room]);
          io.to(data.room).emit('set_player_stocks', State.playerStocks[data.room]);
          socket.emit('go_to_lobby');
          socket.emit('set_room_stocks', State.roomStocks[data.room]);
        });
      });
    });

    socket.on('set_computer_player', (data) => {
      dispatch(setPlayer(data)).then(() => {
        const State = getState();
        io.to(data.room).emit('set_players', State.players[data.room]);
        io.to(data.room).emit('set_player_stocks', State.playerStocks[data.room]);
      });
    });

    socket.on('go_to_simulator', (data) => {
      dispatch(startGame(data)).then(() => {
        const State = getState();
        io.to(data).emit('set_timer', { start_time: 10 });
        io.emit('set_room_info', State.roomInfo);
        io.to(data).emit('go_to_simulator');
      });
    });

    socket.on('start_game', (data) => {
      const { roomInfo } = getState();
      const { roundDuration } = roomInfo[data];
      io.to(data).emit('set_timer', { round_time: roundDuration, start_time: 0 });
    });

    socket.on('purchase_stocks', (data) => {
      dispatch(buyStock(data)).then(() => {
        const State = getState();
        const playerStocks = State.playerStocks[data.room];
        socket.emit('set_user', { cash: data.currentCashInHand - (data.initStockQty * data.unitPrice) });
        io.to(data.room).emit('buy_stock', { [data.username]: playerStocks[data.username] });
        io.to(data.room).emit('update_live_feed', data);
        io.to(data.room).emit('set_players', State.players[data.room]);
      });
    });

    socket.on('sell_stocks', (data) => {
      dispatch(sellStock(data)).then(() => {
        const State = getState();
        const playerStocks = State.playerStocks[data.room];
        socket.emit('set_user', { cash: data.currentCashInHand + (data.stockQty * data.unitPrice) });
        io.to(data.room).emit('sell_stock', { [data.username]: playerStocks[data.username] });
        io.to(data.room).emit('update_live_feed', data);
        io.to(data.room).emit('set_players', State.players[data.room]);
      });
    });

    socket.on('calculate_stocks', (data) => {
      const { trendModel, roomInfo } = getState();

      dispatch(calculateStocks(data, trendModel[data], roomInfo[data])).then(() => {
        const State = getState();
        const { currentRound } = roomInfo[data];
        const { eventTrends } = trendModel[data];
        const sectorEvents = eventTrends.sectorEvents[currentRound];
        const stockEvents = eventTrends.stockEvents[currentRound];
        const { roundDuration } = State.roomInfo[data];

        io.to(data).emit('set_room_info', State.roomInfo);
        io.to(data).emit('set_room_stocks', State.roomStocks[data]);
        io.to(data).emit('update_current_events', { sectorEvents, stockEvents });
        io.to(data).emit('set_timer', { round_time: roundDuration });
      });
    });

    socket.on('go_to_game_summary', (data) => {
      io.to(data).emit('go_to_game_summary');
    });

    socket.on('i_am_new_host', () => {
      socket.gameHost = true;

      socket.emit('notification', {
        type: 'success',
        message: 'You are the new host',
        position: 'BOTTOM_RIGHT',
      });
    });

    socket.on('disconnect', () => {
      if (socket.room) {
        const { players, roomInfo } = getState();

        if (!players[socket.room]) return;

        const playersExist = players[socket.room]
          .filter(player => player.isComputer !== true);

        if (!(playersExist.length > 1)) {
          dispatch(removeRoom(socket.room)).then(() => {
            const newState = getState();
            io.emit('set_rooms', newState.rooms);
          });
        } else {
          const gameHasStarted = roomInfo[socket.room].isStarted;
          if (!gameHasStarted && socket.gameHost) {
            dispatch(removeRoom(socket.room)).then(() => {
              const newState = getState();
              io.emit('set_rooms', newState.rooms);
              io.to(socket.room).emit('go_to_login');
              io.to(socket.room).emit('notification', {
                type: 'error',
                message: 'Host cancelled the game',
                position: 'TOP_CENTER',
              });
            });
          }
          if (!gameHasStarted && !socket.gameHost) {
            dispatch(removePlayer({ username: socket.username, room: socket.room })).then(() => {
              const newState = getState();
              io.to(socket.room).emit('set_players', newState.players[socket.room]);
            });
          }
          if (gameHasStarted) {
            dispatch(removePlayer({ username: socket.username, room: socket.room })).then(() => {
              if (socket.gameHost) {
                const newState = getState();
                const nonComputerPLayers = newState.players[socket.room]
                  .filter(player => player.isComputer !== true);
                io.to(socket.room).emit('change_host', { data: { host: true }, name: nonComputerPLayers[0].name });
              }
            });
            io.to(socket.room).emit('notification', {
              type: 'info',
              message: `${socket.username} ${socket.gameHost && '(Host)'} has left the game`,
              position: 'BOTTOM_RIGHT',
            });
          }
        }
      }
    });
  });
}
