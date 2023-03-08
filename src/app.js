import express from 'express';
import { Server } from 'socket.io';
import { __path } from './utils.js';

const app = express();
app.use(express.static(__path('src/public/')));

const httpServer = app.listen(80, () => console.log('Server listening on port 80'));

const io = new Server(httpServer)
io.on('connection', socket => {
  console.log('New client')
});

app.get('/', (req, res) => {
  io.emit('alert', 'Alert received');
})

app.get('/client', (req, res) => {  
  res.status(200).sendFile(__path('src/public/index.html'))
})