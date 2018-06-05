import { setPlayer, setRoom, removeRoom, setRoomInfo } from './actions';

export default function (io, { dispatch, getState}) {
  // Set socket.io listeners.
  io.on('connect', (socket) => {
    console.log('User connected: ', socket.id);

    socket.on('create_game', (data) => {
      console.log(data);
      socket.join(data.roomName, () => {
        dispatch(setRoom(data.roomName)).then(() => {
          dispatch(setRoomInfo(data)).then(() => {
            const State = getState();
            io.emit('set_rooms', State.rooms);
            io.emit('set_room_info', State.roomInfo)
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

    socket.on('disconnect', (data) => {
      console.log('user disconnected:', socket.id);

      socket.leave(socket.room);
      dispatch(removeRoom('AAD')).then(() => {
        io.emit('set_rooms', getState().rooms);
      });
      
      // socket.broadcast.to('justin bieber fans').emit('set_player');
    });
  });
}