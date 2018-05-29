const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const listeners = require('./src/listeners');

//Our local port
const port = 4001;

const app = express();

//our server instance
const server = http.createServer(app);

// Set public folder
app.use(express.static('public'));

//this creates a socker using the server instance
const io = socketIO(server);

io.on('connection', socket => {
    console.log('New User Connected');

    listeners.listen(socket, io);
});

server.listen(port, ()=> console.log(`Listening on port ${port}`));
