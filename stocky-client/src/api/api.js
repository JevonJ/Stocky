function changeColor(color, socket) {
  socket.emit('change color', color);  
}

export { changeColor }