const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;
let randomNumber = 0;
// here is where we generate the first random number
numberGenerator();
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here


let numbersGuessed;

app.post('/numbers', (req, res) => {
  // console.log('got a request')
  // console.log('req.body should be array?!?', req.body);
  numbersGuessed = req.body.guessesObject;
  console.log(numbersGuessed);
  numberComparison(numbersGuessed);
  res.sendStatus(200);
}) //original post route for game

app.get('/numbers', (req,res)=>{
  console.log('get request received');
  res.send(results);
})


function numberGenerator (){
  randomNumber = Math.floor(Math.random()* (25-1)+1);
  return randomNumber;
  
}
//create comparison function
let results = [];

function numberComparison(){
  let guessArray = Object.values(numbersGuessed);
  console.log(guessArray);
  results = []
  for (let guess of guessArray){
    if (Number(guess) === randomNumber){
      results.push('You Win!');
    }
    else if (Number(guess) > randomNumber){
      results.push('Too High!');
    }
    else if (Number(guess) < randomNumber){
      results.push('Too Low!');
    }
  }
  console.log(results);
}

console.log(randomNumber);

app.post('/reset', (req, res) => {
  numberGenerator();
  console.log(randomNumber);
  res.sendStatus(200);
}) //reset game post route


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})