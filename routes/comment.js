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




// Get user comments
router.get('/', requireLogin, async (req, res) => {
  const comments = await Comment.find({userId:req.session.user_id}).sort({date: 'desc'})
  res.render('dashboard/mycomments',{comments})
})

// REST : show a particular comment
router.get('/:id', async  (req, res) => {
  try {
    const {id} = req.params ;
    const comment = await Comment.findById(id)
    const article = await Article.findById(comment.articleId)
    const author  = await User.findById(comment.userId)
    console.log({comment,artical,author})
    res.render('dashboard/comments/onecomment',{comment,article,author})
  } catch (e) {
    res.send({message: "Error In Fetching Comment"});
  }
})

// GET Comment of Article ID
router.get('/article/:id', requireLogin, async (req, res) => {
  const {id} = req.params;
  const article = await Article.findById(id);
  const comments = await Comment.find({articleId: id})
  console.log( {comments})
  res.render('dashboard/comments/articlecomments',{comments,article})
})


// Create an article
router.get('/article/:id/new', requireLogin, async  (req, res) => {
  const {id} = req.params ;
  const user = req.session.user_id;
  const article = id;
  res.render('dashboard/comments/new',{article,user})
})

// Create an article
router.post('/article/:id/new', requireLogin, async  (req, res) => {
  const userId = req.session.user_id;
  const articleId = req.params.id;
  const body = req.body.body;

  console.log(req.session.user_id, req.params, req.body.body);
  const newcomment  = new Comment({userId, articleId, body});
  await newcomment.save();
  res.redirect('/article/');
})


// Get the edit comment page
router.get('/:id/edit', requireLogin, async  (req, res) => {
  try {
    const {id} = req.params ;
    const comment = await Comment.findById(id)
    res.render('dashboard/comments/edit',{comment})
  } catch (e) {
    res.send({message: "Error In Fetching comment"});
  }
})

// PUT the edited article
router.put('/:id/edit', requireLogin, async (req, res) => {
  const {id} = req.params;
  const newbody = req.body.body;

  const newcomment = await Comment.findByIdAndUpdate(
    id,
    {
      body: newbody, 
    },
    {
      runValidators: true, 
      new: true
    }
  );
  res.redirect('/comment/');
})


// Delete a comment
router.delete('/:id', requireLogin, async (req, res) => {
  const {id} =req.params;
  await Comment.findByIdAndDelete(id)

  res.status(200).redirect('/comment/')
})


module.exports = router;