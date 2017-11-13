const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
	console.log('POST recieved on server')

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  console.log(req.body.username);
  var callback = repos => {
    repos.forEach(repo => {
      db.save(repo);

      })};
    
  github.getReposByUsername(req.body.username, callback)

  //res.sendStatus(201);
  res.status(201).end();
});

app.get('/repos', function (req, res) {
  console.log('GET recieved on server')
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find(function(repos) {
    console.log('Inside db find')
    console.log(repos);
    //res.sendStatus(200);
    //res.end(JSON.stringify(repos));
    //res.end(JSON.stringify('test'))
    res.status(200).send(JSON.stringify(repos))
  })
  console.log('BEFORE END')
  //res.sendStatus(200);
    //res.end(JSON.stringify(repos));
    //res.end(JSON.stringify('test'))
    //res.status(200).send(JSON.stringify('test'))
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

