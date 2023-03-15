import express from 'express';
import { Server } from 'socket.io';
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const srcDir = dirname(fileURLToPath(import.meta.url))

const app = express();
app.use(express.static(path.join(srcDir, 'public/')));

const port = 80
const httpServer = app.listen(port, () => console.log(`Server listening on port ${port}`));
const io = new Server(httpServer)

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
  res.status(200).sendFile(path.join(srcDir, 'public/index.html'))
});

app.get('/api/alert', (req, res) => {
  console.log('Alert received');
  io.emit('alert', `Alert received`);
  res.status(200).send({status: 'success'})
});