const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/auth");
const methodeOverride = require('method-override');

const router = express.Router();

const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');

const session = require('express-session')
router.use(session({secret: 'notagoodsecret'}))
router.use(methodeOverride('_methode'));
// Article requests
// REST : Index,  show all articles  
router.get('/', async (req, res) => {
  const result = await Article.find({}).sort({date: 'desc'}).lean()
  const userr = await User.find({}).lean()
  
  const articles  =[]
  for (let article of result) {
    articles.push(article);
  }
  
  console.log(userr)
  res.render('dashboard/articles/all', {articles,userr})
})
// REST : Get New Article page
router.get('/new', requireLogin, async  (req, res) => {
  res.render('dashboard/articles/new')
})


// Create an article
router.post('/new', requireLogin, async  (req, res) => {
  const data = {
    userId: req.session.user_id ,
    title: req.body.title ,
    body: req.body.body,
    tags: req.body.tags.split(" ")
  }
  const newpost  = new Article(data);
  await newpost.save();
  res.redirect('/article');
})
  

router.get('/search', requireLogin,  async (req, res) => {
  res.render('dashboard/search');
})

router.post('/search', requireLogin, async (req, res) => {
  const searchtags = req.body.tags.split(" ");
  const articles = await Article.find({tags: {"$elemMatch": {"$in": searchtags}}});
  res.render('dashboard/articles/searchresult',{articles,searchtags});
})

// REST : show a particular article
router.get('/:id', async  (req, res) => {
  try {
    const {id} = req.params ;
    const article = await Article.findById(id)
    res.render('dashboard/articles/onearticle',{article})
  } catch (e) {
    res.send({message: "Error In Fetching Article"});
  }
})


// Get the edit article page
router.get('/:id/edit', requireLogin, async  (req, res) => {
  try {
    const {id} = req.params ;
    const article = await Article.findById(id)
    console.log(article)
    res.render('dashboard/articles/edit',{article})
  } catch (e) {
    res.send({message: "Error In Fetching Article"});
  }
})

// PUT the edited article
router.put('/:id/edit', requireLogin, async (req, res) => {
  const {id} = req.params;
  const newtitle = req.body.title;
  const newbody = req.body.body;
  const newtags = req.body.tags.split(" ");

  const newarticle = await Article.findByIdAndUpdate(
    id,
    {
      title: newtitle, 
      body: newbody, 
      tags: newtags
    },
    {
      runValidators: true, 
      new: true
    }
  );
  console.log({newarticle})
  res.redirect('/article')
})

// Delete an article
router.delete('/:id', requireLogin, async (req, res) => {
  const {id} =req.params;
  await Article.findByIdAndDelete(id)

  res.status(200).redirect('/dash/manage')
})

module.exports = router;