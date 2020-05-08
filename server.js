// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const pug = require('pug');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var works = [
  {todo: 'Nấu ăn'},
  {todo: 'Di cho'},
  {todo: 'Rua bat'},
  {todo: 'Hoc code voi codersX'},
]

app.set('view engine', 'pug')
app.set('views','./views')

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.render('index.pug');
});

app.get('/todos',function(req,res){
  var q = req.query.q
  var filteredWorks = works.filter(work=> work.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1)
  res.render('search',{
    works: filteredWorks
  });
})

app.post('/todos/create',function(req,res){
  var job = req.body
  works.push(job)
  res.redirect('back')
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
