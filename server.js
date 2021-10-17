const express = require('express');
const mongoose = require('mongoose') ;
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session')

const InitiateMongoServer = require("./controller/bd");
// Initiate Mongo Server
InitiateMongoServer();

const app = express();




// To be deleted after DB implementation
// const contentData = require('./data.json');
// const userData = require("./userdata.json");
// const stats = require("./count.json")



// Routes
const userRouter    = require('./routes/user');
const articleRouter = require('./routes/article');
const commentRouter = require('./routes/comment'); 
const dashRouter    = require('./routes/dash');
const identRouter   = require('./routes/ident');

// Models :
const User = require('./models/user');
const Article = require('./models/article')
const Comment = require('./models/comment')

// MiddleWares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({secret: 'notagoodsecret'}))

app.use('/user',userRouter);
app.use('/article',articleRouter);
app.use('/comment',commentRouter);
app.use('/ident',identRouter);
app.use('/dash',dashRouter);
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


console.log(path.join(__dirname, 'public'))



 
app.get('/home', (req, res) => {
  res.render('home', {name : 'Home'})
})


app.get('/', (req, res) => {
  res.render('home', {name : 'Home'})
})
app.get('/browse', (req, res) => {
  const data = contentData;
  const {name} = req.params ;
  res.render('browse', {name,data})
})

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on port: 3000, YAYYY !');
  }
})