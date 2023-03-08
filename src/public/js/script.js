const socket = io();
const soundPlayer = document.getElementById('soundPlayer')
const testButton = document.getElementById('testButton')

testButton.onclick = () => {
  soundPlayer.play();
}

socket.on('alert', (msg) => {
  console.log(msg)
  soundPlayer.play();
})