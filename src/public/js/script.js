const socket = io();
socket.on('alert', (msg) => {
  console.log(msg)
})

const soundPlayer = document.getElementById('soundPlayer')
const testButton = document.getElementById('testButton')
testButton.onclick = () => {
  soundPlayer.play();
}