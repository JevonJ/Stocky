import { setPlayer, setRoom } from './actions';

export default function (io, { dispatch, getState}) {
  // Set socket.io listeners.
  io.on('connect', (socket) => {
    console.log('User connected: ', socket.id);
    socket.on('set_player', (data) => {
      dispatch(setPlayer(data));
      io.emit('set_player', data);
    });

    socket.on('join_room', (data) => {
      socket.join(data.room, () => {
        dispatch(setRoom(data.room)).then(() => {
          dispatch(setPlayer(data)).then(() => {
            io.to(data.room).emit('join_room', getState().rooms);
            io.to(data.room).emit('set_player', getState().players);
          });
        });      
      });
    });

    socket.on('disconnect', (data) => {
      console.log('user disconnected:', socket.id);
      socket.leave(socket.room);
      socket.broadcast.to('justin bieber fans').emit('set_player');
      console.log('rooms:', socket.rooms);
    });
  });
}