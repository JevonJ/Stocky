var exports = module.exports = {};

exports.listen = function (socket, io) {
  socket.on('change color', (color) => {
    console.log('Color Changed to: ', color);
    io.sockets.emit('change color', color);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};
