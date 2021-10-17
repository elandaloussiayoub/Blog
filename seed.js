// this file is for testing outside the app , 
// yet still conencted to our database

// const express = require("express");
// const app = express();
const mongoose = require('mongoose') ;
// const path = require('path');
var ObjectId = require('mongodb').ObjectID;

const User = require('./models/user');
const Article = require('./models/article');
const Comment = require('./models/comment');


const InitiateMongoServer = require("./controller/bd");
// Initiate Mongo Server
InitiateMongoServer();


// // const user1 = new User({ 
// //   username: 'ahmedrah',
// //   password: '123456789',  
// //   firstName: 'ahmed',  
// //   lastName: 'rahmouni',  
// //   email: 'ahdent@gmil.com',  
// //   isAdmin: true,  
// //   isBanned: false,
// // })
// // user1.save().then( p => console.log(p)).catch(e => {
// //   console.log(e)
// // })

Comment.insertMany([
  {
    userId: ObjectId("5ff5d56d438e51405d502d0e"),
    articleId: ObjectId("5ff6f15e232039263249e582"),
    body: 'Short comment for this . about Technology '
  },
  {
    userId: ObjectId("5ff5d56d438e51405d502d0e"),
    articleId: ObjectId("5ff6f15e232039263249e582"),
    body: 'Another short comment fwpijpwiqpwijvp3jout Technology '
  },
  {
    userId: ObjectId("5ff5cc9d153d5433fc492795"),
    articleId: ObjectId("5ff6f15e232039263249e582"),
    body: 'Another short comment fwpijpwiqpwijvp3jout Technology '
  }
])
  .then(data => {
    console.log('IT WORKED !!')
    console.log(data)
  })