const socket = io();

socket.on('alert', (msg) => {
  console.log(msg)
  soundPlayer.play();
})