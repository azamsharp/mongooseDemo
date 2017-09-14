const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

// models
const Post = require('./post')

var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/test');

app.post('/new-post',function(req,res){

  const title = req.body.title
  const description = req.body.description

  let post = new Post({
    title :title,
    description: description
  })

  post.save().then(function(){

      res.redirect('/')

  }).catch(function(){

  })

})

app.get('/', function (req, res) {

  Post.find().then(function(posts){

    res.render('index',{"posts":posts})

  }).catch(function(){

  })
})

app.listen(3002, function () {
  console.log('Example app listening on port 3000!')
})
