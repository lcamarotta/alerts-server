const path = require('path');
const absolutePath = path.resolve(path.dirname(''));

const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

app.use(express.static(`${absolutePath}/src/public`));

httpServer.listen(80, () => console.log(`Server listening on port ${80}`));

let countClients = 0;
io.on('connection', socket => {
  const address = socket.handshake.address;
  countClients++
  console.log(`New client from ${address}. ${countClients} are online\n`)

  socket.on('disconnect', (reason) => {
    const address = socket.handshake.address;
    countClients--
    console.log(`Client ${address} disconnected. Reason: ${reason}\n${countClients} are online.`)
  })
});

app.get('/', (req, res) => {  
  res.status(200).sendFile(`${absolutePath}/src/public/index.html`);
});

app.get('/api/alert', (req, res) => {
  console.log('Alert received');
  io.emit('alert', `Alert received`);
  res.status(200).send({status: 'success'})
});