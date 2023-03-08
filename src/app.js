import express from 'express';
import { Server } from 'socket.io';
import { __path } from './utils.js';

const app = express();
app.use(express.static(__path('src/public/')));

const httpServer = app.listen(80, () => console.log('Server listening on port 80'));

const io = new Server(httpServer)
let countClients = 0;
let countAlerts = 0;
io.on('connection', socket => {
  countClients ++
  console.log(countClients, 'New client')
});

app.get('/', (req, res) => {  
  res.status(200).sendFile(__path('src/public/index.html'))
})

app.get('/api/alert', (req, res) => {
  countAlerts ++
  console.log(countAlerts, 'Alerts');
  io.emit('alert', `Alert ${countAlerts} received`);
  res.status(200).send('')
})