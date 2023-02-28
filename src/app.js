const express = require("express")
const app = express();

app.listen(8080, () => console.log('Server listening on port 8080'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"));


app.get('/', (req, res) => {
  const player = require('play-sound')(opts = {})
  try {
    player.play('./assets/warning.wav', function(err){
      if(err) throw new Error(err)
    })
  } catch (error) {
    console.error("test 02", error)
  }
  res.status(200).send("Test Sound")
})