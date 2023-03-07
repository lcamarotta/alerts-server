const express = require("express")
const app = express();

app.listen(8080, () => console.log('Server listening on port 8080'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"));


app.get('/', (req, res) => {
  // const player = require('play-sound')(opts = {})
  // try {
  //   player.play('./assets/homer.wav', function(err){
  //     if(err) throw new Error(err)
  //   })
  // } catch (err) {
  //   console.error("ERROR", err)
  // }
  // res.status(200).send("Test Sound")
  
  res.status(200).send('./index.html')
})