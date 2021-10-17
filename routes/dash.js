const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/auth");
const methodeOverride = require('method-override')
const router = express.Router();

const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');

const session = require('express-session')
router.use(session({secret: 'notagoodsecret'}))
router.use(methodeOverride('_methode'));

// User dashboard
router.get('/', requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id);
    const articles = await Article.find({}); 
    const comments = await Comment.find({});
    if (user) {
      res.render('dashboard/dash',{username:user.username})
    } else {
      res.render('notfound')
    }
  } catch (e) {
    res.send({message: "Error In Fetching user"});
  }
})




router.get('/all', requireLogin,  async (req, res) => {
  res.status(200).redirect('../article/');
})

router.get('/search', requireLogin,  async (req, res) => {
  res.status(200).redirect('../article/search');
})

router.get('/writenew', requireLogin, async (req, res) => {
  res.status(200).redirect('../article/new');
})

router.get('/manage', requireLogin, async  (req, res) => {
  const articles = await Article.find({userId:req.session.user_id}).sort({date: 'desc'})
  res.render('dashboard/managearticle',{articles})
})


router.get('/comments', requireLogin, async (req, res) => {
  res.status(200).redirect('/comment/');
})



// Router : Profile page
router.get('/profile', requireLogin,  async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id);
    const articlesCount = await Article.find({userId: user._id}).count(); 
    const commentsCount = await Comment.find({userId: user._id}).count();
    if (user) {
      res.render('dashboard/profile',{user, articlesCount, commentsCount});
    } else {
      res.render('notfound')
    }
  } catch (e) {
    res.send({message: "Error In Fetching user"});
  }
  
})

router.get('/editPr')


// Router : About page
router.get('/about', requireLogin,  async (req, res) => {
  res.render('dashboard/about')
})


module.exports = router;