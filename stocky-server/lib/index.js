import Http from 'http';
import Express from 'express';
import Cluster from 'cluster';
import SocketIO from 'socket.io';
import StickySessions from 'sticky-session';
import { createStore, compose, applyMiddleware } from 'redux';
import cors from 'cors';

import store from './store';

import SocketEvents from './socketEvents';
 
const app = Express(),
  //Our local port
  port = 4001,
  //our server instance
  server = Http.createServer(app);

// Set public folder
app.use(Express.static('public'));

app.use(cors());

app.get('/api/check-status', (req, res) => res.status(200).json({ Connected: true }));
app.get('/api/init-data', (req, res) => {
  const { rooms, roomInfo } = store.getState();
  res.status(200).json({
    rooms,
    roomInfo,
  });
});

//this creates a socket using the server instance
const io = SocketIO(server);

// add socket listener events
SocketEvents(io, store);

server.listen(port, () => console.log(`Listening on port ${port}`));

// if (!StickySessions.listen(server, port)) {
//   server.once('listening', function () {
//     console.log('Server started on port ' + port);
//   });

//   if (Cluster.isMaster) {
//     console.log('Master server started on port ' + port);
//   }
// } else {
//   console.log('- Child server started on port ' + port + ' case worker id=' + Cluster.worker.id);
// }
