import Http from 'http';
import Express from 'express';
import Cluster from 'cluster';
import SocketIO from 'socket.io';
import StickySessions from 'sticky-session';
import { createStore, compose, applyMiddleware } from 'redux';
import cors from 'cors';
import Compression from 'compression';
import { config } from 'dotenv'

import store from './store';
import path from 'path';
import SocketEvents from './socketEvents';

config();

const app = Express(),
  //Our local port
  port = 4001,
  //our server instance
  server = Http.createServer(app);

  app.set("view engine", "pug");
  app.set("views", path.join(__dirname, "views"));

// Set public folder
app.use(cors());
app.use(Compression());

app.get("/", (req, res) => {
  const { rooms, roomInfo, roomStocks, players, playerStocks, trendModel } = store.getState();
  res.render("index", { rooms, roomInfo, roomStocks, players, playerStocks, trendModel }
);
});

app.get('/api/check-status', (req, res) => res.status(200).json({ Connected: true }));
app.get('/api/init-data', (req, res) => {
  const { rooms, roomInfo } = store.getState();
  res.status(200).json({
    rooms,
    roomInfo,
  });
});
app.get('/api/sectortrends', (req, res) => {
  const { trendModel } = store.getState();
  res.status(200).json(trendModel);
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
