import express from 'express';
import { Server } from 'socket.io';
import { __path } from './utils.js';

const app = express();
app.use(express.static(__path('src/public/')));

const httpServer = app.listen(8080, () => console.log('Server listening on port 8080'));
const io = new Server(httpServer)

let countClients = 0;
io.on('connection', socket => {
  countClients ++
  const address = socket.handshake.address;
  console.log(`New client from ${address}.\n${countClients} online\n`)

  socket.on('disconnect', (reason) => {
    countClients --
    const address = socket.handshake.address;
    console.log(`Client ${address} disconnected.\n${countClients} online.\nReason: ${reason}\n`)
  })
});

app.get('/', (req, res) => {  
  res.status(200).sendFile(__path('src/public/index.html'))
})

app.get('/api/alert', (req, res) => {
  console.log('Alert received');
  io.emit('alert', `Alert received`);
  res.status(200).send({status: 'success'})
})